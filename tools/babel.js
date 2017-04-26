const babelLoader = require.resolve('babel-loader');
const mergeConfig = require('./reduceConfig').default;

module.exports = () => (config) => {
  const newConfig = mergeConfig(config, {
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
              'syntax-dynamic-import',
            ],
          },
        },
      ],
    },
  });
  return newConfig;
};
