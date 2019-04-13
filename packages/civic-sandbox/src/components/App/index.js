import React from "react";
import { PageLayout } from "@hackoregon/component-library";
import "@hackoregon/component-library/assets/global.styles.css";
import Packages from "../Packages";

const attribution = <a href="https://service.civicpdx.org">Data Sources</a>;

const App = () => (
  <PageLayout attribution={attribution}>
    <Packages />
  </PageLayout>
);

App.displayName = "App";

export default App;
