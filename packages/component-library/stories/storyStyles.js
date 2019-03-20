import { SSL_OP_TLS_BLOCK_PADDING_BUG } from "constants";
import "@hackoregon/component-library/assets/constants.css";

/*
  Styles used in Storybook.
  Only styles that are needed exclusively in Storybook are defined here.
*/

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
    backgroundColor: "#201024",
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
  },

  // Brand colors (make these global)
  primaryBkgnd: {
    backgroundColor: "rgba(34,15,37,1)"
  },

  secondaryBkgnd: {
    backgroundColor: "rgba(238,73,92,1)"
  },

  tertiaryBkgnd: {
    backgroundColor: "rgba(114,99,113,1)"
  },

  mediumBkgnd: {
    backgroundColor: "rgba(170,164,171,1)"
  },

  subduedBkgnd: {
    backgroundColor: "rgba(243,242,243,1)"
  },

  pinkBkgnd: {
    backgroundColor: "rgba(220,69,86,1)"
  },

  greenBkgnd: {
    backgroundColor: "rgba(25,183,170,1)"
  },

  blueBkgnd: {
    backgroundColor: "rgba(30,98,189,1)"
  },

  purpleBkgnd: {
    backgroundColor: "rgba(114,29,124,1)"
  },

  yellowBkgnd: {
    backgroundColor: "rgba(255,178,38,1)"
  },

  // Typography (make these global)
  dataText: {
    fontFamily: "Roboto Condensed",
    fontSize: 12
  },

  dataFont: {
    fontFamily: "Roboto Condensed"
  },

  largeParagraph: {
    fontSize: 16
  }
};

export { storybookStyles };
