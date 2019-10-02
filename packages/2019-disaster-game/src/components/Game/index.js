/* eslint-disable import/no-named-as-default */
import React, { Fragment, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "@emotion/styled";

import { getActiveChapterId } from "../../state/chapters";
import {
  ATTRACTOR,
  KIT,
  TASKS,
  QUAKE,
  SUMMARY
} from "../../constants/chapters";
import { palette } from "../../constants/style";
import media from "../../utils/mediaQueries";
import TitleBar from "../atoms/TitleBar";
import Panel from "../atoms/Panel";
import DefaultScreen from "./DefaultScreen/index";
import AttractorScreen from "./AttractorScreen/index";
import KitScreen from "./KitScreen/index";
import QuakeScreen from "./QuakeScreen/index";
import TaskScreen from "./TaskScreen/index";
import SummaryScreen from "./SummaryScreen/index";

import "@hackoregon/component-library/assets/global.styles.css";
import summarySong from "../../../assets/audio/PWolf-happysong1wfadeinout.mp3";

const Game = ({ activeChapterId }) => {
  const renderChapter = chapterId => {
    switch (chapterId) {
      case KIT:
        return <KitScreen />;
      case TASKS:
        return <TaskScreen />;
      case QUAKE:
        return <QuakeScreen />;
      case SUMMARY:
        return <SummaryScreen songFile={summarySong} />;
      default:
        return <DefaultScreen />;
    }
  };

  return (
    <Fragment>
      {activeChapterId === ATTRACTOR && <AttractorScreen />}
      {activeChapterId !== ATTRACTOR && (
        <GameContainerStyle>
          {activeChapterId !== ATTRACTOR && activeChapterId !== QUAKE && (
            <TitleBar />
          )}
          <GameGrid>{renderChapter(activeChapterId)}</GameGrid>
        </GameContainerStyle>
      )}
    </Fragment>
  );
};

Game.displayName = "Game";

// Temporarily hardcode the height of the DurationBar and temporary chapter buttons
const GameContainerStyle = styled(Panel)`
  position: relative;
  width: 100%;
  background-color: ${palette.blue};
`;

const GameGrid = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 304px;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  min-height: 600px;

  ${media.lg} {
    grid-template-rows: 1fr 334px;
    min-height: 800px;
  }

  ${media.xl} {
    grid-template-rows: 1fr 784px;
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
  position: relative;
  background: pink;
  /* uncomment for orbs to be on top of other elements */
  /* overflow: visible; */
  /* z-index: 101; */
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
  activeChapterId: PropTypes.string
};

export default connect(state => ({
  settings: state.settings,
  activeChapterId: getActiveChapterId(state)
}))(memo(Game));
