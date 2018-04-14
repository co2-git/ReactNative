const path = require('path');

module.exports = {
  target: 'electron-renderer',
  entry: './render-desktop.js',
  output: {
    filename: 'desktop.js',
    path: path.resolve(__dirname, 'bundles'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /node_modules\/react-native/,
        loader: 'ignore-loader',
      },
    ],
  },
};
