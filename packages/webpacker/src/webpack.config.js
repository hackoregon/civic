import composeConfig from './composeConfig';
import { isDev } from './utils';
import { ROOT_PATH } from './paths';

import babelConfig from './babel';
import defineConfig from './define';
import fontsConfig from './fonts';
import imageConfig from './images';
import stylesConfig from './styles';
import pluginsConfig from './plugins';
import entryConfig from './entry';
import outputConfig from './output';

const config = {
  context: ROOT_PATH,
  cache: true,
  // target: 'web',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: isDev ? 'source-map' : 'hidden-source-map',
};

const webpackConfig = composeConfig(
  config,
  entryConfig,
  outputConfig,
  babelConfig,
  stylesConfig,
  defineConfig,
  fontsConfig,
  imageConfig,
  pluginsConfig,
);

export default webpackConfig;
