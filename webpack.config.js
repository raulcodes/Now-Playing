const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.scss$/, exclude: /node_modules/, use: [ 'style-loader', 'css-loader', 'sass-loader' ]},
      { test: /\.applescript$/, loader: "file-loader"}
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
