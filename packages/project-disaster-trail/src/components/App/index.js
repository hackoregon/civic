/* eslint-disable import/no-named-as-default */
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "@hackoregon/component-library/assets/global.styles.css";
import LandingPage from "../LandingPage";
import Game from "../Game";

const App = () => (
  <Router onUpdate={() => window.scrollTo(0, 0)}>
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/game" render={Game} />
    </div>
  </Router>
);

App.displayName = "App";

export default App;
