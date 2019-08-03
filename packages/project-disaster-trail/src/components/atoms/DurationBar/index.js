/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";

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

const DurationBar = ({ step, durationLength }) => {
  const durationBarStyle = css`
    width: 100%;
    height: 40px;
    margin: 0;
    background-color: #721d7c;
    animation: scroll-left ${durationLength}s linear;
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
  step: PropTypes.string,
  durationLength: PropTypes.number
};

DurationBar.defaultProps = {
  step: "Current step",
  durationLength: 30
};

export default DurationBar;
