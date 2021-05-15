/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { bool } from "prop-types";

const Checkbox = ({ checked }) => {
  return checked ? (
    <CheckBoxIcon
      fontSize="small"
      css={css`
        vertical-align: text-top;
      `}
    />
  ) : (
    <CheckBoxOutlineBlankIcon
      fontSize="small"
      css={css`
        vertical-align: text-top;
      `}
    />
  );
};

Checkbox.propTypes = {
  checked: bool
};

export default Checkbox;
