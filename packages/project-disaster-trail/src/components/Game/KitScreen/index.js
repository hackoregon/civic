import React from "react";
import DurationBar from "../../atoms/DurationBar";
import PointsView from "../../atoms/PointsView";
import { MapStyle, GUIStyle } from "../index";
import OrbManager from "../OrbManager";
import Kit from "./Kit";

const KitScreen = () => (
  <>
    <MapStyle>
      <Kit />
      <PointsView />
    </MapStyle>
    <DurationBar step="Choose supplies" />
    <GUIStyle>
      <OrbManager />
    </GUIStyle>
  </>
);

export default KitScreen;
