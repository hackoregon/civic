/* eslint-disable import/no-named-as-default */
import React from "react";
import styled from "styled-components";

// import useChapters from "../../state/hooks/useChapters";

import KitScreen from "./KitScreen";
import Orb from "./Orb";
import OrbManager from "./OrbManager";

import "@hackoregon/component-library/assets/global.styles.css";

const XLScreen = {
  height: 1800,
  interfaceHeight: 700
};

const desktopScreen = {
  interfaceHeight: 250
};

const Game = () => {
  let ratios = XLScreen;
  if (window.innerHeight < XLScreen.height) {
    ratios = desktopScreen;
  }

  return (
    <GameContainerStyle>
      <MapStyle>
        <KitScreen />
      </MapStyle>
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

const GameContainerStyle = styled(PanelStyle)`
  display: grid;
  overflow: hidden;
  height: 100vh;
  min-height: 650px;
  min-width: 800px;
  grid-template-rows: 1fr ${desktopScreen.interfaceHeight}px;
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

export default Game;
