/** @jsx jsx */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const DropdownList = ({
  autoWidth,
  displayEmpty,
  onChange,
  value,
  variant
}) => (
  <FormControl
    autoWidth={autoWidth}
    displayEmpty={displayEmpty}
    variant="outlined"
    className={classes.formControl}
  >
    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
      Age
    </InputLabel>
    <Select
      value={values.age}
      onChange={handleChange}
      input={
        <OutlinedInput
          labelWidth={labelWidth}
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
    </Select>
  </FormControl>
);

DropdownList.displayName = "Dropdown List";

DropdownList.PropTypes = {
  autoWidth: PropTypes.bool,
  displayEmpty: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  variant: PropTypes.string
};

DropdownList.defaultProps = {
  autoWidth: true,
  displayEmpty: true,
  value: "List item",
  variant: "outlined"
};
