import { createMuiTheme } from "@material-ui/core/styles";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF"
    },
    secondary: {
      main: "#FFFFFF"
    },
    text: {
      primary: "#FFFFFF"
    }
  },
  shape: {
    borderRadius: 2
  },
  typography: {
    fontFamily: "serif"
  }
});

export default muiTheme;
