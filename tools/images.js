const mergeConfig  = require('./reduceConfig').default;
// const IsomorphicLoaderPlugin = Require('isomorphic-loader/lib/webpack-plugin');
module.exports = () => config => mergeConfig(config, {
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
      //   test: /\.(svg)$/,
      //   loader: 'url-loader?name=img/[name].[ext]',
      //   query: {
      //     limit: 10000,
      //     emitFile: true,
      //   },
      // },
    ],
  },
});
