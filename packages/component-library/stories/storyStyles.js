/*
  Styles used in Storybook.
  Only styles that are needed exclusively in Storybook are defined here.
*/

import { BrandColors } from "../src/_Themes/index";

const storybookStyles = {
  // The display area for components
  main: {
    backgroundColor: "white",
    margin: "0 auto",
    maxWidth: 600,
    padding: "1em"
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
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    justifySelf: "start",
    alignSelf: "center"
  },

  // Brand color palette
  colorBlock: {
    height: 125,
    width: 300,
    marginLeft: 0,
    marginTop: "auto",
    marginRight: 20,
    marginBottom: "auto"
  }
};

// eslint-disable-next-line import/prefer-default-export
export { storybookStyles };
