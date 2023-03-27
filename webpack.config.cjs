// import webpack from 'webpack'
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/static/js/quill-setup.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'quill-bundle.js',
    // publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};