/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import shortid from "shortid";
import {
  FormControlLabel,
  FormLabel,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import MaterialRadio from "@material-ui/core/Radio";
import MaterialRadioGroup from "@material-ui/core/RadioGroup";

import { ThemeProvider } from "@material-ui/styles";
import { MaterialTheme } from "@hackoregon/ui-themes";

/** A RadioButtonGroup built with MaterialUI under the hood */
export const RadioButtonGroup = ({
  labels,
  onChange,
  disabled,
  value,
  grpLabel,
  labelPlacement,
  row,
  formHelperText
}) => (
  <ThemeProvider theme={MaterialTheme}>
    <FormControl disabled={disabled}>
      <FormLabel>{grpLabel}</FormLabel>
      <MaterialRadioGroup
        aria-label={grpLabel}
        name={grpLabel}
        onChange={onChange}
        value={value}
        row={row}
      >
        {labels.map(label => (
          <FormControlLabel
            key={shortid.generate()}
            value={label}
            control={<MaterialRadio inputProps={{ "aria-label": { label } }} />}
            label={label}
            labelPlacement={labelPlacement}
          />
        ))}
      </MaterialRadioGroup>
      {formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
    </FormControl>
  </ThemeProvider>
);

RadioButtonGroup.displayName = "RadioButtonGroup";

RadioButtonGroup.propTypes = {
  /** The option values/labels for the radio buttons */
  labels: PropTypes.arrayOf(PropTypes.string),
  /** The current value of the radio button, an element in the labels array */
  value: PropTypes.string,
  /** A label for the group of radio buttons */
  grpLabel: PropTypes.string,
  /** Placement location of the label for each radio buttons */
  labelPlacement: PropTypes.oneOf(["start", "end", "top", "bottom"]),
  /** Helper text for the radio buttons */
  formHelperText: PropTypes.string,
  /** Display radio buttons in a row */
  row: PropTypes.bool,
  /** Disable interaction with the radio buttons */
  disabled: PropTypes.bool,
  /** onChange handler */
  onChange: PropTypes.func
};

RadioButtonGroup.defaultProps = {
  labels: ["Label 1", "Label 2", "Label 3"],
  value: "Label 1",
  grpLabel: "GroupLabel",
  labelPlacement: "end",
  formHelperText: "",
  row: false,
  disabled: false
};
