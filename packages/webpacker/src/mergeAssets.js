import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { BUNDLE_PATH, PUBLIC_DIR } from './paths';

const assetsPattern = path.resolve(BUNDLE_PATH, 'isomorphic-assets.*');
const assetsPath = path.resolve(BUNDLE_PATH, PUBLIC_DIR, 'isomorphic-assets.json');

glob(assetsPattern, (readErr, files) => {
  const assets = files.reduce((result, file) => {
    const fileAssets = require(file); // eslint-disable-line

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
