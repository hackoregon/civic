/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { jsx, css } from "@emotion/core";

const defaultOrb = css`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: blue;
  position: absolute;
  cursor: pointer;
  opacity: .8;
  &:hover {
    opacity: 1;
  }
`;

class Orb extends Component {
  render() {
    const { x, y } = this.props;
    const location = css`
      top: ${y}px;
      left: ${x}px;
    `;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        css={css`
          ${defaultOrb};
          ${location};
        `}
      />
    )
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
};

Orb.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number
};

export default Orb;
