import { hot } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './configureStore';
import { Routes as createRoutes, App as AppPage } from './index';

const locationStateSelector = () => {
  let prevRoutingState;

  return (state) => {
    const routingState = state.routing;

    if (routingState !== prevRoutingState) {
      prevRoutingState = routingState;
    }

    return prevRoutingState;
  };
};

const initialState = {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: locationStateSelector(),
});

const routes = createRoutes(store);

const rootRoute = {
  component: AppPage,
  childRoutes: routes,
};

const App = () => (
  <Provider store={store}>
    <Router history={history} routes={rootRoute} />
  </Provider>
);

const HotApp = hot(module)(App);

render(<HotApp />, document.getElementById('content'));
