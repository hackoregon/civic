const webpack = require('webpack');
const {
  createConfig,
  entryPoint,
  setOutput,
  babel,
  file,
  css,
  postcss,
  match,
  setEnv,
  env,
  devServer,
  uglify,
  addPlugins,
  sourceMaps,
} = require('webpack-blocks');

const autoprefixer = require('autoprefixer');
const { resolve } = require('path');

// When calling css as a function, the emotion babel plugin injects
// a sourceMap parameter that ruins everything.
const cssLoader = css;

const path = filePath => resolve(__dirname, filePath);

const isProd = process.env.NODE_ENV === 'production';
const entryPoints = [];

if (!isProd) {
  entryPoints.unshift('webpack-hot-middleware/client?reload=true');
}

module.exports = {
  standard(opts) {
    const options = Object.assign({
      entryPoint: './src/client',
      outputPrefix: path('./'),
    }, opts);
    return createConfig([
      entryPoint([...entryPoints, options.entryPoint]),
      setOutput({
        path: `${options.outputPrefix}${isProd ? '/dist' : '/build'}`,
        publicPath: '/',
        filename: '[name].bundle.js',
      }),
      babel(),
      match(['*.css'], [
        cssLoader({ sourceMap: true }),
        postcss({
          plugins: [autoprefixer({ browsers: ['last 2 versions'] })],
        }),
      ]),
      match(['*.svg', '*.png', '*.gif', '*.jpg', '*.jpeg'], [
        file(),
      ]),
      setEnv({
        NODE_ENV: process.env.NODE_ENV,
      }),
      env('development', [
        sourceMaps(),
        addPlugins([
          new webpack.NamedModulesPlugin(),
          new webpack.HotModuleReplacementPlugin(),
        ]),
      ]),
      env('production', [
        uglify({
          parallel: true,
          cache: true,
          uglifyOptions: {
            compress: {
              warnings: false,
            },
          },
        }),
        addPlugins([
          new webpack.LoaderOptionsPlugin({ minimize: true }),
        ]),
      ]),
    ]);
  },
};
