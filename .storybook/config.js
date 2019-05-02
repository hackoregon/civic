/* eslint-disable global-require */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { addParameters, configure } from "@storybook/react";
import "../packages/component-library/assets/global.styles.css";
import themeCIVIC from "./themeCIVIC";

addParameters({
  options: {
    showPanel: true,
    theme: themeCIVIC
  },
  viewport: {
    defaultViewport: "responsive",
    viewports: {
      ...INITIAL_VIEWPORTS
    }
  }
});

function loadStories() {
  require("../packages/component-library/stories");
}

configure(loadStories, module);
