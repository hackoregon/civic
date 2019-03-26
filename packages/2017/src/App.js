import React from 'react';
import { hot } from 'react-hot-loader/root';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import {
  routerReducer,
  routerMiddleware,
  syncHistoryWithStore,
} from 'react-router-redux';

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

import {
  Routes as TransportationRoutes,
  Reducers as TransportationReducers,
  App as TransportationApp,
} from '@hackoregon/transportation';

import {
  Routes as HomelessnessRoutes,
  Reducers as HomelessnessReducers,
  App as HomelessnessApp,
} from '@hackoregon/civic-homelessness';

import {
  Routes as BudgetRoutes,
  Reducers as BudgetReducers,
  App as BudgetApp,
} from '@hackoregon/civic-budget';

import './fonts.css';
import RootPage from './components/RootPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';

// Create a store by combining all project reducers and the routing reducer
const configureStore = (initialState, history) => {
  const middlewares = [thunk, routerMiddleware(history)];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
  const store = createStore(
    combineReducers({
      routing: routerReducer,
      housing: HousingReducers(),
      emergency: EmergencyReducers(),
      transportation: TransportationReducers(),
      homelessness: HomelessnessReducers(),
      budget: BudgetReducers(),
    }),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.asyncReducers = {};

  // Allow for hot module replacement when applicable (dev mode)
  if (module.hot) {
    module.hot.accept(
      [
        '@hackoregon/civic-housing',
        '@hackoregon/civic-emergency-response',
        '@hackoregon/transportation',
        '@hackoregon/civic-homelessness',
        '@hackoregon/civic-budget',
      ],
      () => {
        const nextRootReducer = combineReducers({
          routing: routerReducer,
          housing: require('@hackoregon/civic-housing').Reducers(),
          emergency: require('@hackoregon/civic-emergency-response').Reducers(),
          transportation: require('@hackoregon/transportation').Reducers(),
          homelessness: require('@hackoregon/civic-homelessness').Reducers(),
          budget: require('@hackoregon/civic-budget').Reducers(),
        });
        store.replaceReducer(nextRootReducer);
      }
    );
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
  indexRoute: {
    component: HomePage,
  },
  childRoutes: [
    {
      path: 'about',
      component: AboutPage,
    },
    {
      path: 'housing',
      component: HousingApp,
      childRoutes: HousingRoutes(store),
    },
    {
      path: 'emergency',
      component: EmergencyApp,
      childRoutes: EmergencyRoutes(store),
    },
    {
      path: 'transportation',
      component: TransportationApp,
      childRoutes: TransportationRoutes(store),
    },
    {
      path: 'homelessness',
      component: HomelessnessApp,
      childRoutes: HomelessnessRoutes(store),
    },
    {
      path: 'budget',
      component: BudgetApp,
      childRoutes: BudgetRoutes(store),
    },
  ],
};

// Finally create the application component and render it into the #content element
const App = () => (
  <Provider store={store}>
    <Router
      onUpdate={() => window.scrollTo(0, 0)}
      history={history}
      routes={routes}
    />
  </Provider>
);

const HotApp = hot(App);

export default HotApp;