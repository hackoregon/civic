import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';

const REAL_ROOT        = require('app-root-dir').get();

// const EXAMPLE_ROOT     = resolve(REAL_ROOT, 'example');
const PUBLIC_PARAM     = 'public';
const BUNDLE_PATH      = resolve(REAL_ROOT, 'build');
const SRC_PATH         = resolve(REAL_ROOT, 'src');

const env              = process.env.NODE_ENV;
const isDev            = env === 'development';
const isProd           = env === 'production';
const assetFileName    = 'civic-assets.json';
const staticServerAddr = `http://localhost:3001/${PUBLIC_PARAM}/`;

const removeEmpty = arr => arr.filter(item => !!item);

const config = {
  context: REAL_ROOT,
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
  module: {
    loaders: removeEmpty([
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            'react',
            'stage-1',
              ['es2015', { modules: false }],
          ],
          plugins: removeEmpty([
            'transform-regenerator',
            'transform-object-rest-spread',
            'transform-es2015-destructuring',
            'transform-class-properties',
          ]),
        },
      },
      {
        test: /\.css$/,
        exclude: /\/global.styles.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.json$/,
        enforce: 'pre',
        loader: 'json-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'url-loader?name=img/[name].[ext]',
        query: {
          limit: 10000,
          emitFile: true,
        },
      },
    ]),
  },
  postcss: () => autoprefixer({ browsers: ['last 2 versions'] }),
  plugins: removeEmpty([
    isProd && new webpack.PrefetchPlugin('react'),
    isProd && new webpack.PrefetchPlugin('redux'),
    new webpack.DefinePlugin({
      __DEV__: isDev,
      'process.env.NODE_ENV': JSON.stringify(env),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      filename: 'js/[name].bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    isDev && new webpack.NoErrorsPlugin(),
    isProd && (
          new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
          })
        ),
    isProd && (new webpack.optimize.AggressiveMergingPlugin({})),
    isProd && (
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              drop_console: true,
              screw_ie8: true,
              sequences: true,
              properties: true,
              dead_code: true,
              drop_debugger: true,
              conditionals: true,
              comparisons: true,
              evaluate: true,
              booleans: true,
              loops: true,
              unused: true,
              if_return: true,
              join_vars: true,
              cascade: true,
              negate_iife: true,
              hoist_funs: true,
              warnings: false,
            },
            mangle: {
              screw_ie8: true,
              except: ['exports', 'require'],
            },
            output: {
              screw_ie8: true,
            },
          })
        ),
    new AssetsPlugin({
      filename: assetFileName,
      prettyPrint: true,
      path: BUNDLE_PATH,
    }),
  ]),
};

export default config;
