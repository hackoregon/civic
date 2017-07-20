const { existsSync } = require('fs');

module.exports = function requireHelper(fileName, source, styleExt) {
  let ret = source;
  const maybeFilename = `${fileName.replace(/\.(js|jsx)$/, '')}.${styleExt}`;

  if (existsSync(maybeFilename)) {
    const importStatement = `import '${maybeFilename}'; // eslint-disable-line\n\n`;
    ret = importStatement + source;
  }

  return ret;
};
