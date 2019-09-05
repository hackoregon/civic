import { createMuiTheme } from "@material-ui/core/styles";
import BrandColors from "../Brand/BrandColors";

// Brand Colors
const civicPrimary = BrandColors.primary.hex;
const civicSecondary = BrandColors.secondary.hex;

// Typography
const sansSerif = "Roboto Condensed, Helvetica Neue, Helvetica, sans-serif";
const size = "1em";

const muiTheme = createMuiTheme({
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
  }
});

export default muiTheme;
