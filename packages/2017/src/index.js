import React from 'react';
import { hot } from 'react-hot-loader';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

// Import routes, reducers, and root component from each project
import {
  Routes as HousingRoutes,
  Reducers as HousingReducers,
  App as HousingApp,
} from '@hackoregon/civic-housing';

import {
  Routes as EmergencyRoutes,
  Reducers as EmergencyReducers,
  App as EmergencyApp,
} from '@hackoregon/civic-emergency-response';

import RootPage from './components/RootPage';

// Create a store by combining all project reducers and the routing reducer
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
      emergency: EmergencyReducers(),
    }),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.asyncReducers = {};

  // Allow for hot module replacement when applicable (dev mode)
  if (module.hot) {
    module.hot.accept(['@hackoregon/civic-housing', '@hackoregon/civic-emergency-response'], () => {
      const nextRootReducer = combineReducers({
        routing: routerReducer,
        housing: require('@hackoregon/civic-housing').Reducers(),
        emergency: require('@hackoregon/civic-emergency-response').Reducers(),
      });
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

const store = configureStore({}, browserHistory);

// Connect browser history with the routing-enabled redux store
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.routing;
  },
});

// Compose a route hierarchy using each project's routes and root component
const routes = {
  path: '/',
  component: RootPage,
  childRoutes: [
    {
      path: 'housing',
      component: HousingApp,
      childRoutes: HousingRoutes(store),
    },
    {
      path: 'emergency',
      component: EmergencyApp,
      childRoutes: EmergencyRoutes(store),
    }
  ],
};

// Finally create the application component and render it into the #content element
const App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

const HotApp = hot(module)(App);
render(<HotApp />, document.getElementById('content'));
