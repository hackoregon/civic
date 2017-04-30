import webpack from 'webpack';
// import IsomorphicLoaderPlugin from 'isomorphic-loader/lib/webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';

import { removeEmpty, isProd } from './utils';
import { BUNDLE_PATH } from './paths';

const assetFileName = 'webpack-assets.json';
// const isomorphicAssetsFile = 'isomorphic-assets.json';

export default {
  plugins: removeEmpty([
    // new IsomorphicLoaderPlugin({
    //   keepExistingConfig: false,
    //   assetsFile: isomorphicAssetsFile,
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
