import { PUBLIC_DIR } from './paths';

export const staticServer = `http://localhost:3001/${PUBLIC_DIR}/`;

export const env          = process.env.NODE_ENV;
export const isDev        = env === 'development';
export const isProd       = env === 'production';

export const removeEmpty = arr => arr.filter(item => !!item);
