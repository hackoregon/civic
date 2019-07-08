/** @jsx jsx */
/* eslint-disable */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

/*
const checkboxClass = props => css`
  background: ${props.bkgndColor};
  cursor: pointer;
  border: 2px solid ${props.accentColor};
`;
*/

const CivicCheckbox = ({
  checked,
  variant,
  onChange,
  value,
  label,
  labelPlacement,
  ...props
}) => (
  <FormControlLabel
    value={value}
    control={
      <Checkbox
        checked={checked}
        variant={variant}
        onChange={onChange}
        // css={checkboxClass(props)}
        inputProps={{ "aria-label": "Checkbox A" }}
      />
    }
    label={label}
    labelPlacement={labelPlacement}
  />
);

CivicCheckbox.displayName = "CivicCheckbox";

CivicCheckbox.propTypes = {
  value: PropTypes.string,
  control: PropTypes.func,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  checked: PropTypes.bool,
  variant: PropTypes.string,
  checkedIcon: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  type: PropTypes.string
};

CivicCheckbox.defaultProps = {
  value: "checkboxValue",
  label: "Label",
  labelPlacement: "end",
  checked: false,
  variant: "contained"
  /*
  display: "block",
  margin: "12px",
  accentColor: "#DC4556",
  bkgndColor: "#FFFFFF",
  transition: "all .2s ease-in-out"
  */
};

export default CivicCheckbox;
