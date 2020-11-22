import React from "react";
import { Global } from "@emotion/core";
import { BrandTheme, BrandColors } from "@hackoregon/ui-themes";
import "../styles/tailwind.css";

// Override background color on HTML element so that Storybook backgrounds aren't overriden
const StorybookBrandTheme = BrandTheme;
StorybookBrandTheme.html.backgroundColor = "inherit";

const withGlobal = cb => (
  <>
    <Global styles={StorybookBrandTheme} />
    {cb()}
  </>
);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  backgrounds: {
    values: [
      { name: "dark", value: BrandColors.primary.hex },
      { name: "light", value: BrandColors.background.hex }
    ]
  }
};

export const decorators = [withGlobal];
