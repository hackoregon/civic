/* eslint-disable import/no-named-as-default */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import { getActiveChapter, setActiveChapter } from "../../state/chapters";
import KitScreen from "./KitScreen";
// import Orb from "./Orb";
import OrbManager from "./OrbManager";
import DurationBar from "./DurationBar";

import "@hackoregon/component-library/assets/global.styles.css";

const XLScreen = {
  height: 1800,
  interfaceHeight: 700
};

const desktopScreen = {
  interfaceHeight: 250
};

const Game = ({ activeChapter, goToChapter }) => {
  let ratios = XLScreen;
  if (window.innerHeight < XLScreen.height) {
    ratios = desktopScreen;
  }

  const defaultScreen = chapterTitle => (
    <Fragment>
      <MapStyle />
      <h1>{chapterTitle} screen</h1>
      <GUIStyle />
    </Fragment>
  );

  const kitScreen = (
    <Fragment>
      <MapStyle>
        <KitScreen />
      </MapStyle>
      <DurationBar step="Choose supplies" />
      <GUIStyle>
        {/* <Orb size={50} /> */}
        <OrbManager
          orbCount={10}
          orbSize={50}
          period={0.2}
          velocityX={-0.75}
          velocityY={0}
          minVelocityX={-0.2}
          minVelocityY={0.1}
          ratios={ratios}
        />
      </GUIStyle>
    </Fragment>
  );

  const chapterButtons = (
    <ChapterButtonsStyle>
      <button
        type="button"
        onClick={() => {
          goToChapter(activeChapter.id - 1);
        }}
        onTouchStart={() => {
          goToChapter(activeChapter.id - 1);
        }}
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => {
          goToChapter(activeChapter.id + 1);
        }}
        onTouchStart={() => {
          goToChapter(activeChapter.id + 1);
        }}
      >
        →
      </button>
    </ChapterButtonsStyle>
  );

  return (
    <GameContainerStyle>
      {chapterButtons}
      {activeChapter.id === 2 && kitScreen}
      {activeChapter.id !== 2 && defaultScreen(activeChapter.title)}
    </GameContainerStyle>
  );
};

Game.displayName = "Game";

const PanelStyle = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  background: white;
`;

// Temporarily hardcode the height of the DurationBar and temporary chapter buttons
const GameContainerStyle = styled(PanelStyle)`
  display: grid;
  overflow: hidden;
  height: 100vh;
  min-height: 650px;
  min-width: 800px;
  grid-template-rows: 100px 1fr 40px ${desktopScreen.interfaceHeight}px;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;

  @media (min-height: ${XLScreen.height}px) {
    grid-template-rows: 1fr ${XLScreen.interfaceHeight}px;
  }
`;

const MapStyle = styled(PanelStyle)`
  display: flex;
  flex-direction: column-reverse;
  background: beige;
  width: 100vw;
`;

const GUIStyle = styled(PanelStyle)`
  background: pink;
  height: ${desktopScreen.interfaceHeight}px;

  @media (min-height: ${XLScreen.height}px) {
    height: ${XLScreen.interfaceHeight}px;
  }
`;

const ChapterButtonsStyle = styled(PanelStyle)`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;

  > button {
    font-size: 80px;
  }
`;

Game.propTypes = {
  activeChapter: PropTypes.shape({
    enabled: PropTypes.bool,
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string
  }),
  goToChapter: PropTypes.func
};

export default connect(
  state => ({
    activeChapter: getActiveChapter(state)
  }),
  dispatch => ({
    goToChapter(chapter) {
      dispatch(setActiveChapter(chapter));
    }
  })
)(Game);
