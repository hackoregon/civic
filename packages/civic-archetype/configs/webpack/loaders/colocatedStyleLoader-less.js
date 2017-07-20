const requireHelper = require('./requireHelper');

function colocatedLessLoader(source, inputMap) {
  this.cacheable();

  const requireString = requireHelper(this.resourcePath, source, 'less');

  this.callback(null, requireString, inputMap);
}

module.exports = colocatedLessLoader;
