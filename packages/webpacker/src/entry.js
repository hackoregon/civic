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
};