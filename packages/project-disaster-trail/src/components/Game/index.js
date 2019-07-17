/* eslint-disable import/no-named-as-default */
import React from "react";
import styled from "styled-components";

// import useChapters from "../../state/hooks/useChapters";

import KitScreen from "./KitScreen";
import Orb from "./Orb";
import OrbManager from "./OrbManager";
import DurationBar from "./DurationBar";

import "@hackoregon/component-library/assets/global.styles.css";

const Game = () => {
  // const { activeChapter } = useChapters();
  // console.log("activeChapter ", activeChapter);
  return (
    <GameContainerStyle>
      <MapStyle>
        <KitScreen />
      </MapStyle>
      <DurationBar step="Choose supplies" />
      <GUIStyle>
        {/* <Orb /> */}
        {/* <OrbManager count={10} /> */}
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
  height: 100vh;
  grid-template-rows: 1fr 50px 200px;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
`;

const MapStyle = styled(PanelStyle)`
  display: flex;
  flex-direction: column-reverse;
  background: beige;
  width: 100vw;
`;

const GUIStyle = styled(PanelStyle)`
  background: pink;
`;

export default Game;
