/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";

const durationBarStyle = css`
  width: 100%;
  height: 40px;
  margin: 0;
  background-color: #721d7c;
  -moz-animation: scroll-left 30s linear 5s;
  -webkit-animation: scroll-left 30s linear 5s;
  animation: scroll-left 30s linear 5s;
  -moz-animation-fill-mode: forwards;
  -webit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  @-moz-keyframes scroll-left {
    0% {
      -moz-transform: translateX(0px);
    }
    100% {
      -moz-transform: translateX(-100%);
    }
  }
  @-webkit-keyframes scroll-left {
    0% {
      -webkit-transform: translateX(0px);
    }
    100% {
      -webkit-transform: translateX(-100%);
    }
  }
  @keyframes scroll-left {
    0% {
      -moz-transform: translateX(0); /* Browser bug fix */
      -webkit-transform: translateX(0); /* Browser bug fix */
      transform: translateX(0);
    }
    100% {
      -moz-transform: translateX(-100%); /* Browser bug fix */
      -webkit-transform: translateX(-100%); /* Browser bug fix */
      transform: translateX(-100%);
    }
  }
`;

const durationBarStepStyle = css`
  color: #ffffff;
  vertical-align: middle;
  margin: 0 10px 0 10px;
  padding-top: 2px;
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
      <p
        css={css`
          ${durationBarStepStyle}
        `}
      >
        {step}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{step}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{step}
      </p>
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
