/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack'); //
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const commitSha = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();

module.exports = {
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  debug: true,
  devtool: 'source-map',
  noInfo: true,
  entry: resolve(__dirname, 'src/client'),
  target: 'web',
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false,
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      template: 'src/template.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      commitSha,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        screw_ie8: true,
        sequences: true,
        properties: true,
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        negate_iife: true,
        hoist_funs: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
        except: ['exports', 'require'],
      },
      output: {
        screw_ie8: true,
      },
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel?presets[]=es2015'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url?name=[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]' },
      { test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file?name=[name].[ext]' },
      { test: /(\.css|\.scss)$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules', 'postcss') },
      { test: /\.json$/, loader: 'json' },
    ],
  },
  postcss: () => [autoprefixer],
};
