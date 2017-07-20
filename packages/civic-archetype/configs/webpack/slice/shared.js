const { join } = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

function exposeWebpackDefaults(cliOptions, civicPaths) {
  const {
    baseUrl,
    appRoot,
    appServerPath,
    appPublicPath,
    appClientEntry,
    executables: { babelLoader },
  } = civicPaths;

  const finalBaseUrl = baseUrl
    ? `/${baseUrl}`
    : '';

  const finalServerAddress = appServerPath + finalBaseUrl;

  return {
    context: appRoot,
    entry: {
      app: appClientEntry,
      vendor: [
        'react',
        'redux',
        'react-dom',
        'react-helmet',
        'react-redux',
        'react-router',
        'immutable',
        '@hackoregon/civic',
      ],
    },
    output: {
      pathinfo: true,
      path: join(appPublicPath, 'js'),
      publicPath: `${finalServerAddress}/js/`,
    },
    plugins: [
      new webpack.PrefetchPlugin('react'),
      new webpack.PrefetchPlugin('redux'),
      new webpack.PrefetchPlugin('react-redux'),
      new webpack.PrefetchPlugin('react-dom'),
      new webpack.PrefetchPlugin('react-helmet'),
      new webpack.PrefetchPlugin('react-router'),
      new webpack.PrefetchPlugin('immutable'),
      new webpack.PrefetchPlugin('@hackoregon/civic'),
      new AssetsPlugin({ path: appRoot }),
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: babelLoader,
          include: join(appRoot, 'src'),
          options: {
            babelrc: false,
            presets: [
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-1'),
              [require.resolve('babel-preset-es2015'), { modules: false }],
            ],
          },
        },
      ],
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  };
}

module.exports = exposeWebpackDefaults;
