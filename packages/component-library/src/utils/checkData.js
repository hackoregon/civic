const checkKey = (data, key) => {
  const valid = data.filter(datum => key in datum).length;
  const total = data.length;
  return { valid, total };
};

const checkData = (data, dataKeys, dataIsObject = false) => {
  const results = {};
  const isArray = Array.isArray(data) && Array.isArray(dataKeys);
  const validType = (!dataIsObject && isArray) || (dataIsObject && !isArray);
  results.error = !validType;
  const dataAsArray = dataIsObject ? [data] : data;
  // eslint-disable-next-line no-return-assign
  const keyChecks =
    validType &&
    dataKeys.map(key => {
      results[key] = checkKey(dataAsArray, key);
      return checkKey(dataAsArray, key);
    });
  results.allKeysValid =
    validType && keyChecks.every(key => key.valid === key.total);
  return results;
};

export default checkData;
