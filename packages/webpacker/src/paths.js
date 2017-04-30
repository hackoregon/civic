import { join } from 'path';
import getPaths from './getPaths';

const src = getPaths().src;

// get from available data or set opinions
export const BUILD_DIR   = getPaths().build.dir || 'build';
export const SRC_DIR     = src.dir || 'src';
export const CLIENT_DIR  = src.client || 'client';
export const SERVER_DIR  = src.server || 'server';
export const PUBLIC_DIR  = 'public';

// export absolute paths
export const ROOT_PATH   = getPaths().cwd;
export const BUNDLE_PATH = join(ROOT_PATH, BUILD_DIR);
export const SRC_PATH    = join(ROOT_PATH, SRC_DIR);
