/* eslint-disable global-require */
import React from "react";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import {
  routerReducer,
  routerMiddleware,
  syncHistoryWithStore
} from "react-router-redux";
import { createLogger } from "redux-logger";
import { reducer as reduxFormReducer } from "redux-form";

// Import routes, reducers, and root component from each project
import {
  Routes as DisasterRoutes,
  Reducers as DisasterReducers,
  App as DisasterApp
} from "@hackoregon/2018-disaster-resilience";

import {
  Routes as HousingRoutes,
  Reducers as HousingReducers,
  App as HousingApp
} from "@hackoregon/2018-housing-affordability";

import {
  Routes as ElectionsRoutes,
  Reducers as ElectionsReducers,
  App as ElectionsApp
} from "@hackoregon/2018-local-elections";

import {
  Routes as NeighborhoodRoutes,
  Reducers as NeighborhoodReducers,
  App as NeighborhoodApp
} from "@hackoregon/2018-neighborhood-development";

import {
  Routes as TransportationRoutes,
  Reducers as TransportationReducers,
  App as TransportationApp
} from "@hackoregon/2018-transportation-systems";

import {
  Routes as FarmersMarketsRoutes,
  Reducers as FarmersMarketsReducers,
  App as FarmersMarketsApp
} from "@hackoregon/2018-example-farmers-markets";

import {
  Routes as Housing2019Routes,
  Reducers as Housing2019Reducers,
  App as Housing2019App
} from "@hackoregon/2019-housing";

import {
  Routes as Template2019Routes,
  Reducers as Template2019Reducers,
  App as Template2019App
} from "@hackoregon/2019-template";

import {
  Routes as Transportation2019Routes,
  Reducers as Transportation2019Reducers,
  App as Transportation2019App
} from "@hackoregon/2019-transportation";

import { Reducers as SandboxReducers } from "@hackoregon/civic-sandbox";

import "./fonts.css";
// eslint-disable-next-line import/no-named-as-default
import RootPage from "./components/RootPage";
import HomePage from "./components/HomePage";
import SandboxPage from "./components/SandboxPage";
import PortlandCollectionPage from "./components/PortlandCollectionPage";
import CityNotFoundPage from "./components/CityNotFoundPage";
import StateNotFoundPage from "./components/StateNotFoundPage";
import CardDetailPage from "./components/CardDetailPage";
import CardDetailPageEmbed from "./components/CardDetailPageEmbed";

// Create a store by combining all project reducers and the routing reducer
const configureStore = (initialState, history) => {
  const middlewares = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
  const store = createStore(
    combineReducers({
      routing: routerReducer,
      form: reduxFormReducer,
      disaster: DisasterReducers(),
      housing: HousingReducers(),
      elections: ElectionsReducers(),
      neighborhood: NeighborhoodReducers(),
      transportation: TransportationReducers(),
      farmersMarkets: FarmersMarketsReducers(),
      sandbox: SandboxReducers(),
      // Temporarily Hidden 2019 Pages ⬇️
      housing2019: Housing2019Reducers(),
      template2019: Template2019Reducers(),
      transportation2019: Transportation2019Reducers()
    }),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.asyncReducers = {};

  // Allow for hot module replacement when applicable (dev mode)
  if (module.hot) {
    module.hot.accept(
      [
        "@hackoregon/2018-disaster-resilience",
        "@hackoregon/2018-housing-affordability",
        "@hackoregon/2018-local-elections",
        "@hackoregon/2018-neighborhood-development",
        "@hackoregon/2018-transportation-systems",
        "@hackoregon/2018-example-farmers-markets",
        "@hackoregon/civic-sandbox",
        // Temporarily Hidden 2019 Pages ⬇️
        "@hackoregon/2019-housing",
        "@hackoregon/2019-template",
        "@hackoregon/2019-transportation"
      ],
      () => {
        const nextRootReducer = combineReducers({
          routing: routerReducer,
          disaster: require("@hackoregon/2018-disaster-resilience").Reducers(),
          housing: require("@hackoregon/2018-housing-affordability").Reducers(),
          elections: require("@hackoregon/2018-local-elections").Reducers(),
          neighborhood: require("@hackoregon/2018-neighborhood-development").Reducers(),
          transportation: require("@hackoregon/2018-transportation-systems").Reducers(),
          farmersMarkets: require("@hackoregon/2018-example-farmers-markets").Reducers(),
          sandbox: require("@hackoregon/civic-sandbox").Reducers(),
          // Temporarily Hidden 2019 Pages ⬇️
          housing2019: require("@hackoregon/2019-housing").Reducers(),
          template2019: require("@hackoregon/2019-template").Reducers(),
          transportation2019: require("@hackoregon/2019-transportation").Reducers()
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
  }
});

// Compose a route hierarchy using each project's routes and root component
const routes = {
  path: "/",
  component: RootPage,
  indexRoute: {
    component: HomePage
  },
  childRoutes: [
    {
      path: "cities/portland",
      indexRoute: {
        component: PortlandCollectionPage
      },
      childRoutes: [
        {
          path: "disaster",
          component: DisasterApp,
          childRoutes: DisasterRoutes(store)
        },
        {
          path: "housing",
          component: HousingApp,
          childRoutes: HousingRoutes(store)
        },
        {
          path: "elections",
          component: ElectionsApp,
          childRoutes: ElectionsRoutes(store)
        },
        {
          path: "neighborhood",
          component: NeighborhoodApp,
          childRoutes: NeighborhoodRoutes(store)
        },
        {
          path: "transportation",
          component: TransportationApp,
          childRoutes: TransportationRoutes(store)
        },
        {
          path: "farmers-markets",
          component: FarmersMarketsApp,
          childRoutes: FarmersMarketsRoutes(store)
        }
      ]
    },
    {
      path: "cities/:city",
      component: CityNotFoundPage
    },
    {
      path: "states/oregon",
      component: PortlandCollectionPage
    },
    {
      path: "states/:state",
      component: StateNotFoundPage
    },
    {
      path: "cards/:slug",
      component: CardDetailPage
    },
    {
      path: "cards/:slug/embed",
      component: CardDetailPageEmbed
    },
    {
      path: "sandbox",
      component: SandboxPage
    },
    // Temporarily Hidden 2019 Pages ⬇️
    {
      path: "2019",
      childRoutes: [
        {
          path: "housing",
          component: Housing2019App,
          childRoutes: Housing2019Routes(store)
        },
        {
          path: "template",
          component: Template2019App,
          childRoutes: Template2019Routes(store)
        },
        {
          path: "transportation",
          component: Transportation2019App,
          childRoutes: Transportation2019Routes(store)
        }
      ]
    }
  ]
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

export default App;
