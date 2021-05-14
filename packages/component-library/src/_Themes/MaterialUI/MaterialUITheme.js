import { createMuiTheme } from "@material-ui/core/styles";
import BrandColors from "../Brand/BrandColors";

// Brand Colors
const civicPrimary = BrandColors.primary.hex;
const civicPlumLight = BrandColors.plumLight.hex;
const civicMedium = BrandColors.medium.hex;
const civicSubdued = BrandColors.subdued.hex;
const civicAction = BrandColors.action.hex;
const civicError = BrandColors.error.hex;

// Typography
const dataSanSerif = "Roboto Condensed, Helvetica Neue, Helvetica, sans-serif";
const sanSerif = "Rubik, Helvetica Neue, Helvetica, sans-serif";

// Animation
const animationSpeed = 4;

const MaterialTheme = createMuiTheme({
  palette: {
    common: { black: "rgba(0, 0, 0, 1)", white: "#fff" },
    background: {
      paper: "rgba(243, 242, 243, 1)",
      default: "rgba(255, 255, 255, 1)"
    },
    primary: {
      light: civicPlumLight,
      main: civicPrimary,
      dark: civicPrimary,
      contrastText: "#fff" // must override emotion theme if link
    },
    secondary: {
      light: civicAction,
      main: civicAction,
      dark: civicAction,
      contrastText: "#fff"
    },
    error: {
      light: civicError,
      main: civicError,
      dark: civicError,
      contrastText: "#fff"
    },
    text: {
      primary: civicPrimary,
      secondary: civicPrimary,
      disabled: civicSubdued,
      hint: civicMedium
    }
  },
  shape: {
    borderRadius: 0
  },
  typography: {
    fontFamily: dataSanSerif,
    button: {
      fontFamily: sanSerif
    },
    h6: {
      fontFamily: sanSerif
    }
  },
  transitions: {
    duration: {
      shortest: 150 / animationSpeed,
      shorter: 200 / animationSpeed,
      short: 250 / animationSpeed,
      standard: 300 / animationSpeed,
      complex: 375 / animationSpeed,
      enteringScreen: 225 / animationSpeed,
      leavingScreen: 195 / animationSpeed
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  },
  overrides: {
    MuiMenuItem: {
      root: {
        minHeight: "unset",
        lineHeight: "unset"
      }
    },
    MuiAccordionDetails: {
      root: {
        display: "unset"
      }
    },
    MuiDataGrid: {
      colCellWrapper: {
        fontWeight: 700
      }
    }
  }
});

export default MaterialTheme;
