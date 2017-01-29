/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack'); //
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { resolve } = require('path');

const commitSha = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  debug: true,
  devtool: 'source-map',
  noInfo: true,
  entry: [
    './src/webpack-public-path',
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    resolve(__dirname, 'src/client.js'),
  ],
  target: 'web',
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/template.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
      commitSha,
    }),
  ],
  babelQuery: {
    presets: ['babel-preset-react-hmre'].map(require.resolve),
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel?presets[]=es2015'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file?name=[name].[ext]' },
      { test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'postcss'] },
      { test: /\.json$/, loader: 'json' },
    ],
  },
  postcss: () => [autoprefixer],
};
