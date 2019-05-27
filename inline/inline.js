function wasmWorker(modulePath) {

    let worker;
    const proxy = {};
    let id = 0;
    let idPromises = {};

    if (!WebAssembly.instantiateStreaming) {
        WebAssembly.instantiateStreaming = async (resp, importObject) => {
            const source = await (await resp).arrayBuffer();
            return await WebAssembly.instantiate(source, importObject);
        };
    }

    return new Promise((resolve, reject) => {

        worker = createInlineWasmWorker(inlineWasmWorker, modulePath);
        worker.postMessage({eventType: "INITIALISE", data: modulePath});

        worker.addEventListener('message', function(event) {

            const { eventType, eventData, eventId } = event.data;

            if (eventType === "INITIALISED") {
                const props = eventData;
                props.forEach((prop) => {
                    proxy[prop] = function() {
                        return new Promise((resolve, reject) => {
                            worker.postMessage({
                                eventType: "CALL",
                                eventData: {
                                    prop: prop,
                                    arguments: Array.from(arguments)
                                },
                                eventId: id
                            });
                            idPromises[id] = { resolve, reject };
                            id++
                        })
                        
                    }
                })
                resolve(proxy);
                return;
            } else if (eventType === "RESULT") {
                if (eventId !== undefined && idPromises[eventId]) {
                    idPromises[eventId].resolve(eventData);
                    delete idPromises[eventId];
                }
            } else if (eventType === "ERROR") {
                if (eventId !== undefined && idPromises[eventId]) {
                    idPromises[eventId].reject(event.data.eventData);
                    delete idPromises[eventId];
                }
            }
        });
        worker.addEventListener('error', function(error) {
            reject(error)
        })
    })

    function createInlineWasmWorker(func, wasmPath) {
        if (!wasmPath.startsWith("http")) {
            if (wasmPath.startsWith("/")) {
                wasmPath = window.location.href + wasmPath
            } else if (wasmPath.startsWith("./")) {
                wasmPath = window.location.href + wasmPath.substring(1);
            }
        }

        functionBody = func.toString().trim().match(
            /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
        )[1];
        functionBody = functionBody.replace("WORKER_PATH", wasmPath);
        
        const objectUrl = URL.createObjectURL(new Blob([functionBody], { type: "text/javascript" }));
        const worker = new Worker(objectUrl);
        URL.revokeObjectURL(objectUrl);

        return worker;
    }

    function inlineWasmWorker() {

        let wasmResolve;
        const wasmReady = new Promise((resolve) => {
            wasmResolve = resolve;
        })
    
        self.addEventListener('message', function(event) {
            const { eventType, eventData, eventId } = event.data;

            if (eventType === "INITIALISE") {     
                WebAssembly.instantiateStreaming(fetch('WORKER_PATH'), {})
                    .then(instantiatedModule => {
                        const wasmExports = instantiatedModule.instance.exports;
                        wasmResolve(wasmExports);
                        self.postMessage({
                            eventType: "INITIALISED",
                            eventData: Object.keys(wasmExports)
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    })

            } else if (eventType === "CALL") {
                wasmReady.then((wasmInstance) => {
                    const prop = wasmInstance[eventData.prop];
                    const result = typeof prop === 'function' ? prop.apply(null, eventData.arguments) : prop;
                    self.postMessage({
                        eventType: "RESULT",
                        eventData: result,
                        eventId: eventId
                    });
                })
            } 

        }, false);
    }

}