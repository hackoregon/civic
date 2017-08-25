import { staticServer } from './utils';
import { PUBLIC_DIR, BUNDLE_PATH } from './paths';

export default {
  output: {
    path: `${BUNDLE_PATH}/${PUBLIC_DIR}/`,
    publicPath: staticServer,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
};
