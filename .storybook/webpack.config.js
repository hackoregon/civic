const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const {
  createConfig,
  match,
  css,
  postcss,
  file,
  customConfig,
} = require('webpack-blocks');

module.exports = createConfig([
  match(
    ['*.css'],
    [
      css,
      postcss({
        plugins: [autoprefixer({ browsers: ['last 2 versions'] })],
      }),
    ]
  ),
  match(['*.svg', '*.png', '*.gif', '*.jpg', '*.jpeg'], [file()]),
  customConfig({
    externals: [
      {
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}',
      },
    ],
  }),
]);
