const checkKey = (data, key, optionalKeys = {}) => {
  // If key is optional, skip
  if (optionalKeys[key]) {
    return { valid: 0, total: 0, isNull: false };
  }

  const valid = data.filter(datum => key in datum).length;
  const total = data.length;
  const isNull = data[0][key] === null;

  return { valid, total, isNull };
};

const checkData = (data, dataKeys, dataIsObject = false, optionalKeys) => {
  const results = {};
  const isArray = Array.isArray(data) && Array.isArray(dataKeys);
  const validType = (!dataIsObject && isArray) || (dataIsObject && !isArray);
  results.invalidType = !validType;
  const dataAsArray = dataIsObject ? [data] : data;
  // eslint-disable-next-line no-return-assign
  const keyChecks =
    validType &&
    dataKeys.map(key => {
      results[key] = checkKey(dataAsArray, key, optionalKeys);
      return checkKey(dataAsArray, key, optionalKeys);
    });
  results.allKeysValid =
    validType && keyChecks.every(key => key.valid === key.total);
  return results;
};

export default checkData;
