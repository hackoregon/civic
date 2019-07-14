/** @jsx jsx */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialCheckbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const checkboxClass = css`
  background-color: #fff;
  color: #1e62bd;
  cursor: pointer;
`;

const Checkbox = ({
  checked,
  variant,
  onChange,
  disabled,
  value,
  label,
  labelPlacement
}) => (
  <FormControlLabel
    value={value}
    control={
      <MaterialCheckbox
        checked={checked}
        variant={variant}
        onChange={onChange}
        disabled={disabled}
        css={checkboxClass}
        inputProps={{ "aria-label": { label } }}
      />
    }
    label={label}
    labelPlacement={labelPlacement}
  />
);

Checkbox.displayName = "Checkbox";

Checkbox.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  checked: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  value: "checkboxValue",
  label: "Label",
  labelPlacement: "end",
  checked: false,
  variant: "contained",
  disabled: false
};

export default Checkbox;
