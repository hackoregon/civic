module.exports = {
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  require('autoprefixer'),
                ];
              },
            },
          },
        ],
      },
    ],
  },
};
