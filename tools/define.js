const webpack      = require('webpack');
const mergeConfig  = require('./reduceConfig').default;

const DefinePlugin = webpack.DefinePlugin;
const env          = process.env.NODE_ENV;
const isDev        = env === 'development';

module.exports = () => config => mergeConfig(config, {
  plugins: [
    new DefinePlugin({
      __DEV__: isDev,
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
});
