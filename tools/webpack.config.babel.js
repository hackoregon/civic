const webpack          = require('webpack');
const AssetsPlugin     = require('assets-webpack-plugin');
const autoprefixer     = require('autoprefixer');
const { resolve }      = require('path');

const { defaultConfig, composeConfig } = require('@hackoregon/webpacker'); // eslint-disable-line

const PUBLIC_PARAM     = 'public';
const REAL_ROOT        = resolve(__dirname, '..');
const BUNDLE_PATH      = resolve(REAL_ROOT, 'build');
const SRC_PATH         = resolve(REAL_ROOT, 'src');

const env              = process.env.NODE_ENV;
const isDev            = env === 'development';
const isProd           = env === 'production';
const assetFileName    = 'civic-assets.json';
const staticServerAddr = `http://civicpdx.org:8080/${PUBLIC_PARAM}/`;

const removeEmpty = arr => arr.filter(item => !!item);
const IsomorphicLoaderPlugin = require('isomorphic-loader/lib/webpack-plugin');

const config = {
  context: REAL_ROOT,
  cache: true,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: isDev ? 'source-map' : 'hidden-source-map',
  // target: 'web',
  entry: {
    app: [
      // resolve(SRC_PATH, 'webpack-public-path'),
      resolve(SRC_PATH, 'client/index.js'),
    ],
    // vendor: [
    //   'react',
    //   'react-dom',
    //   'react-helmet',
    //   'react-redux',
    //   'react-router',
    //   'leaflet',
    // ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'stage-1',
                  ['es2015', { modules: false }],
          ],
          plugins: [
            'transform-regenerator',
            'transform-object-rest-spread',
            'transform-es2015-destructuring',
            'transform-class-properties',
            'syntax-dynamic-import',
          ],
        },
      },
    ],
  },
  output: {
    path: `${BUNDLE_PATH}/${PUBLIC_PARAM}/`,
    publicPath: staticServerAddr,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
  plugins: removeEmpty([
    new IsomorphicLoaderPlugin({
      keepExistingConfig: false,
      assetsFile: 'isomorphic-assets.json',
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   chunks: ['app'],
    //   filename: 'js/[name].bundle.js',
    //   minChunks: ({ resource }) => /node_modules/.test(resource),
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor-css',
    //   chunks: ['app'],
    //   filename: 'css/[name].[chunkHash].css',
    //   minChunks: ({ resource }) => /node_modules/.test(resource),
    // }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer] } }),
    isProd && (
          new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
          })
        ),
    new AssetsPlugin({
      filename: assetFileName,
      prettyPrint: true,
      path: BUNDLE_PATH,
    }),
  ]),
};

const webpackConfig = composeConfig(
  defaultConfig,
  config,
);

export default webpackConfig;
