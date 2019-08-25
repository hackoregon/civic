// Use with emotion's Global component

/* Add all of this and BRANDING to theme for 2018 */
export default {
  /* Base */

  html: {
    fontSize: "1rem",
    lineHeight: "1.4",
    backgroundColor: "#fffefe",
    fontFamily: "Merriweather",
    fontWeight: "400",
    color: "#001732",
    minHeight: "100%" /* [3] */,
    WebkitTextSizeAdjust: "100%" /* [4] */,
    msTextSizeAdjust: "100%" /* [4] */,
    MozOsxFontSmoothing: "grayscale" /* [5] */,
    WebkitFontSmoothing: "antialiased" /* [5] */,
    WebkitOverflowScrolling: "touch",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
  },

  body: {
    margin: 0,
    display: "flex",
    flexDirection: "column"
  },

  a: {
    color: "#1e62bd",
    textDecoration: "none",
    cursor: "pointer",
    opacity: "0.9",
    transition: "all 0.25s ease-in-out",

    ":hover": {
      color: "#1e62bd",
      textDecoration: "none",
      cursor: "pointer",
      opacity: 1
    }
  },

  /* Global Styles from product_design */

  /* Typography */
  p: {
    fontSize: "1em",
    color: "#706371"
  },

  h1: {
    fontSize: "2.25rem",
    lineHeight: "2.625rem",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "500"
  },

  h2: {
    fontSize: "1.625rem",
    lineHeight: "2.125rem",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "400"
  },

  h3: {
    fontSize: "1.125rem",
    lineHeight: "1.625rem",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "500"
  },

  h4: {
    fontSize: "1rem",
    lineHeight: "1.375rem",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "500"
  },

  h5: {
    fontSize: "0.875rem",
    lineHeight: "1.125rem",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "500"
  },

  h6: {
    fontSize: "0.75rem",
    lineHeight: "0.9375rem",
    fontFamily: "'Rubik', sans-serif",
    fontWeight: "500"
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
    fontSize: "0.86rem"
  },

  ".DataFont": {
    fontFamily: "Roboto Condensed"
  },

  ".LargeParagraph": {
    fontSize: "1.14rem"
  },

  ".Pullquote": {
    fontSize: "2.85rem"
  }
};
