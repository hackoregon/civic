/* eslint-disable import/no-named-as-default */
import React, { Fragment, memo, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { bindActionCreators } from "redux";

import { resetState as _resetStateTasks } from "../../state/tasks";
import { resetState as _resetStateKit } from "../../state/kit";
import {
  goToChapter as _goToChapter,
  getActiveChapterId,
  getActiveChapterData
} from "../../state/chapters";
import {
  ATTRACTOR,
  KIT_INTRO,
  KIT,
  KIT_OUTRO,
  QUAKE,
  TASKS_INTRO,
  TASKS,
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
import BetweenScreen from "./BetweenScreen/index";
import KitIntro from "./BetweenScreen/KitIntro";
import KitOutro from "./BetweenScreen/KitOutro";
import TaskIntro from "./BetweenScreen/TasksIntro";

import "@hackoregon/component-library/assets/global.styles.css";

const Game = ({
  activeChapterId,
  activeChapterData,
  resetStateKit,
  resetStateTasks,
  goToChapter
}) => {
  const [playCount, setPlayCount] = useState(0);

  const increasePlayCount = () => {
    setPlayCount(prevPlayCount => prevPlayCount + 1);
  };

  const restartGame = () => {
    resetStateKit();
    resetStateTasks();
    goToChapter();
  };

  const renderChapter = chapterId => {
    switch (chapterId) {
      case KIT_INTRO:
        return (
          <BetweenScreen chapterDuration={activeChapterData.duration}>
            <KitIntro />
          </BetweenScreen>
        );
      case KIT:
        return <KitScreen restartGame={restartGame} />;
      case KIT_OUTRO:
        return (
          <BetweenScreen chapterDuration={activeChapterData.duration}>
            <KitOutro />
          </BetweenScreen>
        );
      case QUAKE:
        return <QuakeScreen />;
      case TASKS_INTRO:
        return (
          <BetweenScreen chapterDuration={activeChapterData.duration}>
            <TaskIntro />
          </BetweenScreen>
        );
      case TASKS:
        return <TaskScreen restartGame={restartGame} />;
      default:
        return <DefaultScreen />;
    }
  };

  return (
    <Fragment>
      {activeChapterId === ATTRACTOR && <AttractorScreen />}
      {activeChapterId !== ATTRACTOR && activeChapterId !== SUMMARY && (
        <GameContainerStyle>
          {activeChapterData.showTitleBar && <TitleBar />}
          <GameGrid>{renderChapter(activeChapterId)}</GameGrid>
        </GameContainerStyle>
      )}

      {activeChapterId === SUMMARY && (
        <SummaryScreen
          increasePlayCount={increasePlayCount}
          playCount={playCount}
        />
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
  activeChapterId: PropTypes.string,
  activeChapterData: PropTypes.shape({
    showTitleBar: PropTypes.bool
  }),
  goToChapter: PropTypes.func,
  resetStateKit: PropTypes.func,
  resetStateTasks: PropTypes.func
};

const mapStateToProps = state => ({
  settings: state.settings,
  activeChapterId: getActiveChapterId(state),
  activeChapterData: getActiveChapterData(state)
});

const mapDispatchToProps = dispatch => ({
  goToChapter: bindActionCreators(_goToChapter, dispatch),
  resetStateKit: bindActionCreators(_resetStateKit, dispatch),
  resetStateTasks: bindActionCreators(_resetStateTasks, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Game));
