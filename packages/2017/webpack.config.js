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

const path = filePath => resolve(__dirname, filePath);

const isProd = process.env.NODE_ENV === 'production';
const entryPoints = [path('src/index')];

if (!isProd) {
  entryPoints.unshift('webpack-hot-middleware/client?reload=true');
}

module.exports = createConfig([
  entryPoint(entryPoints),
  setOutput({
    path: path(isProd ? 'dist' : 'build'),
    publicPath: '/',
    filename: '[name].bundle.js',
  }),
  babel(),
  match(['*.css'], [
    css(),
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
    devServer(),
    sourceMaps(),
  ]),
  env('production', [
    uglify(),
    addPlugins([
      // new webpack.LoaderOptionsPlugin({ minimize: true }),
    ]),
  ]),
]);
