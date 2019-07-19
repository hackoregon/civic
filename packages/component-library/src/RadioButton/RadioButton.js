/** @jsx jsx */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsx, css } from "@emotion/core";
// import React from 'react'; why isn't this needed
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MaterialRadio from "@material-ui/core/Radio";
import MaterialRadioGroup from "@material-ui/core/RadioGroup";

const radioButtonClass = css`
  background-color: #fff;
  color: #1e62bd;
  cursor: pointer;
`;

// RadioGroup has a prop aria-label="?label"

const RadioButtonGroup = ({
  // variant,
  onChange,
  disabled,
  value,
  label,
  labelPlacement
}) => (
  <MaterialRadioGroup inputProps={{ "aria-label": { label } }}>
    <FormControlLabel
      value={label}
      control={
        <MaterialRadio
          checked={value}
          // variant={variant}
          onChange={onChange}
          disabled={disabled}
          css={radioButtonClass}
          inputProps={{ "aria-label": { label } }}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
    />
    <FormControlLabel
      value={label}
      control={
        <MaterialRadio
          checked={value}
          // variant={variant}
          onChange={onChange}
          disabled={disabled}
          css={radioButtonClass}
          inputProps={{ "aria-label": { label } }}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
    />
  </MaterialRadioGroup>
);

RadioButtonGroup.displayName = "RadioButtonGroup";

RadioButtonGroup.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

RadioButtonGroup.defaultProps = {
  value: false,
  label: "Label",
  labelPlacement: "end",
  variant: "contained",
  disabled: false
};

export default RadioButtonGroup;
