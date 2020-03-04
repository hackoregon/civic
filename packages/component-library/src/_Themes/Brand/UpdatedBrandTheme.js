// Use with emotion's Global component
import colors from "./BrandColors";
/* Add all of this and BRANDING to theme for 2018 */
export default {
  /* Base */

  html: {
    fontSize: "1rem",
    lineHeight: "1.4",
    backgroundColor: colors.background.hex,
    fontFamily: "Merriweather",
    fontWeight: "400",
    color: colors.primary.hex,
    minHeight: "100%" /* [3] */,
    WebkitTextSizeAdjust: "100%" /* [4] */,
    msTextSizeAdjust: "100%" /* [4] */,
    MozOsxFontSmoothing: "grayscale" /* [5] */,
    WebkitFontSmoothing: "antialiased" /* [5] */,
    WebkitOverflowScrolling: "touch",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
  },

  body: {
    fontSize: "1.0625rem",
    lineHeight: "1.75rem",
    margin: 0,
    display: "flex",
    flexDirection: "column"
  },

  a: {
    color: colors.action.hex,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-size .3s",
    backgroundImage: "linear-gradient(currentColor, currentColor)",
    backgroundPosition: "0% 100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "0% 2px",

    ":hover, :focus": {
      color: colors.action.hex,
      cursor: "pointer",
      backgroundSize: "100% 2px"
    }
  },

  /* Global Styles from product_design */

  /* Typography */
  p: {
    fontSize: "1.0625rem",
    lineHeight: "1.75rem",
    color: colors.tertiary.hex,
    marginBlockStart: "0.875rem",
    marginBlockEnd: "0.875rem"
  },

  h1: {
    fontSize: "4rem",
    lineHeight: "1.0375",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "500",
    marginBlockStart: "4rem",
    marginBlockEnd: "4rem"
  },

  h2: {
    fontSize: "2rem",
    lineHeight: "1.10722",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "400",
    marginBlockStart: "2rem",
    marginBlockEnd: "2rem"
  },

  h3: {
    fontSize: "1.5rem",
    lineHeight: "1.381",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "500",
    marginBlockStart: "1.5rem",
    marginBlockEnd: "1.5rem"
  },

  h4: {
    fontSize: "1.25rem",
    lineHeight: "1.381",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "400",
    marginBlockStart: "1.25rem",
    marginBlockEnd: "1.25rem"
  },

  h5: {
    fontSize: "1rem",
    lineHeight: "1.125rem",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "400",
    marginBlockStart: "1rem",
    marginBlockEnd: "1rem"
  },

  h6: {
    fontSize: "1rem",
    lineHeight: "0.9375rem",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "300",
    marginBlockStart: "1rem",
    marginBlockEnd: "1rem"
  },

  code: {
    fontSize: "0.86rem",
    lineHeight: "1.204rem",
    fontFamily: "'Roboto Mono', sans-serif",
    fontWeight: "300",
    marginBlockStart: "0.28125rem",
    marginBlockEnd: "0.28125rem",
    letterSpacing: "-0.025em",
    backgroundColor: colors.subdued.hex
  },

  ".Description": {
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "left",
    lineHeight: "1.7"
  },

  ".Title": {
    fontSize: "3.57rem",
    lineHeight: "1.2",
    fontWeight: "300",
    fontFamily: "'Rubik', sans-serif",
    marginBottom: "12px"
  },

  ".DataText": {
    fontFamily: "Roboto Condensed",
    fontSize: "0.86rem",
    lineHeight: "1.204rem"
  },

  ".DataFont": {
    fontFamily: "Roboto Condensed"
  },

  ".LargeParagraph": {
    fontSize: "1.21125rem",
    lineHeight: "1.995rem"
  },

  ".Pullquote": {
    fontSize: "2.85rem"
  }
};
