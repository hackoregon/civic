const requireHelper = require('./requireHelper');

function colocatedStylusLoader(source, inputMap) {
  this.cacheable();

  const requireString = requireHelper(this.resourcePath, source, 'styl');

  this.callback(null, requireString, inputMap);
}

module.exports = colocatedStylusLoader;
