/** @jsx jsx */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialCheckbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { ThemeProvider } from "@material-ui/styles";
import { MaterialTheme } from "@hackoregon/ui-themes";

const Checkbox = ({
  variant,
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
          variant={variant}
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
  labelPlacement: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  value: false,
  label: "Label",
  labelPlacement: "end",
  variant: "contained",
  disabled: false
};

export default Checkbox;
