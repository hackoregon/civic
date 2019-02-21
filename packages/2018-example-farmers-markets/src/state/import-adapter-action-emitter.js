const actionEmitter = type => payload => {
  const ret = { type };
  if (payload != null) {
    ret.payload = payload;
  }
  return ret;
};

export default actionEmitter;
