/*
  Styles used in Storybook.
  Only styles that are needed exclusively in Storybook are defined here.
*/

import { BrandColors } from "@hackoregon/ui-themes";

const storybookStyles = {
  // The display area for components
  main: {
    backgroundColor: "white",
    margin: 15,
    maxWidth: 800
  },

  // Use CSS grid to center UI components in the Storybook display area
  storyGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    gridGap: "10px"
  },

  storyGridItem: {
    gridRow: 2,
    gridColumn: 2,
    alignSelf: "center",
    justifyContent: "center"
  },

  // Show inverted logos on a dark background in the Branding Logos story
  invertedLogo: {
    backgroundColor: BrandColors.primary.hex,
    margin: 20,
    padding: 20
  },

  logo: {
    paddingLeft: 20
  },

  // Display a solid color
  solidColorSample: {
    display: "flex"
  },

  // Brand color palette
  colorBlock: {
    height: 125,
    width: 300,
    marginLeft: 0,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10
  }
};

// eslint-disable-next-line import/prefer-default-export
export default storybookStyles;
