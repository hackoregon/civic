export default {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          emitFile: true,
        },
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
