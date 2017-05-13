/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack'); //
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { resolve } = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');

const commitSha = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();
const { defaultConfig, composeConfig } = require('@hackoregon/webpacker');

const config = {
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  devtool: 'source-map',
  target: 'web',
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false,
    }),
    new HtmlWebpackPlugin({
      template: 'src/template.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      commitSha,
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer] } }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        screw_ie8: true,
        sequences: true,
        properties: true,
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        negate_iife: true,
        hoist_funs: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
        except: ['exports', 'require'],
      },
      output: {
        screw_ie8: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'stage-1',
                  ['es2015', { modules: false }],
          ],
          plugins: [
            'transform-regenerator',
            'transform-object-rest-spread',
            'transform-es2015-destructuring',
            'transform-class-properties',
            'syntax-dynamic-import',
          ],
        },
      },
      { test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]' },
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
};

const entry = {
  entry: resolve(__dirname, 'src/client'),
};

module.exports = composeConfig(defaultConfig, config, entry);