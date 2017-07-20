const { join } = require('path');

const validStyles = {
  css: 'css',
  sass: 'sass',
  scss: 'sass',
  stylus: 'styl',
  styl: 'styl',
  less: 'less',
};

function applyOptionsToColocatedStyles(civicPaths, cliOptions) {
  const { styles: styleExtension } = cliOptions;
  const { appRoot, archRoot } = civicPaths;

  return function mergeColocatedStyles(webpackConfig) {
    // return webpackConfig;
    const styleToLoad = validStyles[styleExtension.toLowerCase()];

    // we'll grab the appropriate loader based on file extension, the loader just looks for a
    // stylesheet of the same name and then ungracefully grafts an import statement to the beginning
    // of a file. This of course makes it useless on the server but handy on the client. Coupled
    // with extract-text-plugin, the application can either spit out its stylesheets, keep them
    // within the JS bundle, or both
    const rules = webpackConfig.module.rules.concat({
      loader: join(archRoot, `webpack/loaders/colocatedStyleLoader-${styleToLoad}`),
      test: /\.(js|jsx)$/,
      enforce: 'post',
      include: join(appRoot, 'src'),
    });

    // eslint-disable-next-line prefer-object-spread/prefer-object-spread
    return Object.assign({}, webpackConfig, {
      module: { rules },
    });
  };
}

module.exports = applyOptionsToColocatedStyles;
