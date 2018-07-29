var path = require('path');
var SRC = path.join(__dirname, '/client/src');
var DIST = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
