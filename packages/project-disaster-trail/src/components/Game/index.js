/* eslint-disable import/no-named-as-default */
import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "@emotion/styled";

// import * as SCREENS from "../../constants/screens";
import { getActiveChapterId } from "../../state/chapters";
import { KIT, TASKS } from "../../constants/chapters";

import TitleBar from "../atoms/TitleBar";
import DefaultScreen from "./DefaultScreen/index";
import KitScreen from "./KitScreen/index";
import TaskScreen from "./TaskScreen/index";
import Panel from "../atoms/Panel";
import media from "../../utils/mediaQueries";

import "@hackoregon/component-library/assets/global.styles.css";

const Game = ({ activeChapterId }) => {
  const renderChapter = chapterId => {
    switch (chapterId) {
      case KIT:
        return <KitScreen />;
      case TASKS:
        return <TaskScreen />;
      default:
        return <DefaultScreen />;
    }
  };

  return (
    <GameContainerStyle>
      <TitleBar />
      <GameGrid>{renderChapter(activeChapterId)}</GameGrid>
    </GameContainerStyle>
  );
};

Game.displayName = "Game";

// Temporarily hardcode the height of the DurationBar and temporary chapter buttons
const GameContainerStyle = styled(Panel)`
  position: relative;
  width: 100%;
`;

const GameGrid = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 24px 80px 200px;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  min-height: 600px;

  ${media.lg} {
    grid-template-rows: 1fr 24px 60px 250px;
    min-height: 800px;
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
