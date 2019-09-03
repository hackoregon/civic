import { BrandColors } from "@hackoregon/component-library";

const { primary } = BrandColors;

const introWidth = "800px";
const defaultFontSize = 22;

const textStandard = {
  color: primary.hex,
  fontFamily: "'Rubik', sans-serif",
  fontWeight: "normal",
  lineHeight: `${36 / defaultFontSize}em`
};

export default {
  // Text
  h1: {
    ...textStandard,
    fontSize: `${60 / defaultFontSize}em`,
    fontWeight: "500",
    lineHeight: "118%",
    marginBottom: `${17 / defaultFontSize}em`
  },

  h2: {
    ...textStandard,
    fontSize: "3em"
  },

  ".page-subtitle": {
    ...textStandard,
    fontSize: `${40 / defaultFontSize}em`,
    fontWeight: "300",
    lineHeight: "120%",
    width: "600px",
    marginBottom: `${60 / defaultFontSize}em`
  },

  ".intro-text": {
    ...textStandard,
    fontSize: `${36 / defaultFontSize}em`,
    lineHeigh: `${60 / defaultFontSize}em`
  },

  // Wrappers
  ".content-wrapper": {
    fontSize: `${defaultFontSize}px`, // all em based off of this default value
    width: "100%",
    maxWidth: "1000px",
    margin: "60px auto"
  },

  ".intro-wrapper": {
    width: introWidth,
    margin: "0 auto"
  },

  // Placeholder styles
  ".placeholder-intro-image": {
    width: introWidth,
    marginBottom: "28px"
  }
};
