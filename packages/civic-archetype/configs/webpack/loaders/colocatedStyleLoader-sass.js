const requireHelper = require('./requireHelper');

function colocatedSassLoader(source, inputMap) {
  this.cacheable();

  const requireString = requireHelper(this.resourcePath, source, 'scss');

  this.callback(null, requireString, inputMap);
}

module.exports = colocatedSassLoader;
