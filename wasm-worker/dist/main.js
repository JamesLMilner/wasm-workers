!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=0,u={},f=t.getImportObject,l=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["getImportObject"]),s=new Worker("data:,ACTIONS="+JSON.stringify(o.default)+";getImportObject="+f+";importObject=undefined;wasmModule=null;moduleInstance=null;onmessage="+a.default,l);return s.onmessage=function(e){var t=e.data,a=t.id,i=t.result,f=t.action,l=t.payload;if(f===o.default.COMPILE_MODULE)if(0===i){var d=l.exports;u[a][0]({exports:d.reduce(function(e,t){return r({},e,(f=function(){for(var e=arguments.length,r=Array(e),a=0;a<e;a++)r[a]=arguments[a];return new Promise(function(){for(var e=arguments.length,a=Array(e),i=0;i<e;i++)a[i]=arguments[i];u[++n]=a,s.postMessage({id:n,action:o.default.CALL_FUNCTION_EXPORT,payload:{func:t,params:r}},c(r))})},(i=t)in(a={})?Object.defineProperty(a,i,{value:f,enumerable:!0,configurable:!0,writable:!0}):a[i]=f,a));var a,i,f},{}),run:function(e,t){return new Promise(function(){for(var r=arguments.length,a=Array(r),i=0;i<r;i++)a[i]=arguments[i];u[++n]=a,s.postMessage({id:n,action:o.default.RUN_FUNCTION,payload:{func:e.toString(),params:t}},c(t))})}})}else 1===i&&u[a][1](l);else f!==o.default.CALL_FUNCTION_EXPORT&&f!==o.default.RUN_FUNCTION||u[a][i](l);u[a]=null},new Promise(function(){for(var t=arguments.length,r=Array(t),a=0;a<t;a++)r[a]=arguments[a];u[++n]=[].concat(r),s.postMessage({id:n,action:o.default.COMPILE_MODULE,payload:(0,i.getWasmSource)(e)})})};var o=u(n(2)),a=u(n(3)),i=n(4);function u(e){return e&&e.__esModule?e:{default:e}}var c=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).filter(function(e){return e instanceof ArrayBuffer||e instanceof MessagePort||e instanceof ImageBitmap})}},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);console.log("here"),o()("main.wasm").then(e=>e.exports.add(1,2)).then(e=>{console.log("1 + 2 = "+e)}).catch(e=>{console.error(e)})},function(e,t,n){"use strict";t.__esModule=!0;t.default={COMPILE_MODULE:0,CALL_FUNCTION_EXPORT:1,RUN_FUNCTION:2}},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e){var t=e.data,n=t.id,r=t.action,o=t.payload,a=function(e,t){self.postMessage({id:n,action:r,result:e,payload:t})},i=function(e){return a(1,""+e)},u=a.bind(null,0);if(r===ACTIONS.COMPILE_MODULE)Promise.resolve().then(function(){var e=void 0;if(void 0!==getImportObject&&(importObject=getImportObject()),"string"==typeof o){if(e=fetch(o),void 0!==WebAssembly.instantiateStreaming)return WebAssembly.instantiateStreaming(e,importObject);e=e.then(function(e){return e.arrayBuffer()})}else e=Promise.resolve(o);return e.then(function(e){return WebAssembly.compile(e)}).then(function(e){return WebAssembly.instantiate(e,importObject).then(function(t){return{module:e,instance:t}})})}).then(function(e){var t=e.module,n=e.instance;moduleInstance=n,wasmModule=t,u({exports:WebAssembly.Module.exports(t).filter(function(e){return"function"===e.kind}).map(function(e){return e.name})})}).catch(i);else if(r===ACTIONS.CALL_FUNCTION_EXPORT){var c=o.func,f=o.params;Promise.resolve().then(function(){var e=moduleInstance.exports;u(e[c].apply(e,f))}).catch(i)}else if(r===ACTIONS.RUN_FUNCTION){var l=o.func,s=o.params;Promise.resolve().then(function(){var e=new Function("return "+l)();u(e({module:wasmModule,instance:moduleInstance,importObject:importObject,params:s}))}).catch(i)}}},function(e,t,n){"use strict";t.__esModule=!0;t.getWasmSource=function(e){var t=e;return"string"==typeof t&&"undefined"!=typeof location&&(0===(t=t.trim()).indexOf("/")?t=location.origin+t:0!==t.indexOf("http")&&(t=location.href+("/"===location.href[location.href.length-1]?"":"/")+t)),t}}]);