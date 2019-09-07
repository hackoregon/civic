import { createMuiTheme } from "@material-ui/core/styles";
import BrandColors from "../Brand/BrandColors";

// Brand Colors
const civicPrimary = BrandColors.primary.hex;
const civicSecondary = BrandColors.secondary.hex;

// Typography
const sansSerif = "Roboto Condensed, Helvetica Neue, Helvetica, sans-serif";
const size = "1em";

const MaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: civicPrimary
    },
    secondary: {
      main: civicSecondary
    },
    text: {
      primary: civicPrimary
    }
  },
  shape: {
    borderRadius: 2
  },
  typography: {
    fontFamily: sansSerif,
    fontSize: size
  },
  overrides: {
    MuiButton: {
      outlinedSecondary: {
        color: civicPrimary,
        border: "1px solid civicPrimary"
      }
    },
    MuiSelect: {
      root: {
        color: civicPrimary
      }
    },
    MuiList: {
      root: {
        color: civicSecondary
      }
    }
  }
});

export default MaterialTheme;
