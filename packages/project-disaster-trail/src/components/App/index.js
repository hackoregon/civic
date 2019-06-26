/* eslint-disable import/no-named-as-default */
import React from "react";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import {
  routerReducer,
  routerMiddleware,
  syncHistoryWithStore
} from "react-router-redux";

import "@hackoregon/component-library/assets/global.styles.css";
import LandingPage from "../LandingPage";
import Game from "../Game";
import RootPage from "../RootPage";
import configureStore from "../../configureStore";

const store = configureStore({}, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.routing;
  }
});

const rootRoute = {
  path: "/",
  component: RootPage,
  indexRoute: {
    component: LandingPage
  },
  childRoutes: [
    {
      path: "game",
      indexRoute: {
        component: Game
      }
    }
  ]
};

const App = () => (
  <Provider store={store}>
    <Router
      history={history}
      onUpdate={() => window.scrollTo(0, 0)}
      routes={rootRoute}
    />
  </Provider>
);

App.displayName = "App";

export default App;
