/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialButton from "@material-ui/core/Button";

import { ThemeProvider } from "@material-ui/styles";
import { MaterialTheme } from "@hackoregon/ui-themes";

const variant = {
  primary: "contained",
  secondary: "text"
};

/**
 * A Button with some different states, based on MaterialUI
 */

export const ButtonNew = ({ children, onClick, type, href, disabled }) => (
  <ThemeProvider theme={MaterialTheme}>
    <MaterialButton
      onClick={onClick}
      color="secondary"
      variant={variant[type]}
      href={href || undefined}
      disabled={disabled}
    >
      {children}
    </MaterialButton>
  </ThemeProvider>
);

ButtonNew.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["primary", "secondary"]),
  href: PropTypes.string,
  disabled: PropTypes.bool
};

ButtonNew.defaultProps = {
  children: "Label",
  type: "primary"
};

ButtonNew.displayName = "ButtonNew";
