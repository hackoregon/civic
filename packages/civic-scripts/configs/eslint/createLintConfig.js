const { existsSync } = require('fs');
const { join } = require('path');

const logger = require('@hackoregon/civic-logger');

function createLintArgs({
  appRoot,
  archRoot,
  executables: { multiFormatter, eslint },
  configs: { appEslintrc, archEslintrc },
}, fix) {
  // allow the application to extend the eslint
  let lintConfig = archEslintrc;
  const maybeAppEslintrc = appEslintrc;
  if (existsSync(maybeAppEslintrc)) {
    lintConfig = maybeAppEslintrc;
  }

  logger.info('using .eslintrc located at:');
  logger.padLeft(lintConfig);

  const lintArgs = [
    '--format', multiFormatter,
    join(appRoot, 'src'),
    '--config', lintConfig,
    '--color',
    fix && '--fix',
  ].filter(Boolean);

  return [
    eslint,
    lintArgs,
    { stdio: ['pipe', process.stdout, process.stderr] },
  ];
}

module.exports = createLintArgs;
