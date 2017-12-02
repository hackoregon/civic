'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// deps
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// paths
var styleLoader = require.resolve('style-loader');
var cssLoader = require.resolve('css-loader');
var postcssLoader = require.resolve('postcss-loader');

// consts
var env = process.env.NODE_ENV;
var isProd = env === 'production';
var className = isProd ? '[hash:base64:5]' : '[path][name]__[local]-[hash:base64:5]';
var cssModules = '?modules&importLoaders=1&localIdentName=' + className;

// instances
var mainCss = new ExtractTextPlugin('main.css');
var globalCss = new ExtractTextPlugin('global.css');
var vendorCss = new ExtractTextPlugin('vendor.css');

var extractVendors = vendorCss.extract({
  fallback: styleLoader,
  use: ['' + cssLoader]
});
// will want this for prod
var extractLoader = mainCss.extract({
  fallback: styleLoader,
  use: ['' + cssLoader + cssModules, postcssLoader]
});

var extractGlobals = globalCss.extract({
  fallback: styleLoader,
  use: ['' + cssLoader, postcssLoader]
});

var vendorCssPattern = /assets\/vendor\/.*\.css$/;
var globalCssPattern = /assets\/global\.styles\.css$/;
var allCssPattern = /\.css$/;

var devLoaders = [{
  test: allCssPattern,
  exclude: [globalCssPattern, vendorCssPattern],
  // loader: `${styleLoader}!${cssLoader}`,
  use: [{ loader: styleLoader }, {
    loader: cssLoader,
    options: {
      modules: true,
      localIdentName: '[path][name]__[local]-[hash:base64:5]'
    }
  }]
}, {
  test: globalCssPattern,
  // loader: `${styleLoader}!${cssLoader}`,
  use: [{ loader: styleLoader }, { loader: cssLoader }]
}, {
  test: vendorCssPattern,
  // loader: `${styleLoader}!${cssLoader}`,
  use: [{ loader: styleLoader }, { loader: cssLoader }]
}];

var prodLoaders = [{
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

var config = {
  module: {
    rules: devLoaders
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = [mainCss, globalCss, vendorCss];
  config.module.rules = prodLoaders;
}

exports.default = config;