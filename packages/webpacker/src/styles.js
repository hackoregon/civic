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

const vendorCssPattern = /assets\/.*\.css$/;
const globalCssPattern = /global\.styles\.css$/;
const allCssPattern = /\.css$/;

const loaders = [
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

export default {
  plugins: [mainCss, globalCss, vendorCss],
  module: {
    rules: loaders,
  },
};
