import React from 'react';
import { hot } from 'react-hot-loader';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import {
  Routes as HousingRoutes,
  Reducers as HousingReducers,
  App as HousingApp,
} from '@hackoregon/civic-housing';

import RootPage from './components/RootPage';

const configureStore = (initialState, history) => {
  const middlewares = [
    thunk,
    routerMiddleware(history),
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
  const store = createStore(
    combineReducers({
      routing: routerReducer,
      housing: HousingReducers(),
    }),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.asyncReducers = {};

  return store;
};

const store = configureStore({}, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.routing;
  },
});

const routes = {
  path: '/',
  component: RootPage,
  childRoutes: [
    {
      path: 'housing',
      component: HousingApp,
      childRoutes: HousingRoutes(store),
    }
  ],
};

const App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

const HotApp = hot(module)(App);
render(<HotApp />, document.getElementById('content'));
