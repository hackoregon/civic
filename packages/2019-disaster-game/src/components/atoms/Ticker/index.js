import { memo, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Timer from "../../../utils/timer";
import { palette } from "../../../constants/style";
import media from "../../../utils/mediaQueries";

const containerStyle = css`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  background: ${palette.blue};
  z-index: 10;
`;

const textStyle = css`
  margin: 0;
  padding: 5px 15px;
  text-align: center;
  font-family: "Boogaloo", cursive;
  font-size: 16px;
  line-height: 1;
  color: ${palette.gold};

  ${media.md} {
    font-size: 4.5rem;
    padding: 10px 25px;
  }
`;

const Ticker = ({ messages }) => {
  const [messageToDisplayIndex, setMessageToDisplayIndex] = useState(0);
  const [messageTimer] = useState(new Timer());

  useEffect(() => {
    messageTimer.reset();
    messageTimer.setDuration(10);
    messageTimer.addCompleteCallback(() => {
      const nextIndex = messageToDisplayIndex + 1;
      if (nextIndex >= messages.length) {
        setMessageToDisplayIndex(0);
      } else {
        setMessageToDisplayIndex(nextIndex);
      }
    });
    messageTimer.start();

    return () => {
      messageTimer.stop();
    };
  }, [
    messageTimer,
    setMessageToDisplayIndex,
    messageToDisplayIndex,
    messages.length
  ]);

  return (
    <div css={containerStyle}>
      <p css={textStyle}>{messages[messageToDisplayIndex]}</p>
    </div>
  );
};

Ticker.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string)
};

export default memo(Ticker);
