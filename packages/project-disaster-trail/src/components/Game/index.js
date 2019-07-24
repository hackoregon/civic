/* eslint-disable import/no-named-as-default */
import React, { memo } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

// import useChapters from "../../state/hooks/useChapters";

import * as SCREENS from "../../constants/screens";
import KitScreen from "./KitScreen";
// import Orb from "./Orb";
import OrbManager from "./OrbManager";
import PointsView from "../atoms/PointsView";
import DurationBar from "./DurationBar";

import "@hackoregon/component-library/assets/global.styles.css";

const Game = ({ settings }) => {
  return (
    <GameContainerStyle screen={settings.screen}>
      <MapStyle>
        <PointsViewStyle />
        <KitScreen />
      </MapStyle>
      <DurationBar step="Choose supplies" />
      <GUIStyle screen={settings.screen}>
        {/* <Orb size={50} /> */}
        <OrbManager
          {...settings}
          interfaceHeight={settings.screen.interfaceHeight}
        />
      </GUIStyle>
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

const GameContainerStyle = styled(PanelStyle)`
  position: relative;
  display: grid;
  overflow: hidden;
  height: 100vh;
  min-height: 650px;
  min-width: 800px;
  grid-template-rows: 1fr 40px ${props => props.screen.interfaceHeight}px;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;

  @media (min-height: ${SCREENS.XL.height}px) {
    grid-template-rows: 1fr ${SCREENS.XL.interfaceHeight}px;
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
    height: ${SCREENS.XL.interfaceHeight}px;
  }
`;

const PointsViewStyle = styled(PointsView)`
  position: absolute;
  top: 0;
  right: 0;
  border: 10px solid red;
  z-index: 1;
`;

const mapStateToProps = ({ settings }) => ({ settings });

export default connect(mapStateToProps)(Game);
