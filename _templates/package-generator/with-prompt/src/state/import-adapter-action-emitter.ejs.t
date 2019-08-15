---
to: packages/<%=package%>/src/state/import-adapter-action-emitter.js
---
const actionEmitter = type => payload => {
  const ret = { type };
  if (payload != null) {
    ret.payload = payload;
  }
  return ret;
};

export default actionEmitter;
