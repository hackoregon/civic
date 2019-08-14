/** @jsx jsx */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsx, css } from "@emotion/core";
import React from "react";
import { camelCase, has } from "lodash";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MaterialSelect from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

const Select = ({
  autoWidth,
  fullWidth,
  displayEmpty,
  onChange,
  value,
  variant,
  inputLabel,
  // labelWidth,
  disabled,
  options
}) => {
  const valueLabels = options.map(item =>
    has(item, "value") && has(item, "label")
      ? item
      : { value: item, label: item }
  );

  const inputLabelRef = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabelRef.current.offsetWidth);
  }, []);

  return (
    <FormControl
      autoWidth={autoWidth}
      fullWidth={fullWidth}
      displayEmpty={displayEmpty}
      variant={variant}
      disabled={disabled}
      // className={classes.formControl}
    >
      <InputLabel
        ref={inputLabelRef}
        htmlFor={camelCase(inputLabel)}
        variant={variant}
      >
        {inputLabel}
      </InputLabel>
      <MaterialSelect
        value={value}
        onChange={onChange}
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            name={inputLabel}
            id={camelCase(inputLabel)}
          />
        }
      >
        {valueLabels.map(item => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </MaterialSelect>
    </FormControl>
  );
};

Select.displayName = "Select";

Select.propTypes = {
  autoWidth: PropTypes.bool,
  fullWidth: PropTypes.bool,
  displayEmpty: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  variant: PropTypes.string,
  inputLabel: PropTypes.string,
  // labelWidth: PropTypes.number,
  disabled: PropTypes.bool,
  options: PropTypes.oneOf(
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })
    )
  ).isRequired
};

Select.defaultProps = {
  autoWidth: true,
  fullWidth: false,
  displayEmpty: true,
  value: "List item",
  variant: "outlined",
  inputLabel: "Input label",
  // labelWidth: 20,
  disabled: false
};

export default Select;
