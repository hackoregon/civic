/** @jsx jsx */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MaterialRadio from "@material-ui/core/Radio";
import MaterialRadioGroup from "@material-ui/core/RadioGroup";

const radioButtonGroupClass = css`
  background-color: #fff;
  color: #1e62bd;
  cursor: pointer;
`;

const RadioButtonGroup = ({
  labels, // an array of labels - create a radio btn for each label
  onChange, // for the group
  disabled, // disable the group of btns
  value, // the value of the selected btn
  grpLabel,
  labelPlacement
}) => (
  <MaterialRadioGroup
    name={grpLabel}
    onChange={onChange}
    value={value}
    inputProps={{ "aria-label": { grpLabel } }}
  >
    {labels.map(label => (
      <FormControlLabel
        key={label.id}
        value={label} // select the label of this btn from the array
        control={
          <MaterialRadio
            disabled={disabled} // can I disable a specific btn? Do I want to?
            css={radioButtonGroupClass}
            inputProps={{ "aria-label": { label } }} // label of this btn
          />
        }
        label={label} // select the label of this btn from the array
        labelPlacement={labelPlacement} // all btns in group have same placement
      />
    ))}
  </MaterialRadioGroup>
);

RadioButtonGroup.displayName = "RadioButtonGroup";

RadioButtonGroup.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  // label: PropTypes.string,
  value: PropTypes.string,
  grpLabel: PropTypes.string,
  labelPlacement: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

RadioButtonGroup.defaultProps = {
  labels: ["Label 1", "Label 2", "Label 3"],
  // label: "Label",
  value: "Label 1",
  grpLabel: "Group Label",
  labelPlacement: "end",
  disabled: false
};

export default RadioButtonGroup;
