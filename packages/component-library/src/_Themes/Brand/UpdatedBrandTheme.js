// Use with emotion's Global component
import colors from "./BrandColors";
import MaterialTheme from "../MaterialUI/MaterialUITheme";
/* Add all of this and BRANDING to theme for 2018 */

// Breakpoints
const sm = MaterialTheme.breakpoints.down("sm");
const md = MaterialTheme.breakpoints.between("sm", "md");

// Typography
const body = {
  fontSize: "1.0625rem",
  lineHeight: "1.75rem",
  margin: 0,
  display: "flex",
  flexDirection: "column",
  [sm]: {
    fontSize: "1rem",
    lineHeight: "1.5rem"
  }
};

const p = {
  fontSize: "1.0625rem",
  lineHeight: "1.75rem",
  color: colors.tertiary.hex,
  marginBlockStart: "0.875rem",
  marginBlockEnd: "0.875rem",
  [sm]: {
    fontSize: "1rem",
    lineHeight: "1.5rem"
  }
};

const pSmall = {
  fontSize: "0.86rem",
  lineHeight: "1.4165rem",
  color: colors.tertiary.hex,
  marginBlockStart: "0.875rem",
  marginBlockEnd: "0.875rem"
};

const pLarge = {
  fontSize: "1.21125rem",
  lineHeight: "1.995rem",
  color: colors.tertiary.hex,
  marginBlockStart: "0.875rem",
  marginBlockEnd: "0.875rem",
  [sm]: {
    fontSize: "1.0625rem",
    lineHeight: "1.75rem"
  }
};

const h1 = {
  fontSize: "4rem",
  lineHeight: "1.0375",
  fontFamily: "'Rubik', sans-serif",
  fontWeight: "500",
  marginBlockStart: "4rem",
  marginBlockEnd: "4rem",
  [md]: {
    fontSize: "3rem",
    marginBlockStart: "3rem",
    marginBlockEnd: "3rem"
  },
  [sm]: {
    fontSize: "2rem",
    marginBlockStart: "2rem",
    marginBlockEnd: "2rem"
  }
};

const h2 = {
  fontSize: "2rem",
  lineHeight: "1.10722",
  fontFamily: "'Rubik', sans-serif",
  fontWeight: "400",
  marginBlockStart: "2rem",
  marginBlockEnd: "2rem",
  [sm]: {
    fontSize: "1.7rem",
    marginBlockStart: "1.7rem",
    marginBlockEnd: "1.7rem"
  }
};

const h3 = {
  fontSize: "1.5rem",
  lineHeight: "1.381",
  fontFamily: "'Rubik', sans-serif",
  fontWeight: "500",
  marginBlockStart: "1.5rem",
  marginBlockEnd: "1.5rem",
  [sm]: {
    fontSize: "1.35rem",
    marginBlockStart: "1.35rem",
    marginBlockEnd: "1.35rem"
  }
};

const h4 = {
  fontSize: "1.25rem",
  lineHeight: "1.381",
  fontFamily: "'Rubik', sans-serif",
  fontWeight: "400",
  marginBlockStart: "1.25rem",
  marginBlockEnd: "1.25rem",
  [sm]: {
    fontSize: "1.15rem",
    marginBlockStart: "1.15rem",
    marginBlockEnd: "1.15rem"
  }
};

const h5 = {
  fontSize: "1rem",
  lineHeight: "1.125rem",
  fontFamily: "'Rubik', sans-serif",
  fontWeight: "400",
  marginBlockStart: "1rem",
  marginBlockEnd: "1rem"
};

const h6 = {
  fontSize: "1rem",
  lineHeight: "0.9375rem",
  fontFamily: "'Rubik', sans-serif",
  fontWeight: "300",
  marginBlockStart: "1rem",
  marginBlockEnd: "1rem"
};

const code = {
  fontSize: "0.86rem",
  lineHeight: "1.204rem",
  fontFamily: "'Roboto Mono', sans-serif",
  fontWeight: "300",
  marginBlockStart: "0.28125rem",
  marginBlockEnd: "0.28125rem",
  letterSpacing: "-0.025em",
  backgroundColor: colors.subdued.hex
};

const dataSmall = {
  fontFamily: "Roboto Condensed",
  fontSize: "0.86rem",
  lineHeight: "1.204rem"
};

const data = {
  fontFamily: "Roboto Condensed",
  fontSize: "1rem",
  lineHeight: "1.4rem"
};

const dataLarge = {
  fontFamily: "Roboto Condensed",
  fontSize: "1.14rem",
  lineHeight: "1.596rem"
};

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

  // Default styles
  body,
  code,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,

  // Class names
  ".p-sm": pSmall,
  ".p-md": p,
  ".p-lg": pLarge,

  ".h-1": h1,
  ".h-2": h2,
  ".h-3": h3,
  ".h-4": h4,
  ".h-5": h5,
  ".h-6": h6,

  ".data-sm": dataSmall,
  ".data-md": data,
  ".data-lg": dataLarge,

  ".code": code,

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

  ".LargeParagraph": pLarge,

  ".Pullquote": {
    fontSize: "2.85rem"
  }
};
