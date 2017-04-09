const Require = require;
const mergeConfig = Require('webpack-partial/partial').default;
const babelLoader = Require.resolve('babel-loader');

module.exports = () => config => mergeConfig(config, {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: babelLoader,
        query: {
          presets: [
            'react',
            'stage-1',
                  ['es2015', { modules: false }],
          ],
          plugins: [
            'transform-regenerator',
            'transform-object-rest-spread',
            'transform-es2015-destructuring',
            'transform-class-properties',
          ],
        },
      },
    ],
  },
});
