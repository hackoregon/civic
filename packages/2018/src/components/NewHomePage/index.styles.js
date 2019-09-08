import { BrandColors } from "@hackoregon/component-library";

const { primary, tertiary, action, subdued } = BrandColors;

const introWidth = "800px";
export const browserDefaultSize = 16; // Don't modify
export const defaultFontSize = 22; // all em based off of this default value
const headerHeight = 115;

const textStandard = {
  color: primary.hex,
  fontFamily: "'Rubik', sans-serif",
  fontWeight: "normal",
  fontSize: `${defaultFontSize / browserDefaultSize}rem`,
  lineHeight: `${40 / defaultFontSize}rem`
};

export default greatestWidth => ({
  div: {
    boxSizing: "border-box"
  },

  // Text
  a: {
    color: action.hex,
    textDecoration: "underline"
  },

  p: {
    lineHeight: `${40 / defaultFontSize}rem`
  },

  h1: {
    ...textStandard,
    fontSize: `${60 / defaultFontSize}rem`,
    fontWeight: "500",
    lineHeight: "118%",
    marginBottom: `${17 / defaultFontSize}rem`
  },

  h2: {
    ...textStandard,
    fontSize: `${80 / defaultFontSize}rem`,
    fontWeight: "500",
    lineHeight: "118%",
    position: "absolute",
    top: `-${60 / defaultFontSize}rem`,
    left: "0"
  },

  ".section-header": {
    ...textStandard,
    fontSize: `${48 / defaultFontSize}rem`,
    fontWeight: "300",
    lineHeight: "118%"
  },

  ".audience-content": {
    ...textStandard,
    color: tertiary.hex,
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

  ".platform-h4": {
    color: primary.hex,
    margin: "81px 0"
  },

  ".quote-text": {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: `${45 / defaultFontSize}rem`,
    lineHeight: `${89 / defaultFontSize}rem`,
    textAlign: "center"
  },

  ".big-text": {
    fontSize: `${60 / defaultFontSize}rem`
  },

  // Wrappers
  ".content-wrapper": {
    ...textStandard,
    width: "100%",
    maxWidth: `${greatestWidth}px`,
    margin: `${60 + headerHeight}px auto 60px`,
    padding: "0 20px"
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

  ".section-button-container": {
    margin: "52px 0 52px"
  },

  ".link-container": {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(max-content,20%))",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  // Placeholder styles
  ".placeholder-intro-image": {
    width: introWidth,
    marginBottom: "28px"
  },

  ".placeholder-section-image": {
    width: "calc(100% - 2 * 120px)",
    position: "absolute"
  }
});
