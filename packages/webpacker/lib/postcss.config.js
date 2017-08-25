'use strict';

module.exports = {
  module: {
    rules: [{
      test: /\.css/,
      use: [{
        loader: 'postcss-loader',
        options: {
          plugins: function plugins() {
            return [require('autoprefixer')];
          }
        }
      }]
    }]
  }
};