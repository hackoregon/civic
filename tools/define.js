const Require      = require;
const webpack      = Require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const mergeConfig  = Require('webpack-partial/partial').default;
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
