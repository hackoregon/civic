import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { compose } from 'ramda';

const babelConfig      = require('./babel');
const defineConfig     = require('./define');
const fontsConfig      = require('./fonts');
const imageConfig      = require('./images');
const stylesConfig     = require('./styles');
const REAL_ROOT        = require('app-root-dir').get();

const PUBLIC_PARAM     = 'public';
const BUNDLE_PATH      = resolve(REAL_ROOT, 'build');
const SRC_PATH         = resolve(REAL_ROOT, 'src');

const env              = process.env.NODE_ENV;
const isDev            = env === 'development';
const isProd           = env === 'production';
const assetFileName    = 'civic-assets.json';
const staticServerAddr = `http://localhost:3001/${PUBLIC_PARAM}/`;

const removeEmpty = arr => arr.filter(item => !!item);
const IsomorphicLoaderPlugin = require('isomorphic-loader/lib/webpack-plugin');

const config = {
  context: REAL_ROOT,
  cache: true,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: isDev ? 'source-map' : 'hidden-source-map',
  target: 'web',
  entry: {
    app: [
      resolve(SRC_PATH, 'client/index.js'),
    ],
    vendor: [
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router',
    ],
  },
  output: {
    path: `${BUNDLE_PATH}/${PUBLIC_PARAM}/`,
    publicPath: staticServerAddr,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
  plugins: removeEmpty([
    new IsomorphicLoaderPlugin({ keepExistingConfig: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      filename: 'js/[name].bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer] } }),
    isProd && (
          new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
          })
        ),
    // isProd && (new webpack.optimize.AggressiveMergingPlugin({})),
    new AssetsPlugin({
      filename: assetFileName,
      prettyPrint: true,
      path: BUNDLE_PATH,
    }),
  ]),
};

const webpackConfig = compose(
  babelConfig(),
  stylesConfig(),
  defineConfig(),
  fontsConfig(),
  imageConfig(),
  // () => isProd && optimizeConfig(),
)(config);

export default webpackConfig;
