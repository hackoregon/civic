// requires
const { resolve }                          = require('path');
const { writeFile, existsSync, mkdirSync } = require('fs');
const { createMonitor, walk }              = require('watch');
const { transformFileSync }                = require('babel-core');
const colors                               = require('colors/safe');

// resolves
const PKGS                                 = resolve(__dirname, '../packages');
const babelrc                              = resolve(__dirname, '..', '.babelrc');

// consts
const watchFlag = process.argv[2] === '--watch';

// patterns
const jsFileReg = /.js/;
const srcReg    = /\/src\//;
const pathReg   = /(\/.*\/)/;
const blackFlagsString = [
  'node_modules',
  '__tests__',
  'lib',
  'dist',
  'civic-scripts',
  'civic-logger',
  '.test.',
  '.story.',
  '.json',
].join('|');
const blackFlagsReg = new RegExp(`(${blackFlagsString})`);

function babelMe(filename) {
  return transformFileSync(filename, { extends: babelrc });
}

function getLibFromString(srcString) {
  return srcString.replace(srcReg, '/lib/');
}

function babelify(filename) {
  if (!jsFileReg.test(filename)) return;

  const libFile = getLibFromString(filename);
  const { code } = babelMe(filename);
  const libDir = libFile.match(pathReg)[0];

  const dirDoesExist = existsSync(libDir);

  if (dirDoesExist) {
    writeFile(libFile, code);
  } else {
    mkdirSync(libDir);
  }

  console.log(`${filename} ⤖ ${colors.green(libFile)}`);
}

function watchCallback(monitor) {
  monitor.on('changed', babelify);
}

function initialWalkCallback(f, files) {
  const initialFiles = Object.keys(files)
    .reduce((memo, curr) => {
      if (memo.indexOf(curr) !== -1) return memo;
      return memo.concat(curr);
    }, []);

  initialFiles.forEach(babelify);
}

const options = {
  ignoreDotFiles: true,
  ignoreNotPermitted: true,
  interval: 0.5,
  filter(filename) {
    return !blackFlagsReg.test(filename);
  },
};

walk(PKGS, options, initialWalkCallback);

if (watchFlag) {
  createMonitor(PKGS, options, watchCallback);
}
