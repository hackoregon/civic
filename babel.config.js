console.log('BABEL BABEL BABY');

module.exports = function(api) {
  api.cache(true);

  return {
    extends: '@hackoregon/civic-babel-presets/.babelrc',
  };
};
