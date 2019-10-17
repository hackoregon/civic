/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { palette } from "../../constants/style";
import {
  getTeamworkBadge,
  getPreparedBadge,
  getHeroBadge
} from "../../state/user";
import Song from "./Audio/Song";
import BadgeEarnedSFX from "../../../assets/audio/badge-earned.mp3";

// background color is blue
const containerStyle = css`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-color: ${palette.blueRGBA};
  display: grid;
  align-content: center;
  justify-content: center;
  text-align: center;
  z-index: 900;
  opacity: 1;
  transition: all 1s;
`;

const hideBadgeStyle = css`
  opacity: 0;
`;

const badgeStyle = css`
  height: 60vh;
  justify-self: center;
`;

const badgeText = css`
  font-family: "Luckiest Guy", sans-serif;
  font-size: 12rem;
  margin: 0;
  color: #fff;
  text-shadow: 0 5px 0px ${palette.red}, 5px 0 0px ${palette.darkRed},
    5px 10px 5px ${palette.red}, 10px 5px 5px ${palette.darkRed},
    10px 15px 10px ${palette.red}, 15px 10px 10px ${palette.darkRed},
    15px 20px 10px ${palette.red}, 20px 15px 15px ${palette.darkRed},
    20px 25px 15px ${palette.red}, 25px 20px 10px ${palette.darkRed},
    25px 30px 10px ${palette.red}, 30px 25px 10px ${palette.darkRed},
    30px 35px 5px ${palette.red}, 35px 30px 5px ${palette.darkRed},
    35px 40px 0px ${palette.red}, 40px 35px 0px ${palette.darkRed};
`;

const titleText = css`
  font-size: 14rem;
`;

const NewBadge = ({ type, badges }) => {
  const [badgeInfo, setBadgeInfo] = useState(badges[type]);
  const [hideBadge, setHideBadge] = useState(false);

  useEffect(() => {
    setBadgeInfo(badges[type]);
    const hideBadgeTimeout = setTimeout(() => {
      setHideBadge(true);
    }, 4000);

    return () => {
      clearTimeout(hideBadgeTimeout);
    };
  }, [badges, type]);

  return (
    <div
      css={css`
        ${containerStyle};
        ${hideBadge ? hideBadgeStyle : ""};
      `}
    >
      <p css={[badgeText, titleText]}>NEW BADGE EARNED!</p>
      <img src={badgeInfo.badgeSVG} alt="Badge" css={badgeStyle} />
      <p css={badgeText}>{badgeInfo.title}</p>
      <Song songFile={BadgeEarnedSFX} shouldLoop={false} volume={1.0} />
    </div>
  );
};

NewBadge.propTypes = {
  type: PropTypes.string,
  badges: PropTypes.shape({})
};

const mapStateToProps = state => ({
  badges: {
    teamwork: getTeamworkBadge(state),
    prepared: getPreparedBadge(state),
    hero: getHeroBadge(state)
  }
});

export default connect(mapStateToProps)(NewBadge);
