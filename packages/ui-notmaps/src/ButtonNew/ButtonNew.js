/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialButton from "@material-ui/core/Button";

import { ThemeProvider } from "@material-ui/styles";
import { MaterialTheme } from "../_Themes/index";

const variant = {
  primary: "contained",
  secondary: "text"
};

const ButtonNew = ({ label, onClick, type, href, disabled }) => (
  <ThemeProvider theme={MaterialTheme}>
    <MaterialButton
      onClick={onClick}
      color="secondary"
      variant={variant[type]}
      href={href || undefined}
      disabled={disabled}
    >
      {label}
    </MaterialButton>
  </ThemeProvider>
);

ButtonNew.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  href: PropTypes.string,
  disabled: PropTypes.bool
};

ButtonNew.defaultProps = {
  label: "Label",
  type: "primary"
};

ButtonNew.displayName = "ButtonNew";

export default ButtonNew;
