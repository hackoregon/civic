module.exports = function(api) {
  api.cache(true);

  return {
    extends: '@hackoregon/civic-babel-presets/.babelrc',
  };
};
