const webpack = require('webpack'); //
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const commitSha = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch', './src/webpack-public-path',
    'webpack-hot-middleware/client?reload=true',
    resolve(__dirname, 'src/client.dev'),
  ],
  target: 'web',
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development'), __DEV__: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/template.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
      commitSha,
    }),
  ],
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'es2015', {
                modules: false,
              },
            ],
            'stage-1',
            'react',
          ],
          plugins: ['transform-object-rest-spread', 'transform-es2015-destructuring', 'transform-class-properties', 'syntax-dynamic-import'],
        },
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=[name].[ext]',
      }, {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]',
      }, {
        test: /(\.css|\.scss)$/,
        loaders: ['style-loader', 'css-loader?sourceMap&modules'],
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
