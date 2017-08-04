
// const getConfig = require(resolve(''))

// This configuration is used to produce UMD modules
const webpack = require('webpack');
const { resolve } = require('path');

function getConfig(entry = './src/index.js', filename = 'index.js', path = './dist') {
  return {
    entry,
    output: {
      filename: 'index.js',
      path,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.DedupePlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel'],
          include: resolve('./src'),
          exclude: resolve('./node_modules/'),
        },
        // Css
        {
          test: /\.css$/,
          loader: 'style!css-loader',
        },
        // Font
        {
          test: /\.woff$/,
          loader: 'url?limit=100000',
        },
        // Img
        {
          test: /\.gif|ttf|eot|svg|png$/,
          loader: 'file',
        },
        // Json
        {
          test: /\.json$/,
          loader: 'json',
        },
      ],
    },
    resolve: {
      extensions: ['', '.js'],
    },
  };
}
const config = getConfig();

webpack(config).run((err) => {
  if (err) { console.error(err); }
  console.log('Bundle completed');
});
module.exports = config;
