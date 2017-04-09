const Require              = require;
const mergeConfig          = Require('webpack-partial/partial').default;
// const ExtractTextPlugin = Require('extract-text-webpack-plugin');
const styleLoader          = Require.resolve('style-loader');
const cssLoader            = Require.resolve('css-loader');
const postcssLoader        = Require.resolve('postcss-loader');

// loader: ExtractTextPlugin.extract({
//        fallbackLoader: 'style-loader',
//        loader: [
//            'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]',
//            'postcss-loader'
//        ]
//     }),

const cssModuleSupport = `?modules&importLoaders =1&localIdentName =[hash:base64:5]!${postcssLoader}`;
// const env           = process.env.NODE_ENV;
// const isProd        = env === 'production';

module.exports = () => (config) => {
  const loaders = [
    {
      test: /\.css$/,
      /* eslint-disable prefer-template */
      loader: styleLoader + '!' + cssLoader + cssModuleSupport,
      /* eslint-enable prefer-template */
    },
  ];

  return mergeConfig(config, {
    module: {
      rules: loaders,
    },
  });
};
