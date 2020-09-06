import React from "react";
import { Global } from "@emotion/core";
import { BrandTheme } from "@hackoregon/component-library";

import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import themeCIVIC from "./themeCIVIC";

const withGlobal = cb => (
  <>
    <Global styles={BrandTheme} />
    {cb()}
  </>
);

export const parameters = {
  options: {
    showPanel: true,
    theme: themeCIVIC
  },
  viewport: {
    defaultViewport: "responsive",
    viewports: INITIAL_VIEWPORTS
  }
};

export const decorators = [withGlobal];
