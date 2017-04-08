import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../state/reducers';
import DevTools from '../views/DevTools';

const configureStore = (initialState = {}, history) => {
  console.log('inside store')
  const middlewares = [thunk, routerMiddleware(history), createLogger()];
  const enhancers = [applyMiddleware(...middlewares, ), DevTools.instrument()];
  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers),
    );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    console.log('hot module')
    module.hot.accept('../state/reducers', () => {
      console.log('module hot accept')
      const nextRootReducer = require('../state/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}

export default configureStore;
