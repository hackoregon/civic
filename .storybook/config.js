/* eslint-disable global-require */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import React from "react";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { Global } from "@emotion/core";
import { BrandTheme } from "@hackoregon/component-library";

import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import themeCIVIC from "./themeCIVIC";

const STORYBOOK_ENV = process.env.STORYBOOK_ENV || "default";

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
  if (STORYBOOK_ENV === "new") {
    const req = require.context(
      "../packages",
      true,
      /^\.\/[^\/]+\/stories\/index.story.js$/
    );
    req.keys().forEach(filename => req(filename));
  } else {
    require("../packages/component-library/stories");
  }
}

const withGlobal = cb => (
  <>
    <Global styles={BrandTheme} />
    {cb()}
  </>
);

addDecorator(withGlobal);
configure(loadStories, module);
