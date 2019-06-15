/** @jsx jsx */
import PropTypes from "prop-types";
import { jsx, css } from "@emotion/core";

const defaultOrb = css`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: blue;
  position: absolute;
`;

const Orb = ({ x, y }) => {
  const location = css`
    top: ${y}px;
    left: ${x}px;
  `;
  return (
    <div
      css={css`
        ${defaultOrb};
        ${location};
      `}
    />
  );
};

Orb.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number
};

export default Orb;
