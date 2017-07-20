const { join } = require('path');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function applyConfigsToDev({ appRoot }) {
  return function createWebpackDevConfig(sharedConfig) {
    const { output } = sharedConfig;

    // eslint-disable-next-line prefer-object-spread/prefer-object-spread
    const devOutput = Object.assign({}, output, {
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      sourceMapFilename: '[file].map',
    });

    const devPlugins = [
      new webpack.DefinePlugin({
        __DEV__: true,
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'commons'],
        filename: '[name].bundle.js',
        minChunks: 4,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true,
        name: 'vendor',
        chunks: ['app'],
        filename: '[name].bundle.js',
        minChunks: Infinity,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: join(appRoot, 'reports', 'webpack', 'webpack.html'),
        statsFilename: join(appRoot, 'reports', 'webpack', 'stats.json'),
        openAnalyzer: false,
        generateStatsFile: true,
        logLevel: 'error',
      }),
    ];

    // eslint-disable-next-line prefer-object-spread/prefer-object-spread
    return Object.assign({}, sharedConfig, {
      devtool: 'source-map',
      output: devOutput,

      plugins: sharedConfig.plugins.concat(devPlugins),
    });
  };
}

module.exports = applyConfigsToDev;
