const Require = require;
const mergeWebpackConfig = Require('webpack-partial/partial').default;
// const urlLoader = Require.resolve('url-loader');
// const IsomorphicLoaderPlugin = Require('isomorphic-loader/lib/webpack-plugin');
module.exports = () => config => mergeWebpackConfig(config, {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader!isomorphic-loader',
      },
      // {
      //   test: /\.(png|jpg|svg|gif)$/,
      //   loader: urlLoader,
      // },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/,
      //   loader: 'url-loader?name=img/[name].[ext]',
      //   query: {
      //     limit: 10000,
      //     emitFile: true,
      //   },
      // },
    ],
  },
});
