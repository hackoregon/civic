/* eslint-disable global-require */
import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import {
  routerReducer,
  routerMiddleware,
  syncHistoryWithStore
} from "react-router-redux";
import { reducer as reduxFormReducer } from "redux-form";
import { composeWithDevTools } from "redux-devtools-extension";
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
  Routes as Template2019Routes,
  Reducers as Template2019Reducers,
  App as Template2019App
} from "@hackoregon/2019-template";

import {
  Routes as Transportation2019Routes,
  Reducers as Transportation2019Reducers,
  App as Transportation2019App
} from "@hackoregon/2019-transportation";

import {
  Routes as Education2019Routes,
  Reducers as Education2019Reducers,
  App as Education2019App
} from "@hackoregon/2019-education";

import {
  Routes as Elections2019Routes,
  Reducers as Elections2019Reducers,
  App as Elections2019App
} from "@hackoregon/2019-elections";

import {
  Routes as Housing2019Routes,
  Reducers as Housing2019Reducers,
  App as Housing2019App
} from "@hackoregon/2019-housing";

import {
  Routes as SandboxRoutes,
  Reducers as SandboxReducers,
  App as SandboxApp
} from "@hackoregon/civic-sandbox";

// hygen import injection (do not remove or modify this line)

import {
  CardDetailPage,
  CardDetailPageEmbed,
  CardList
} from "@hackoregon/component-library";

import "./fonts.css";
// eslint-disable-next-line import/no-named-as-default
import RootPage from "./components/RootPage";
import HomePage from "./components/HomePage";
import PortlandCollectionPage from "./components/PortlandCollectionPage";
import CityNotFoundPage from "./components/CityNotFoundPage";
import StateNotFoundPage from "./components/StateNotFoundPage";
import CardRegistry from "./card-registry";
import tags from "./tags";
import projects from "./projects";

// Create a store by combining all project reducers and the routing reducer
const configureStore = (initialState, history) => {
  const middlewares = [thunk, routerMiddleware(history)];

  const store = createStore(
    combineReducers({
      routing: routerReducer,
      form: reduxFormReducer,
      package2018DisasterResilience: DisasterReducers(),
      package2018HousingAffordability: HousingReducers(),
      package2018LocalElections: ElectionsReducers(),
      package2018NeighborhoodDevelopment: NeighborhoodReducers(),
      package2018TransportationSystems: TransportationReducers(),
      package2018ExampleFarmersMarkets: FarmersMarketsReducers(),
      packageCivicSandbox: SandboxReducers(),
      // Temporarily Hidden 2019 Pages ⬇️
      package2019Template: Template2019Reducers(),
      package2019Education: Education2019Reducers(),
      package2019Elections: Elections2019Reducers(),
      package2019Housing: Housing2019Reducers(),
      // hygen store injection (do not remove or modify this line)
      package2019Transportation: Transportation2019Reducers()
    }),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
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
        "@hackoregon/2019-template",
        "@hackoregon/2019-education",
        "@hackoregon/2019-elections",
        "@hackoregon/2019-housing",
        // hygen hot module injection (do not remove or modify this line)
        "@hackoregon/2019-transportation"
      ],
      () => {
        const nextRootReducer = combineReducers({
          routing: routerReducer,
          package2018DisasterResilience: require("@hackoregon/2018-disaster-resilience").Reducers(),
          package2018HousingAffordability: require("@hackoregon/2018-housing-affordability").Reducers(),
          package2018LocalElections: require("@hackoregon/2018-local-elections").Reducers(),
          package2018NeighborhoodDevelopment: require("@hackoregon/2018-neighborhood-development").Reducers(),
          package2018TransportationSystems: require("@hackoregon/2018-transportation-systems").Reducers(),
          package2018ExampleFarmersMarkets: require("@hackoregon/2018-example-farmers-markets").Reducers(),
          packageCivicSandbox: require("@hackoregon/civic-sandbox").Reducers(),
          // Temporarily Hidden 2019 Pages ⬇️
          package2019Template: require("@hackoregon/2019-template").Reducers(),
          package2019Education: require("@hackoregon/2019-education").Reducers(),
          package2019Elections: require("@hackoregon/2019-elections").Reducers(),
          package2019Housing: require("@hackoregon/2019-housing").Reducers(),
          // hygen reducer injection (do not remove or modify this line)
          package2019Transportation: require("@hackoregon/2019-transportation").Reducers()
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
          indexRoute: { component: DisasterApp },
          childRoutes: DisasterRoutes(store)
        },
        {
          path: "housing",
          indexRoute: { component: HousingApp },
          childRoutes: HousingRoutes(store)
        },
        {
          path: "elections",
          indexRoute: { component: ElectionsApp },
          childRoutes: ElectionsRoutes(store)
        },
        {
          path: "neighborhood",
          indexRoute: { component: NeighborhoodApp },
          childRoutes: NeighborhoodRoutes(store)
        },
        {
          path: "transportation",
          indexRoute: { component: TransportationApp },
          childRoutes: TransportationRoutes(store)
        },
        {
          path: "farmers-markets",
          indexRoute: { component: FarmersMarketsApp },
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
      path: "cards",
      component: () => (
        <CardList
          CardRegistry={CardRegistry}
          tagsList={tags}
          projects={projects}
        />
      )
    },
    {
      path: "cards/:slug",
      component: params => (
        <CardDetailPage {...params} CardRegistry={CardRegistry} />
      )
    },
    {
      path: "cards/:slug/embed(/:layout)",
      component: params => (
        <CardDetailPageEmbed {...params} CardRegistry={CardRegistry} />
      )
    },
    {
      path: "sandbox",
      indexRoute: { component: SandboxApp },
      childRoutes: SandboxRoutes(store)
    },

    // Route for OMSI QR Code for Installation
    {
      path: "earthquakeheroes",
      indexRoute: { component: DisasterApp },
      childRoutes: DisasterRoutes(store)
    },
    // Temporarily Hidden 2019 Pages ⬇️
    {
      path: "2019",
      childRoutes: [
        {
          path: "template",
          indexRoute: { component: Template2019App },
          childRoutes: Template2019Routes(store)
        },
        {
          path: "education",
          indexRoute: { component: Education2019App },
          childRoutes: Education2019Routes(store)
        },
        {
          path: "elections",
          indexRoute: { component: Elections2019App },
          childRoutes: Elections2019Routes(store)
        },
        {
          path: "housing",
          indexRoute: { component: Housing2019App },
          childRoutes: Housing2019Routes(store)
        },
        // hygen route injection (do not remove or modify this line)
        {
          path: "transportation",
          indexRoute: { component: Transportation2019App },
          childRoutes: Transportation2019Routes(store)
        }
      ]
    }
  ]
};

function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== "") {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  } else {
    window.scrollTo(0, 0);
  }
}

// Finally create the application component and render it into the #content element
const App = () => (
  <Provider store={store}>
    <Router onUpdate={hashLinkScroll} history={history} routes={routes} />
  </Provider>
);

export default App;
