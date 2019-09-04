/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialButton from "@material-ui/core/Button";

const buttonClass = css`
  color: blue;
`;

const ButtonNew = ({ label, onClick }) => (
  <MaterialButton variant="outlined" css={buttonClass} onClick={onClick}>
    {label}
  </MaterialButton>
);

ButtonNew.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

ButtonNew.defaultProps = {
  label: "Label"
};

ButtonNew.displayName = "ButtonNew";

export default ButtonNew;
