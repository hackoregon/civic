import webpack from 'webpack';
import { join } from 'path';
import { SRC_PATH } from './paths';

export default {
  entry: {
    app: [
      // resolve(SRC_PATH, 'webpack-public-path'),
      join(SRC_PATH, 'client/index.js'),
    ],
    vendor: [
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router',
      'leaflet',
    ],
  },
  plugins: [
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
  ]
};