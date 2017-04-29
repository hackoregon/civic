import path from 'path';
import fs from 'fs';

// we'll be inside node_modules when called...
const cwd = process.cwd();

export default function getPaths(prodDir = 'build') {
  const client    = 'client';
  const server    = 'server';

  let srcDir      = '';
  let buildDir    = '';

  const pathsRc = path.join(cwd, prodDir, '.pathsrc');

  const getRcData = () => {
    const pathsRcPath = path.resolve(pathsRc);
    const srcClientPath = path.resolve(cwd, 'src', client);
    const srcServerPath = path.resolve(cwd, 'src', server);

    if (fs.existsSync(srcClientPath) || fs.existsSync(srcServerPath)) {
      srcDir = 'src';
      buildDir = 'build';
    } else if (fs.existsSync(pathsRcPath)) {
      return JSON.parse(fs.readFileSync(pathsRcPath));
    }

    return {};
  };

  const rcData = getRcData();

  return {
    cwd,
    pathsRc,
    src: {
      dir: srcDir,
      client: path.join(srcDir, client),
      server: path.join(srcDir, server),
    },
    build: {
      dir: buildDir,
      client: path.join(buildDir, client),
      server: path.join(buildDir, server),
    },
    ...rcData,
  };
}
