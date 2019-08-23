/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { Badge as MaterialBadge } from "@material-ui/core";

const badgeClass = color => css`
  background-color: #ffffff;
  span {
    background-color: ${color};
  }
`;

function Badge({ children, value, color }) {
  return (
    <MaterialBadge css={badgeClass(color)} badgeContent={value} color="primary">
      {children}
    </MaterialBadge>
  );
}

Badge.defaultProps = {
  value: 42,
  color: "#AAA4AB"
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number,
  color: PropTypes.string
};

export default Badge;
