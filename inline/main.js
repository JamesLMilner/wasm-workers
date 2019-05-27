// Lets assume our WASM module has and 'add' function
// that adds two numbers together:

// With Promises
wasmWorker("./main.wasm").then((wasmProxyInstance) => {
    wasmProxyInstance.add(2, 3)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error("Something went wrong...", error);
        })
});

// // With async/await
// const wasmProxyModule = await wasmWorker();
// const result = await wasmProxyModule.add(2, 3);
// console.log(result);