// const Path = require('path');
// const Fs = require('fs');
//
// function getAppSettings(prodDir = 'build', reactLib = 'react') {
//   const client = 'client';
//   const server = 'server';
//
//   let srcDir = '';
//   let buildDir = '';
//   const savedFile = Path.join(prodDir, '.app-mode.json');
//
//   const loadSavedAppMode = () => {
//     const savedFileFP = Path.resolve(savedFile);
//     if (Fs.existsSync(Path.resolve('src', client)) || Fs.existsSync(Path.resolve('src', server))) {
//       srcDir = 'src';
//       buildDir = 'build';
//     } else if (Fs.existsSync(savedFileFP)) {
//       return JSON.parse(Fs.readFileSync(savedFileFP));
//     }
//
//     return {};
//   };
//
//   const saved = loadSavedAppMode();
//
//   if (!srcDir) {
//     console.info('There\'s a new src/build mode that doesn\'t need babel-register.');
//   }
//
//   const envKey = 'APP_SRC_DIR';
//   return Object.assign({
//     reactLib,
//     savedFile,
//     envKey,
//     isSrc: !!srcDir,
//     setEnv: (dir) => {
//       if (dir) {
//         if (!dir.endsWith('/')) {
//           dir += '/';
//         }
//         process.env[envKey] = dir;
//       } else {
//         delete process.env[envKey];
//       }
//     },
//     getEnv: () => process.env[envKey],
//     hasEnv: () => !!process.env[envKey],
//     src: {
//       dir: srcDir,
//       client: Path.join(srcDir, client),
//       server: Path.join(srcDir, server),
//     },
//     build: {
//       dir: buildDir,
//       client: Path.join(buildDir, client),
//       server: Path.join(buildDir, server),
//     },
//   }, saved);
// }
//
// module.exports = getAppSettings;
