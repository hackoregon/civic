'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  module: {
    rules: [{
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        emitFile: true
      }
    }]
  }
};