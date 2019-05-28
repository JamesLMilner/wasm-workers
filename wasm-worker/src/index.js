import wasmWorker from 'wasm-worker';

console.log("here");

// supposing an "add.wasm" module that exports a single function "add"
wasmWorker('main.wasm')
  .then(module => {
    return module.exports.add(1, 2);
  })
  .then(sum => {
    console.log('1 + 2 = ' + sum);
  })
  .catch(ex => {
    // ex is a string that represents the exception
    console.error(ex);
  });
