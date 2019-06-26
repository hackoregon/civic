/* eslint-disable import/no-named-as-default */
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "@hackoregon/component-library/assets/global.styles.css";
import LandingPage from "../LandingPage";
import Game from "../Game";
import configureStore from "../../configureStore";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <div>
        <Route path="/" exact component={LandingPage} />
        <Route path="/game" render={Game} />
      </div>
    </Router>
  </Provider>
);

App.displayName = "App";

export default App;
