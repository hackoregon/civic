/** @jsx jsx */
import { jsx, css } from "@emotion/core";
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

const radioButtonGroupClass = css`
  cursor: pointer;
`;

const RadioButtonGroup = ({
  labels,
  onChange,
  disabled,
  value,
  grpLabel,
  labelPlacement,
  row,
  formHelperText
}) => (
  <FormControl disabled={disabled}>
    <FormLabel>{grpLabel}</FormLabel>
    <MaterialRadioGroup
      aria-label={grpLabel}
      name={grpLabel}
      onChange={onChange}
      value={value}
      row={row}
      inputProps={{ "aria-labelledby": { grpLabel } }}
    >
      {labels.map(label => (
        <FormControlLabel
          key={shortid.generate()}
          value={label}
          control={
            <MaterialRadio
              css={radioButtonGroupClass}
              inputProps={{ "aria-label": { label } }}
            />
          }
          label={label}
          labelPlacement={labelPlacement}
        />
      ))}
    </MaterialRadioGroup>
    <FormHelperText>{formHelperText}</FormHelperText>
  </FormControl>
);

RadioButtonGroup.displayName = "RadioButtonGroup";

RadioButtonGroup.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  grpLabel: PropTypes.string,
  labelPlacement: PropTypes.string,
  formHelperText: PropTypes.string,
  row: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

RadioButtonGroup.defaultProps = {
  labels: ["Label 1", "Label 2", "Label 3"],
  value: "Label 1",
  grpLabel: "GroupLabel",
  labelPlacement: "end",
  formHelperText: "Helper text",
  row: false,
  disabled: false
};

export default RadioButtonGroup;
