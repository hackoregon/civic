import { is, isEmpty } from 'ramda';
import invariant from 'invariant';
import createReducer from '../state';

const isFunc = is(Function);
const isStr  = is(String);
const isObj  = is(Object);

export function checkStore(store) {
  const source = new Map([
    ['dispatch', isFunc],
    ['subscribe', isFunc],
    ['getState', isFunc],
    ['replaceReducer', isFunc],
    ['asyncReducers', isObj],
  ]);

  for (const [key, value] of source) { // eslint-disable-line
    if (!value(store[key])) {
      invariant(false,
        `(app/utils...) asyncInjectors: Expected a valid redux store. Check ${key}.`,
      );
    }
  }
}

export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isStr(name) && !isEmpty(name) && isFunc(asyncReducer),
      '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function',
    );

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}


export function getAsyncReducer(store) {
  checkStore(store);

  return {
    injectAsyncReducer: injectAsyncReducer(store, true),
  };
}
