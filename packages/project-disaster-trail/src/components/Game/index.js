/* eslint-disable import/no-named-as-default */
import React, { Fragment, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import * as SCREENS from "../../constants/screens";
import { getActiveChapter } from "../../state/chapters";

import ChapterButtons from "./ChapterButtons";
import KitScreen from "./KitScreen";
import TaskScreen from "./TaskScreen/index";
// import Orb from "./Orb";
import OrbManager from "./OrbManager";
import PointsView from "../atoms/PointsView";
import DurationBar from "./DurationBar";

import "@hackoregon/component-library/assets/global.styles.css";

const Game = ({ settings, activeChapter }) => {
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
        <KitScreen />
        <PointsViewStyle />
      </MapStyle>
      <DurationBar step="Choose supplies" />
      <GUIStyle screen={screen}>
        {/* <Orb size={50} /> */}
        <OrbManager {...settings} interfaceHeight={screen.interfaceHeight} />
      </GUIStyle>
    </Fragment>
  );

  return (
    <Fragment>
      {activeChapter.id === 6 && (
        <TaskScreen interfaceHeight={screen.interfaceHeight} />
      )}
      {activeChapter.id !== 6 && (
        <GameContainerStyle screen={screen}>
          <ChapterButtons />
          {activeChapter.id === 2 && kitScreen}
          {activeChapter.id !== 2 &&
            activeChapter.id !== 6 &&
            defaultScreen(activeChapter.title)}
        </GameContainerStyle>
      )}
    </Fragment>
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
`;

const MapStyle = styled(PanelStyle)`
  position: relative;
  display: grid;
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

Game.propTypes = {
  settings: PropTypes.shape({
    orbCount: PropTypes.number,
    orbSize: PropTypes.number,
    period: PropTypes.number,
    minVelocityX: PropTypes.number,
    maxVelocityX: PropTypes.number,
    minVelocityY: PropTypes.number,
    maxVelocityY: PropTypes.number,
    mode: PropTypes.string,
    screen: PropTypes.shape({
      label: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      interfaceHeight: PropTypes.number
    })
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
