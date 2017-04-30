const mergeConfig  = require('./reduceConfig').default;

const urlLoader = require.resolve('url-loader');
const fileLoader = require.resolve('file-loader');

module.exports = () => config => mergeConfig(config, {
  module: {
    rules: [
      {
        test: /\.woff(2)?$/i,
        loader: `${urlLoader}?limit=10000&mimetype=application/font-woff`,
      },
      {
        test: /\.(ttf|eot)$/i,
        loader: fileLoader,
      },
    ],
  },
});
