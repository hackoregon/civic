const path = require('path');
const fs = require('fs');

const ROOT = process.cwd();

function getAppSettings(prodDir = 'build', reactLib = 'react') {
  const client = 'client';
  const server = 'server';

  let srcDir = '';
  let buildDir = '';
  const savedFile = path.join(ROOT, prodDir, '.app-settings.json');

  const loadSavedAppMode = () => {
    const savedFileFP = path.resolve(savedFile);
    if (fs.existsSync(path.resolve(ROOT, 'src', client)) || fs.existsSync(path.resolve(ROOT, 'src', server))) {
      srcDir = 'src';
      buildDir = 'build';
    } else if (fs.existsSync(savedFileFP)) {
      return JSON.parse(fs.readFileSync(savedFileFP));
    }

    return {};
  };

  const saved = loadSavedAppMode();

  const envKey = 'APP_SRC_DIR';
  return Object.assign({
    reactLib,
    savedFile,
    envKey,
    isSrc: !!srcDir,
    setEnv: (d) => {
      let dir = d;
      if (dir) {
        if (!dir.endsWith('/')) {
          dir += '/';
        }
        process.env[envKey] = dir;
      } else {
        delete process.env[envKey];
      }
    },
    getEnv: () => process.env[envKey],
    hasEnv: () => !!process.env[envKey],
    src: {
      dir: srcDir,
      client: path.join(ROOT, srcDir, client),
      server: path.join(ROOT, srcDir, server),
    },
    build: {
      dir: buildDir,
      client: path.join(ROOT, buildDir, client),
      server: path.join(ROOT, buildDir, server),
    },
  }, saved);
}

module.exports = getAppSettings;
