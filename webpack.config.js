const Webpack = require('webpack')
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: Path.resolve('dist'),
    filename: 'index_bundle.js',
    sourcePrefix: ''
  },
  node: {
      fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader","css-loader","sass-loader"]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader","css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ["image-webpack-loader","file-loader"]
      }

    ]
  },
  plugins: [
      HtmlWebpackPluginConfig
    ],
};
