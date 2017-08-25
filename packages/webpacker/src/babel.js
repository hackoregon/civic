const babelLoader = require.resolve('babel-loader');
const babelQuery = require('@hackoregon/civic-babel-presets');

export default {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: babelLoader,
        query: babelQuery,
      },
    ],
  },
};
