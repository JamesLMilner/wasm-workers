const path = require('path');

module.exports = {
  entry: './wasm-worker/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'wasm-worker/dist')
  }
};