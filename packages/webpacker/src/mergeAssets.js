import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { BUILD_DIR, PUBLIC_DIR, ROOT_PATH } from './paths';

const assetsPattern = path.resolve(ROOT_PATH, BUILD_DIR, 'isomorphic-assets.*');
const assetsPath = path.resolve(ROOT_PATH, BUILD_DIR, PUBLIC_DIR, 'isomorphic-assets.json');

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
