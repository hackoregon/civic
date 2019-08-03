import React, { memo } from "react";

import { MapStyle, GUIStyle } from "../index";
import DurationBar from "../../atoms/DurationBar";
import Kit from "./Kit";
import PointsView from "../../atoms/PointsView";
import OrbManager from "../OrbManager";

const KitScreen = () => {
  return (
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
};

export default memo(KitScreen);
