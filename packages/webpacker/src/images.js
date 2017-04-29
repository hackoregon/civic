export default {
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
};
