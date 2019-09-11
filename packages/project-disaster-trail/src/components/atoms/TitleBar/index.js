import { memo, useState, useEffect } from "react";

/** @jsx jsx */
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";

import ChapterButtons from "../ChapterButtons";
import billBoardPNG from "../../../../assets/earthquake-heroes.svg";

import LevelView from "../LevelView";
// import PointsView from "../PointsView";

const ContainerStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  /* 100px padding on each side */
  width: calc(100% - 200px);
  padding: 0 100px;
  display: grid;
  grid-template-columns: 600px 1fr 600px;
  justify-content: center;
  align-items: flex-start;
  z-index: 103;
  pointer-events: none;
  transform: translateY(-100%);
  transition: transform 1s;
`;

const onScreenStyle = css`
  transform: translateY(0%);
`;

const BillboardStyle = css`
  position: relative;
  justify-self: center;
  width: 645px;
  height: 300px;
  background-image: url(${billBoardPNG});
  background-repeat: no-repeat;
  background-size: contain;
  pointer-events: none;
`;

const TitleBar = ({ debug = false }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div
      css={css`
        ${ContainerStyle}
        ${open && onScreenStyle}
      `}
    >
      <LevelView />
      <div css={BillboardStyle} />
      {/* <PointsView /> */}
      {debug && <ChapterButtons />}
    </div>
  );
};

TitleBar.propTypes = {
  debug: PropTypes.bool
};

export default memo(TitleBar);
