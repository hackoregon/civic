/* eslint-disable import/no-named-as-default */
import React from "react";
import Orb from "./Orb";
import OrbManager from "./OrbManager";

import "@hackoregon/component-library/assets/global.styles.css";

const Game = () => (
  <div>
    <h1>This is the game</h1>
    <Orb />
    <OrbManager count={10} />
  </div>
);

Game.displayName = "Game";

export default Game;
