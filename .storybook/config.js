/* eslint-disable global-require */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { addParameters, configure } from "@storybook/react";
import "../packages/component-library/assets/global.styles.css";

addParameters({
  options: {
    showPanel: true,
    theme: undefined
  }
});

function loadStories() {
  require("../packages/component-library/stories");
  addParameters({ viewport: options });
}

configure(loadStories, module);
