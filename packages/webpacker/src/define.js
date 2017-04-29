import webpack from 'webpack';
import { env, isDev } from './utils';

export default {
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: isDev,
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};
