'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  module: {
    rules: [{
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'file-loader!isomorphic-loader'
    }]
  }
};