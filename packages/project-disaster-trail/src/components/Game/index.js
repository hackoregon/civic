/* eslint-disable import/no-named-as-default */
import React, { Fragment, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import * as SCREENS from "../../constants/screens";
import { getActiveChapter, setActiveChapter } from "../../state/chapters";

import KitScreen from "./KitScreen";
// import Orb from "./Orb";
import OrbManager from "./OrbManager";
import PointsView from "../atoms/PointsView";
import DurationBar from "./DurationBar";

import "@hackoregon/component-library/assets/global.styles.css";

const Game = ({ settings, activeChapter, goToChapter }) => {
  const { screen } = settings;

  const defaultScreen = chapterTitle => (
    <Fragment>
      <MapStyle />
      <h1>{chapterTitle} screen</h1>
      <GUIStyle screen={screen} />
    </Fragment>
  );

  const kitScreen = (
    <Fragment>
      <MapStyle>
        <PointsViewStyle />
        <KitScreen />
      </MapStyle>
      <DurationBar step="Choose supplies" />
      <GUIStyle screen={settings.screen}>
        {/* <Orb size={50} /> */}
        <OrbManager
          {...settings}
          interfaceHeight={props => props.screen.interfaceHeight}
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
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => {
          goToChapter(activeChapter.id + 1);
        }}
      >
        →
      </button>
    </ChapterButtonsStyle>
  );

  return (
    <GameContainerStyle screen={settings.screen}>
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
  overflow: hidden;
`;

// Temporarily hardcode the height of the DurationBar and temporary chapter buttons
const GameContainerStyle = styled(PanelStyle)`
  position: relative;
  display: grid;
  overflow: hidden;
  height: 100vh;
  min-height: 650px;
  min-width: 800px;
  grid-template-rows: 100px 1fr 40px ${props => props.screen.interfaceHeight}px;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;

  @media (min-height: ${props => props.screen.height}px) {
    grid-template-rows: 1fr ${props => props.screen.interfaceHeight}px;
  }
`;

const MapStyle = styled(PanelStyle)`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  background: beige;
  width: 100vw;
`;

const GUIStyle = styled(PanelStyle)`
  background: pink;
  height: ${props => props.screen.interfaceHeight}px;

  @media (min-height: ${SCREENS.XL.height}px) {
    height: ${props => props.screen.interfaceHeight}px;
  }
`;

const PointsViewStyle = styled(PointsView)`
  position: absolute;
  top: 0;
  right: 0;
  border: 10px solid red;
  z-index: 1;
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
    settings: state.settings,
    activeChapter: getActiveChapter(state)
  }),
  dispatch => ({
    goToChapter(chapter) {
      dispatch(setActiveChapter(chapter));
    }
  })
)(memo(Game));
