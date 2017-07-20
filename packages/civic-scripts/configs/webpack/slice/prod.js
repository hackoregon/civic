const { join } = require('path');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function applyArchetypeConfigs(civicPaths) {
  const {
    appRoot,
  } = civicPaths;

  return function createWebpackProdConfig(sharedConfig) {
    const { output } = sharedConfig;

    // eslint-disable-next-line prefer-object-spread/prefer-object-spread
    const prodOutput = Object.assign({}, output, {
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].[hash].chunk.js',
      sourceMapFilename: '[file].map',
    });

    const prodPlugins = [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'commons'],
        filename: '[name].[hash].bundle.js',
        minChunks: 4,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true,
        name: 'vendor',
        chunks: ['app'],
        filename: '[name].[hash].bundle.js',
        minChunks: Infinity,
      }),
      new webpack.DefinePlugin({
        __DEV__: false,
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        /* Needs to be set to true, Documentation specifies that it should be
         * defaulting to true, but for webpack2 this doesn't seem to be the case.
         * Webpack Issue: https://github.com/webpack/webpack/issues/2725#issuecomment-231679286
         */
        sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
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
      bail: true,
      output: prodOutput,
      devtool: 'source-map',
      plugins: sharedConfig.plugins.concat(prodPlugins),
    });
  };
}

module.exports = applyArchetypeConfigs;
