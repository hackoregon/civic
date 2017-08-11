'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _paths = require('./paths');

// import webpack from 'webpack';
exports.default = {
  entry: {
    app: [(0, _path.join)(_paths.SRC_PATH, 'client/index.js')]
    // vendor: [
    //   'react',
    //   'react-dom',
    //   'react-helmet',
    //   'react-redux',
    //   'react-router',
    //   'leaflet',
    // ],
  }
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor',
  //     chunks: ['app'],
  //     filename: 'js/[name].bundle.js',
  //     minChunks: ({ resource }) => /node_modules/.test(resource),
  //   }),
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor-css',
  //     chunks: ['app'],
  //     filename: 'css/[name].[chunkHash].css',
  //     minChunks: ({ resource }) => /node_modules/.test(resource),
  //   }),
  // ],
};