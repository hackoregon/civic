/* eslint-disable import/no-named-as-default */
import React from "react";
import OrbManager from "./OrbManager";

import "@hackoregon/component-library/assets/global.styles.css";

const Game = () => (
  <div>
    <h1>This is the game</h1>
    <OrbManager count={10} />
  </div>
);

Game.displayName = "Game";

export default Game;
