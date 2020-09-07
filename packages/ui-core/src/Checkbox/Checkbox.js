/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialCheckbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { ThemeProvider } from "@material-ui/styles";
import { MaterialTheme } from "@hackoregon/ui-themes";

/**
 * A checkbox built with MaterialUI under the hood
 */

export const Checkbox = ({
  onChange,
  disabled,
  value,
  label,
  labelPlacement
}) => (
  <ThemeProvider theme={MaterialTheme}>
    <FormControlLabel
      value={label}
      control={
        <MaterialCheckbox
          checked={value}
          onChange={onChange}
          disabled={disabled}
          inputProps={{ "aria-label": { label } }}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
    />
  </ThemeProvider>
);

Checkbox.displayName = "Checkbox";

Checkbox.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  labelPlacement: PropTypes.oneOf(["bottom", "end", "start", "top"]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  value: false,
  label: "Label",
  labelPlacement: "end",
  disabled: false
};
