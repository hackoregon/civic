import { BrandColors } from "@hackoregon/component-library";

const { primary, subdued } = BrandColors;

const introWidth = "800px";
const browserDefaultSize = 16; // Don't modify
const defaultFontSize = 22; // all em based off of this default value

const textStandard = {
  color: primary.hex,
  fontFamily: "'Rubik', sans-serif",
  fontWeight: "normal",
  fontSize: `${defaultFontSize / browserDefaultSize}rem`,
  lineHeight: `${36 / defaultFontSize}rem`
};

export default {
  div: {
    boxSizing: "border-box"
  },

  // Text
  h1: {
    ...textStandard,
    fontSize: `${60 / defaultFontSize}rem`,
    fontWeight: "500",
    lineHeight: "118%",
    marginBottom: `${17 / defaultFontSize}rem`
  },

  h2: {
    ...textStandard,
    fontSize: `${48 / defaultFontSize}rem`,
    fontWeight: "300",
    lineHeight: "118%"
  },

  h3: {
    ...textStandard,
    fontSize: `${80 / defaultFontSize}rem`,
    fontWeight: "500",
    lineHeight: "118%",
    position: "absolute",
    top: `-${37 / defaultFontSize}rem`,
    left: "0"
  },

  h4: {
    ...textStandard,
    fontSize: `${30 / defaultFontSize}rem`,
    fontWeight: "500",
    lineHeight: "118%",
    width: "472px",
    marginBottom: "28px"
  },

  ".page-subtitle": {
    ...textStandard,
    fontSize: `${40 / defaultFontSize}rem`,
    fontWeight: "300",
    lineHeight: "120%",
    width: "600px",
    marginBottom: `${60 / defaultFontSize}rem`
  },

  ".intro-text": {
    ...textStandard,
    fontSize: `${36 / defaultFontSize}rem`,
    lineHeight: `${60 / defaultFontSize}rem`
  },

  // Wrappers
  ".content-wrapper": {
    ...textStandard,
    width: "100%",
    maxWidth: "1000px",
    margin: "60px auto"
  },

  ".intro-wrapper": {
    width: introWidth,
    margin: "0 auto 84px"
  },

  ".home-section": {
    width: "100%",
    backgroundColor: subdued.rgba,
    margin: "53px auto 205px",
    padding: "88px 120px 0",
    position: "relative"
  },

  // Placeholder styles
  ".placeholder-intro-image": {
    width: introWidth,
    marginBottom: "28px"
  },

  ".placeholder-work-image": {
    width: "calc(100% - 2 * 120px)",
    position: "absolute"
  }
};
