import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { BaseMap, ComparisonMap } from "@hackoregon/component-library";

const baseMapProps = {
  updateViewport: false,
  initialZoom: 14.5,
  initialLatitude: 45.512,
  initialLongitude: -122.659
  // mapboxDataId:"transit-stops-data",
  // mapboxLayerType:"heatmap",
  // mapboxData:someKindofData.results,
  // mapboxDataId:"transit-stops-data",
  // mapboxLayerType:"heatmap",
  // mapboxLayerOptions:heatmapLayer,
  // mapboxLayerId:"transit-stops-map",
  // civicMapStyle:"dark",
  // navigation:false,
  // mapGLOptions:mapGLOptions,
};

const DisturbanceStopsVisualization = ({ data }) => {
  const isLoading = !isLoaded(data.disturbanceStops);

  const DisturbanceStopsMap2017 = <BaseMap {...baseMapProps} />;

  const DisturbanceStopsMap2018 = <BaseMap {...baseMapProps} />;

  return (
    <>
      {!isLoading && data && (
        <ComparisonMap
          leftMap={DisturbanceStopsMap2017}
          rightMap={DisturbanceStopsMap2018}
        />
      )}
    </>
  );
};

DisturbanceStopsVisualization.propTypes = {
  data: PropTypes.shape({ disturbanceStops: resourceShape })
};

export default DisturbanceStopsVisualization;
