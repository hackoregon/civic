/** @jsx jsx */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsx, css } from "@emotion/core";
// import React from 'react'; why isn't this needed
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MaterialRadio from "@material-ui/core/Radio";
import MaterialRadioGroup from "@material-ui/core/RadioGroup";

const radioButtonGroupClass = css`
  background-color: #fff;
  color: #1e62bd;
  cursor: pointer;
`;

/*
Use the map function to read an array of labels and create a radio button for each one.
*/
/*
const labels = ["Label 1", "Label 2", "Label 3"];
const buildGroup = labels.map(label => <li>{label}</li>);
*/
// RadioGroup has a prop aria-label="?label"

const RadioButtonGroup = ({
  // labels, an array of labels - create a radio btn for each label
  label, // use labels instead of label?
  onChange,
  disabled,
  value, // value of the selected radio button - make this a knob
  grpLabel,
  labelPlacement
}) => (
  <MaterialRadioGroup
    name={grpLabel}
    onChange={onChange}
    value={value}
    inputProps={{ "aria-label": { grpLabel } }}
  >
    <FormControlLabel
      // value={labels}
      value={label}
      control={
        <MaterialRadio
          checked={value} // how do I set one btn to be selected? required
          disabled={disabled} // can I disable a specific btn? Do I want to?
          css={radioButtonGroupClass}
          inputProps={{ "aria-label": { label } }}
        />
      }
      // label={labels} take from the array labels for this btn
      label={label}
      labelPlacement={labelPlacement} // all btns in group have same placement
    />

    <FormControlLabel
      value={label}
      control={
        <MaterialRadio
          checked={value}
          onChange={onChange}
          disabled={disabled}
          css={radioButtonGroupClass}
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
  // labels: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  value: PropTypes.bool,
  grpLabel: PropTypes.string,
  labelPlacement: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

RadioButtonGroup.defaultProps = {
  // labels: ["Label 1", "Label 2", "Label 3"],
  label: "Label",
  value: false,
  grpLabel: "Group Label",
  labelPlacement: "end",
  disabled: false
};

export default RadioButtonGroup;
