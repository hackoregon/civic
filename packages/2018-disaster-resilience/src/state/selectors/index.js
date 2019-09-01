// The root state for a package is namespaced in the 2018 package
// and the root state object when developing a package in isolation
const rootState = state => state.package2018DisasterResilience || state;

export default rootState;
