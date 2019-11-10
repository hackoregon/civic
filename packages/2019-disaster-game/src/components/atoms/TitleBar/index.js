import { memo, useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";

import { getActiveChapterId } from "../../../state/chapters";
import { TASKS } from "../../../constants/chapters";
import QRCode from "../../../../assets/earthquake-heroes-qr-code.svg";
import JourneyBar from "./JourneyBar";
import SavedBar from "./SavedBar";

const ContainerStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 103;
  pointer-events: none;
  transform: translateY(-100%);
  transition: transform 1s;
  display: grid;
  grid-template-rows: auto;
`;

const onScreenStyle = css`
  transform: translateY(0%);
`;

const infoContainer = css`
  /* 40px padding on each side */
  width: calc(100% - 80px);
  padding: 0 40px;
  display: grid;
  grid-template-columns: 355px 2360px 1025px;
  align-items: center;
  margin-top: 10px;
`;

const fullInfoContainer = css`
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 355px 3380px;
`;

const QRCodeStyle = css`
  height: 160px;
`;

const TitleBar = ({ activeChapterId }) => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [badgeDrawerOpen, setBadgeDrawerOpen] = useState(false);
  const [startAnimateTimeout, setStartAnimateTimeout] = useState(null);
  const [endAnimateTimeout, setEndAnimateTimeout] = useState(null);

  const openBadgeDrawer = () => {
    const newStartTimeout = setTimeout(() => {
      setBadgeDrawerOpen(true);
    }, 4000);
    const newEndTimeout = setTimeout(() => {
      setBadgeDrawerOpen(false);
    }, 10000);
    setStartAnimateTimeout(newStartTimeout);
    setEndAnimateTimeout(newEndTimeout);
  };

  useEffect(() => {
    setOpen(true);

    return () => {
      setOpen(false);
      setBadgeDrawerOpen(false);
      if (startAnimateTimeout) clearTimeout(startAnimateTimeout);
      if (endAnimateTimeout) clearTimeout(endAnimateTimeout);
    };
  }, [endAnimateTimeout, startAnimateTimeout]);

  return (
    <div
      css={css`
        ${ContainerStyle}
        ${open && onScreenStyle}
      `}
    >
      <div
        css={css`
          ${infoContainer};
          ${badgeDrawerOpen && fullInfoContainer}
        `}
      >
        <img
          src={QRCode}
          alt="QR code for civicplatform.org/EarthquakeHeroes"
          css={QRCodeStyle}
        />
        <JourneyBar
          badgeDrawerOpen={badgeDrawerOpen}
          openBadgeDrawer={openBadgeDrawer}
        />
        {activeChapterId === TASKS && (
          <Fragment>
            {badgeDrawerOpen && <div />}
            <SavedBar justifyRight={badgeDrawerOpen} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

TitleBar.propTypes = {
  activeChapterId: PropTypes.string
};

const mapStateToProps = state => ({
  activeChapterId: getActiveChapterId(state)
});

export default connect(mapStateToProps)(memo(TitleBar));
