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
  labels,
  onChange,
  disabled,
  value,
  grpLabel,
  labelPlacement,
  row
}) => (
  <MaterialRadioGroup
    name={grpLabel}
    onChange={onChange}
    value={value}
    row={row}
    inputProps={{ "aria-label": { grpLabel } }}
  >
    {labels.map(label => (
      <FormControlLabel
        key={label.id}
        value={label}
        control={
          <MaterialRadio
            disabled={disabled}
            css={radioButtonGroupClass}
            inputProps={{ "aria-label": { label } }}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
    ))}
  </MaterialRadioGroup>
);

RadioButtonGroup.displayName = "RadioButtonGroup";

RadioButtonGroup.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  grpLabel: PropTypes.string,
  labelPlacement: PropTypes.string,
  row: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

RadioButtonGroup.defaultProps = {
  labels: ["Label 1", "Label 2", "Label 3"],
  value: "Label 1",
  grpLabel: "Group Label",
  labelPlacement: "end",
  row: false,
  disabled: false
};

export default RadioButtonGroup;
