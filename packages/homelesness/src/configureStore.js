/* eslint-disable import/no-extraneous-dependencies */
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createReducer from './state';

function configureStoreProd(initialState = {}, history) {
  const middlewares = [
    thunk,
    routerMiddleware(history),
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers),
  );

  store.asyncReducers = {};

  return store;
}

function configureStoreDev(initialState = {}, history) {
  const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
    routerMiddleware(history),
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = applyMiddleware(...middlewares);
  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(enhancers),
  );

  store.asyncReducers = {};

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./state', () => {
      Promise.resolve(require.ensure([], require => require('./state')))
      .then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);
        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
