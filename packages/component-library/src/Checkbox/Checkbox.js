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
  variant,
  onChange,
  disabled,
  value,
  label,
  labelPlacement
}) => (
  <FormControlLabel
    value={label}
    control={
      <MaterialCheckbox
        checked={value}
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
