const checkKey = (data, key) => {
  const valid = data.filter(datum => key in datum).length;
  const total = data.length;
  return { valid, total };
};

const checkData = (data, dataKeys) => {
  const results = {};
  const error = !(Array.isArray(data) && Array.isArray(dataKeys));
  results.error = error;
  // eslint-disable-next-line no-return-assign
  const keyChecks =
    !error &&
    dataKeys.map(key => {
      results[key] = checkKey(data, key);
      return checkKey(data, key);
    });
  results.allKeysValid =
    !error && keyChecks.every(key => key.valid === key.total);
  return results;
};

export default checkData;
