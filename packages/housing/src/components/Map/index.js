import React from "react";
import PropTypes from "prop-types";
import { BaseMap, MapOverlay } from "@hackoregon/component-library";
import {
  AFFORDABLE_YOU_COLOR,
  AFFORDABLE_OTHER_COLOR,
  AFFORDABLE_BOTH_COLOR,
  AFFORDABLE_NEITHER_COLOR
} from "../../utils/data-constants";

// Four possible colors
// 1. Both can afford
// 2. You can afford
// 3. They can afford
// 4. Neither can afford
const getNeighborhoodColor = ({ affordableYou, affordableOther }) => {
  if (affordableYou) {
    return affordableOther ? AFFORDABLE_BOTH_COLOR : AFFORDABLE_YOU_COLOR;
  }
  return affordableOther ? AFFORDABLE_OTHER_COLOR : AFFORDABLE_NEITHER_COLOR;
};

const asLine = feature => {
  if (!feature || !feature.geoetry) return feature;
  const copy = { ...feature };
  copy.geometry.type = "LineString";
  return copy;
};

const Map = ({ neighborhoodData, activeNeighborhood, onSelect }) => {
  return (
    <BaseMap initialZoom={9.8}>
      <MapOverlay
        filled
        stroked
        data={neighborhoodData}
        opacity={0.4}
        getPosition={f => f.geometry.coordinates}
        getFillColor={getNeighborhoodColor}
        getLineColor={() => [255, 255, 255]}
        getRadius={10}
        getLineWidth={4}
      />
      <MapOverlay
        visible={!!activeNeighborhood}
        id="selected-neighborhood"
        stroked
        pickable={false}
        data={{
          features: [asLine(activeNeighborhood)],
          type: "FeatureCollection"
        }}
        opacity={1}
        getPosition={f => f.geometry.coordinates}
        getLineColor={() => [238, 73, 92]}
        getLineWidth={8}
      />
      <MapOverlay
        id="interaction-layer"
        filled
        stroked
        data={neighborhoodData}
        opacity={0.0}
        getPosition={f => f.geometry.coordinates}
        getFillColor={() => [255, 255, 255]}
        getLineColor={() => [255, 255, 255]}
        getRadius={10}
        getLineWidth={4}
        onLayerClick={onSelect}
      />
    </BaseMap>
  );
};

Map.propTypes = {
  neighborhoodData: PropTypes.arrayOf(PropTypes.object),
  activeNeighborhood: PropTypes.object,
  onSelect: PropTypes.func
};

export default Map;
