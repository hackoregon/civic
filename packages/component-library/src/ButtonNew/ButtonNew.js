/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialButton from "@material-ui/core/Button";

import { ThemeProvider } from "@material-ui/styles";
import { MaterialTheme } from "../_Themes/index";

const ButtonNew = ({ label, onClick }) => (
  <ThemeProvider theme={MaterialTheme}>
    <MaterialButton variant="outlined" onClick={onClick}>
      {label}
    </MaterialButton>
  </ThemeProvider>
);

ButtonNew.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

ButtonNew.defaultProps = {
  label: "Label"
};

ButtonNew.displayName = "ButtonNew";

export default ButtonNew;
