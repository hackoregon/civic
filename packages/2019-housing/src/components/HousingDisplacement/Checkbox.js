/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { bool } from "prop-types";

const Checkbox = ({ checked }) => {
  return checked ? (
    <CheckBoxIcon fontSize="small" />
  ) : (
    <CheckBoxOutlineBlankIcon fontSize="small" />
  );
};

Checkbox.propTypes = {
  checked: bool
};

export default Checkbox;
