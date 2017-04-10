const Require              = require;
const mergeConfig          = Require('webpack-partial/partial').default;
const styleLoader          = Require.resolve('style-loader');
const cssLoader            = Require.resolve('css-loader');
// const postcssLoader        = Require.resolve('postcss-loader');

// will want this for prod
// loader: ExtractTextPlugin.extract({
//        fallbackLoader: 'style-loader',
//        loader: [
//            'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]',
//            'postcss-loader'
//        ]
//     }),

const cssModuleSupport = '?modules&importLoaders=1&localIdentName=[hash:base64:5]';
// const env           = process.env.NODE_ENV;
// const isProd        = env === 'production';

module.exports = () => (config) => {
  const loaders = [
    {
      test: /\.css$/,
      exclude: /global\.styles\.css$/,
      /* eslint-disable prefer-template */
      loader: styleLoader + '!' + cssLoader + cssModuleSupport,
      /* eslint-enable prefer-template */
    },
    {
      test: /global\.styles\.css$/,
      /* eslint-disable prefer-template */
      loader: styleLoader + '!' + cssLoader,
      /* eslint-enable prefer-template */
    },

  ];

  return mergeConfig(config, {
    module: {
      rules: loaders,
    },
  });
};
