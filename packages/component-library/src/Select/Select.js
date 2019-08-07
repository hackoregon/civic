/** @jsx jsx */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MaterialSelect from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

const Select = ({
  // autoWidth,
  fullWidth,
  displayEmpty,
  onChange,
  value,
  variant,
  inputLabel,
  disabled
}) => (
  <FormControl
    // autoWidth={autoWidth}
    fullWidth={fullWidth}
    displayEmpty={displayEmpty}
    variant={variant}
    disabled={disabled}
    // className={classes.formControl}
  >
    <InputLabel
      ref={inputLabel}
      htmlFor="outlined-age-simple"
      variant={variant}
    >
      {inputLabel}
    </InputLabel>
    <MaterialSelect
      value={value}
      onChange={onChange}
      input={
        <OutlinedInput
          // labelWidth={labelWidth}
          name="age"
          id="outlined-age-simple"
        />
      }
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </MaterialSelect>
  </FormControl>
);

Select.displayName = "Select";

Select.propTypes = {
  // autoWidth: PropTypes.bool,
  fullWidth: PropTypes.bool,
  displayEmpty: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  variant: PropTypes.string,
  inputLabel: PropTypes.string,
  disabled: PropTypes.bool
};

Select.defaultProps = {
  // autoWidth: true,
  fullWidth: false,
  displayEmpty: true,
  value: "List item",
  variant: "outlined",
  inputLabel: "Input label",
  disabled: false
};

export default Select;
