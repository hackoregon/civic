/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";

const durationBarStyle = css`
  width: 100%;
  height: 40px;
  margin: 0;
  background-color: #721d7c;
  animation: scroll-left 30s linear 5s;
  animation-fill-mode: forwards;
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const durationBarStepStyle = css`
  display: grid;
  height: 100%;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);

  color: #ffffff;
  vertical-align: middle;
  font-family: "Roboto", sans-serif;
  font-size: 1.5em;
  text-align: center;
`;

const DurationBar = ({ step }) => {
  return (
    <div
      css={css`
        ${durationBarStyle}
      `}
    >
      <div
        css={css`
          ${durationBarStepStyle}
        `}
      >
        <span>{step}</span>
        <span>{step}</span>
        <span>{step}</span>
      </div>
    </div>
  );
};

DurationBar.propTypes = {
  step: PropTypes.string
};

DurationBar.defaultProps = {
  step: "Current step"
};

export default DurationBar;
