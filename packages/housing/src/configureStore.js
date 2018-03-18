/* eslint-disable import/no-extraneous-dependencies */
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createReducer from './state';
import { sideEffectsMiddleware } from './middleware';

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    thunk,
    sideEffectsMiddleware,
    routerMiddleware(history),
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  store.asyncReducers = {};

  /* istanbul ignore next */
  if (module && module.hot) {
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
