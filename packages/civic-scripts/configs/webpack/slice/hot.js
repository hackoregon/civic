const webpack = require('webpack');

function applyHotness({ webpackDevAddress, webpackDevPort, appNodeModules }) {
  const serverAddress = `${webpackDevAddress}:${webpackDevPort}`;
  const webpackHotPath = `${appNodeModules}/webpack-dev-server/client?${serverAddress}`;

  return function createWebpackHotConfig(webpackConfig) {
    const {
      entry: { vendor, app, commons = [] },
      output,
    } = webpackConfig;

    // eslint-disable-next-line prefer-object-spread/prefer-object-spread
    const hotOutput = Object.assign({}, output, {
      publicPath: `${serverAddress}/js/`,
    });

    const hotEntry = {
      vendor,
      app: [
        'react-hot-loader/patch',
        webpackHotPath,
        `${appNodeModules}/webpack/hot/dev-server`,
        app,
      ],
      commons: [
        'react-hot-loader/patch',
        webpackHotPath,
        `${appNodeModules}/webpack/hot/dev-server`,
      ].concat(commons),
    };

    // eslint-disable-next-line prefer-object-spread/prefer-object-spread
    return Object.assign({}, webpackConfig, {
      output: hotOutput,
      entry: hotEntry,
      plugins: webpackConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
      ]),
    });
  };
}

module.exports = applyHotness;
