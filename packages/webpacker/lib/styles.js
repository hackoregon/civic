'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var styleLoader = require.resolve('style-loader');
var cssLoader = require.resolve('css-loader');
var postcssLoader = require.resolve('postcss-loader');

var env = process.env.NODE_ENV;
var isProd = env === 'production';
var className = isProd ? '[hash:base64:5]' : '[path][name]__[local]-[hash:base64:5]';
var cssModules = '?modules&importLoaders=1&localIdentName=' + className;

var mainCss = new ExtractTextPlugin('main.css');
var globalCss = new ExtractTextPlugin('global.css');
var vendorCss = new ExtractTextPlugin('vendor.css');

var extractVendors = vendorCss.extract({
  fallback: styleLoader,
  use: ['' + cssLoader]
});

var extractLoader = mainCss.extract({
  fallback: styleLoader,
  use: ['' + cssLoader + cssModules, postcssLoader]
});

var extractGlobals = globalCss.extract({
  fallback: styleLoader,
  use: ['' + cssLoader, postcssLoader]
});

var vendorCssPattern = /assets\/.*\.css$/;
var globalCssPattern = /global\.styles\.css$/;
var allCssPattern = /\.css$/;

var loaders = [{
  test: allCssPattern,
  exclude: [globalCssPattern, vendorCssPattern],
  use: extractLoader
}, {
  test: globalCssPattern,
  use: extractGlobals
}, {
  test: vendorCssPattern,
  use: extractVendors
}];

exports.default = {
  plugins: [mainCss, globalCss, vendorCss],
  module: {
    rules: loaders
  }
};