console.log('BABEL BABEL BABY 👼 (using babel.config.js from root)');

module.exports = function(api) {
  api.cache(true);

  return {
    extends: '@hackoregon/civic-babel-presets/.babelrc',
  };
};
