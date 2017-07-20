const requireHelper = require('./requireHelper');

function colocatedCssLoader(source, inputMap) {
  this.cacheable();

  const requireString = requireHelper(this.resourcePath, source, 'css');

  this.callback(null, requireString, inputMap);
}

module.exports = colocatedCssLoader;
