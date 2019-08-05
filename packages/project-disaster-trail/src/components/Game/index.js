/* eslint-disable import/no-named-as-default */
import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "@emotion/styled";

// import * as SCREENS from "../../constants/screens";
import { getActiveChapter } from "../../state/chapters";

import ChapterButtons from "./ChapterButtons";
import DefaultScreen from "./DefaultScreen/index";
import KitScreen from "./KitScreen/index";
import TaskScreen from "./TaskScreen/index";
import Panel from "../atoms/Panel";
import media from "../../utils/mediaQueries";

import "@hackoregon/component-library/assets/global.styles.css";

const Game = ({ activeChapter }) => {
  const renderChapter = chapterId => {
    switch (chapterId) {
      case 2:
        return <KitScreen />;
      case 6:
        return <TaskScreen />;
      default:
        return <DefaultScreen chapterId={chapterId} />;
    }
  };

  return (
    <GameContainerStyle>
      <ChapterButtons />
      {renderChapter(activeChapter.id)}
    </GameContainerStyle>
  );
};

Game.displayName = "Game";

// Temporarily hardcode the height of the DurationBar and temporary chapter buttons
const GameContainerStyle = styled(Panel)`
  position: relative;
  display: grid;
  width: 100%;
  height: 100vh;
  min-height: 600px;

  grid-template-rows: 100px 1fr 40px 200px;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;

  ${media.lg} {
    grid-template-rows: 100px 1fr 40px 250px;
    min-height: 650px;
  }

  ${media.xl} {
    grid-template-rows: 100px 1fr 40px 700px;
  }
`;

export const MapStyle = styled(Panel)`
  position: relative;
  display: grid;
  background: beige;
  width: 100vw;
`;

export const GUIStyle = styled(Panel)`
  display: block;
  background: pink;
`;

Game.propTypes = {
  settings: PropTypes.shape({
    orbCount: PropTypes.number,
    orbSize: PropTypes.number,
    period: PropTypes.number,
    minVelocityX: PropTypes.number,
    maxVelocityX: PropTypes.number,
    minVelocityY: PropTypes.number,
    maxVelocityY: PropTypes.number,
    mode: PropTypes.string
  }),
  activeChapter: PropTypes.shape({
    enabled: PropTypes.bool,
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string
  })
};

export default connect(state => ({
  settings: state.settings,
  activeChapter: getActiveChapter(state)
}))(memo(Game));
