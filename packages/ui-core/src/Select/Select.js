/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { has } from "lodash";
import PropTypes from "prop-types";
import MaterialSelect from "@material-ui/core/Select";
import {
  FormControl,
  OutlinedInput,
  MenuItem,
  FormLabel,
  FormHelperText
} from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";
import { MaterialTheme } from "@hackoregon/ui-themes";

/** A Select dropdown built with MaterialUI under the hood */
export const Select = ({
  autoWidth,
  displayEmpty,
  onChange,
  value,
  variant,
  formLabel,
  formHelperText,
  disabled,
  options
}) => {
  const valueLabels = options.map(item =>
    has(item, "value") && has(item, "label")
      ? item
      : { value: item, label: item }
  );

  return (
    <ThemeProvider theme={MaterialTheme}>
      <FormControl
        autoWidth={autoWidth}
        displayEmpty={displayEmpty}
        variant={variant}
        disabled={disabled}
      >
        <FormLabel style={{ marginBottom: 8 }}>{formLabel}</FormLabel>
        <MaterialSelect
          value={value}
          onChange={onChange}
          input={<OutlinedInput />}
        >
          {valueLabels.map(item => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </MaterialSelect>
        <FormHelperText>{formHelperText}</FormHelperText>
      </FormControl>
    </ThemeProvider>
  );
};

Select.displayName = "Select";

Select.propTypes = {
  /** If true, the component will take up the full width of its container.   */
  autoWidth: PropTypes.bool,
  /** Not currently functional */
  displayEmpty: PropTypes.bool,
  /** onChange handler */
  onChange: PropTypes.func,
  /** The current value of the select dropdown */
  value: PropTypes.string,
  /** The variant to use */
  variant: PropTypes.oneOf(["filled", "outlined", "standard"]),
  /** A label for the select dropdown */
  formLabel: PropTypes.string,
  /** Helper text for the select dropdown */
  formHelperText: PropTypes.string,
  /** Show in a disabled state */
  disabled: PropTypes.bool,
  /** Options for the select dropdown */
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })
    )
  ])
};

Select.defaultProps = {
  autoWidth: true,
  displayEmpty: true,
  value: "List item 1",
  options: ["List item 1", "List item 2", "List item 3"],
  variant: "outlined",
  formLabel: "Label",
  formHelperText: "",
  disabled: false
};
