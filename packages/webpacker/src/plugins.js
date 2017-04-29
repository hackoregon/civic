import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';

import { removeEmpty, isProd } from './utils';
import { BUNDLE_PATH } from './paths';

const IsomorphicLoaderPlugin = require('isomorphic-loader/lib/webpack-plugin');

const assetFileName       = 'civic-assets.json';

export default {
  plugins: removeEmpty([
    new IsomorphicLoaderPlugin({
      keepExistingConfig: false,
      assetsFile: 'isomorphic-assets.json',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      filename: 'js/[name].bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor-css',
      chunks: ['app'],
      filename: 'css/[name].[chunkHash].css',
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
