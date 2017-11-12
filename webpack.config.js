const path = require('path');

 module.exports = {
     entry: {
         app: "./js/app.js"
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