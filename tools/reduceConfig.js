import { is, reduce, groupBy, mergeWithKey } from 'ramda';

const isArray = is(Array);
const isFunction = is(Function);
const isUndefined = value => value === undefined;

const unique = '___uniq!';

const entry = (dst, src) => {
  if (typeof dst === 'object' && typeof src === 'object') {
    return {
      ...dst,
      ...src,
    };
  }
  return src;
};

const name = ent => (
  isFunction(ent) || (ent && isUndefined(ent.name))
  ? unique
  : ent.name
);

const inherit = (...args) => mergeWithKey(
    (key, dst, src) => {
      if (dst === src) {
        return dst;
      } else if (key === 'entry' && src === dst.entry) {
        return entry(dst, src);
      } else if (key === 'plugins') {
        return dst.concat(src);
      } else if (isArray(dst) && isArray(src)) {
        return reduce(
          (items, group, n) => (
            n !== unique
            ? items.concat(inherit(...group))
            : items.concat(...group)),
          [],
          groupBy(name, dst.concat(src)),
        );
      } else if (key === 'module') {
        if (dst.rules) {
          return { rules: src.rules.concat(dst.rules) };
        }
      }
      return undefined;
    },
    ...args,
);

export const normalize = (config, val) => {
  if (typeof val === 'string') {
    throw new TypeError('Did not expect a string');
  } else if (typeof val === 'function') {
    return entry(config);
  }
  return val;
};

const reduceConfig = (...args) => args.reduce((config, val) => {
  const newVal = inherit(config, normalize(config, val));
  return newVal;
}, {});

export default reduceConfig;
