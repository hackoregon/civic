const extendRequire = require('isomorphic-loader/lib/extend-require');
const settings = require('../../tools/app-settings.js')();

require('css-modules-require-hook')({
  generateScopedName: '[path][name]__[local]___[hash:base64:5]',
});

extendRequire({
  startDelay: 1000,
  processAssets: (assets) => {
    const appSrcDir = (settings.getEnv() || settings.build.dir).split('/')[0];
    if (appSrcDir !== settings.src.dir && assets.marked) {
      const marked = assets.marked;
      Object.keys(marked).forEach((k) => {
        if (k.startsWith(settings.src.client) || k.startsWith(settings.src.server)) {
          const nk = k.replace(settings.src.dir, appSrcDir);
          marked[nk] = marked[k];
        }
      });
    }
    return assets;
  },
}).then(() => {
  require('./server');
}).catch((err) => {
  console.log('Error in isomorphic-loader', err); // eslint-disable-line
});
