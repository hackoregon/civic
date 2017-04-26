const fs = require('fs');
const glob = require('glob');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const assetsPattern = path.resolve(rootDir, '@(build|dll)/isomorphic-assets.*');
const assetsPath = path.resolve(rootDir, 'build/public/isomorphic-assets.json');

glob(assetsPattern, (readErr, filenames) => {
  const assets = filenames.reduce((result, filename) => {
    const fileAssets = require(filename); // eslint-disable-line

    Object.assign(result.marked, fileAssets.marked);
    Object.assign(result.chunks, fileAssets.chunks);

    return result;
  },
    {
      chunks: {},
      marked: {},
    },
  );

  fs.writeFile(assetsPath, JSON.stringify(assets, null, 2), (err) => {
    if (err) {
      throw err;
    }
  });
});
