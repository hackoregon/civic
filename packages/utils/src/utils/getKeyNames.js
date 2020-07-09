const getKeyNames = obj => {
  const keyNames = {};
  Object.keys(obj).forEach(key => {
    keyNames[key] = key;
  });
  return keyNames;
};

export default getKeyNames;
