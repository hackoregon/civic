/* eslint-disable import/prefer-default-export */
// The root state for a package is namespaced in the 2018 package
// and the root state object when developing a package in isolation
export const rootState = state => state.elections || state;
