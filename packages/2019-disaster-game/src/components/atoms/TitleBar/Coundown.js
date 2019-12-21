/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
import Palette from "../../../constants/style";

const timerStyle = css`
  background-color: ${Palette.lightestGrey};
  border-radius: 15px;
  padding: 15px;
  width: 222px;

  > p {
    font-family: "Luckiest Guy", sans-serif;
    font-size: 80px;
    line-height: 80px;
    color: ${Palette.red};
    margin: 0;
  }
`;

const fillZero = number => {
  return number < 10 ? `0${number}` : number;
};

const Countdown = ({ iconStyle, duration }) => {
  const totalTime = duration * 100;
  let usedTime = 0;
  const startTime = new Date();
  const [timer, setTimer] = useState(null);
  const [displayedTime, setDisplayedTime] = useState("00:00");

  const count = () => {
    usedTime = Math.floor((new Date() - startTime) / 10);

    const tt = totalTime - usedTime;
    if (tt <= 0) {
      setDisplayedTime("00:00");
      clearInterval(timer);
    } else {
      const mi = Math.floor(tt / (60 * 100));
      const ss = Math.floor((tt - mi * 60 * 100) / 100);
      const ms = tt - Math.floor(tt / 100) * 100;

      setDisplayedTime(`${fillZero(ss)}:${fillZero(ms)}`);
    }
  };

  useEffect(() => {
    setTimer(setInterval(count, 10));

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={[iconStyle, timerStyle]}>
      <p>{displayedTime}</p>
    </div>
  );
};

Countdown.propTypes = {
  iconStyle: PropTypes.shape({}),
  duration: PropTypes.number
};

export default Countdown;
