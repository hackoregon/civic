import React from "react";
import DurationBar from "../../atoms/DurationBar";
import Ticker from "../../atoms/Ticker";
import { MapStyle, GUIStyle } from "../index";
import OrbManager from "../OrbManager";
import Kit from "./Kit";

const KitScreen = () => (
  <>
    <MapStyle>
      <Kit />
    </MapStyle>
    <DurationBar step="Choose supplies" />
    <Ticker text="Ticker tape text that goes across the screen to give instructions" />
    <GUIStyle>
      <OrbManager />
    </GUIStyle>
  </>
);

export default KitScreen;
