const Require = require;
const mergeWebpackConfig = Require('webpack-partial/partial').default;
const urlLoader = Require.resolve('url-loader');
const fileLoader = Require.resolve('file-loader');

module.exports = () => config => mergeWebpackConfig(config, {
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
