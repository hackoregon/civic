// deps
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// paths
const styleLoader       = require.resolve('style-loader');
const cssLoader         = require.resolve('css-loader');
const postcssLoader     = require.resolve('postcss-loader');

// consts
const env               = process.env.NODE_ENV;
const isProd            = env === 'production';
const className         = isProd ? '[hash:base64:5]' : '[path][name]__[local]-[hash:base64:5]';
const cssModules        = `?modules&importLoaders=1&localIdentName=${className}`;

// instances
const mainCss           = new ExtractTextPlugin('main.css');
const globalCss         = new ExtractTextPlugin('global.css');
const vendorCss         = new ExtractTextPlugin('vendor.css');

const extractVendors = vendorCss.extract({
  fallback: styleLoader,
  use: [
    `${cssLoader}`,
  ],
});
// will want this for prod
const extractLoader = mainCss.extract({
  fallback: styleLoader,
  use: [
    `${cssLoader}${cssModules}`,
    postcssLoader,
  ],
});

const extractGlobals = globalCss.extract({
  fallback: styleLoader,
  use: [
    `${cssLoader}`,
    postcssLoader,
  ],
});

const vendorCssPattern = /assets\/vendor\/.*\.css$/;
const globalCssPattern = /assets\/global\.styles\.css$/;
const allCssPattern = /\.css$/;

const devLoaders = [
  {
    test: allCssPattern,
    exclude: [globalCssPattern, vendorCssPattern],
    // loader: `${styleLoader}!${cssLoader}`,
    use: [
      { loader: styleLoader },
      {
        loader: cssLoader,
        options: {
          modules: true,
          localIdentName: '[path][name]__[local]-[hash:base64:5]',
        },
      },
    ],
  },
  {
    test: globalCssPattern,
    // loader: `${styleLoader}!${cssLoader}`,
    use: [
      { loader: styleLoader },
      { loader: cssLoader },
    ],
  },
  {
    test: vendorCssPattern,
    // loader: `${styleLoader}!${cssLoader}`,
    use: [
      { loader: styleLoader },
      { loader: cssLoader },
    ],
  },
];

const prodLoaders = [
  {
    test: allCssPattern,
    exclude: [globalCssPattern, vendorCssPattern],
    use: extractLoader,
  },
  {
    test: globalCssPattern,
    use: extractGlobals,
  },
  {
    test: vendorCssPattern,
    use: extractVendors,
  },
];

const config = {
  module: {
    rules: devLoaders,
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = [mainCss, globalCss, vendorCss];
  config.module.rules = prodLoaders;
}

export default config;