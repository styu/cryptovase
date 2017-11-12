const path = require('path');

 module.exports = {
     entry: {
         app: "./js/app.js",
         "vase.demo": "./js/vase.demo.js",
         "coin_adapter": "./js/coin_adapter.js",
         "mining.demo": "./js/mining.demo.js",
         "falling.vase.demo": "./js/falling.vase.demo.js",
     },
     output: {
         path: path.resolve(__dirname, 'js'),
         filename: 'dist/[name].js',
     },
     module: {
         loaders: [{
             test: /\.js?$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 }