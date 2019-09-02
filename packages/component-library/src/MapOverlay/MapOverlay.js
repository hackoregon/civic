import React from "react";

import {
  shape,
  bool,
  number,
  func,
  node,
  oneOfType,
  arrayOf,
  string
} from "prop-types";

import DeckGL, { GeoJsonLayer } from "deck.gl";
import centerOfMass from "@turf/center-of-mass";

const MapOverlay = props => {
  const {
    id,
    viewport,
    children,
    data,
    pickable,
    opacity,
    filled,
    getFillColor,
    stroked,
    getLineColor,
    getLineWidth,
    extruded,
    getElevation,
    circleFieldName,
    getRadius,
    radiusScale,
    autoHighlight,
    highlightColor,
    onLayerClick,
    onHover,
    tooltipInfo,
    x,
    y
  } = props;

  const tooltip = React.Children.map(children, child => {
    return React.cloneElement(child, {
      tooltipInfo,
      x,
      y
    });
  });

  const tooltipRender = tooltipInfo && x && y ? tooltip : null;

  const centroidData = React.useMemo(() => {
    return circleFieldName
      ? data.map(d =>
          centerOfMass(d.geometry, { properties: { ...d.properties } })
        )
      : [];
  }, [circleFieldName, data]);

  const radius = circleFieldName
    ? f => Math.sqrt(+f.properties[circleFieldName])
    : getRadius || 10;

  return (
    <div>
      <DeckGL {...viewport} className="DeckGL" getCursor={() => "crosshair"}>
        <GeoJsonLayer
          id={id}
          className="GeoJSONMap"
          pickable={pickable}
          data={[...data, ...centroidData]}
          opacity={opacity}
          filled={filled}
          getFillColor={getFillColor}
          stroked={stroked}
          getLineColor={getLineColor}
          getLineWidth={getLineWidth}
          lineWidthMinPixels={1}
          extruded={extruded}
          getElevation={getElevation}
          circleFieldName={circleFieldName}
          getRadius={radius}
          pointRadiusScale={radiusScale}
          pointRadiusMinPixels={1}
          autoHighlight={autoHighlight}
          highlightColor={highlightColor}
          onClick={onLayerClick}
          onHover={onHover}
          updateTriggers={{
            getFillColor,
            getLineColor,
            getLineWidth,
            getRadius
          }}
        />
      </DeckGL>
      {tooltipRender}
    </div>
  );
};

MapOverlay.propTypes = {
  viewport: shape({}),
  children: node,
  id: string,
  data: arrayOf(shape({})).isRequired,
  pickable: bool,
  opacity: number,
  filled: bool,
  getFillColor: oneOfType([arrayOf(number), func]),
  stroked: bool,
  getLineColor: oneOfType([arrayOf(number), func]),
  getLineWidth: oneOfType([number, func]),
  extruded: bool,
  getElevation: oneOfType([number, func]),
  circleFieldName: string,
  getRadius: oneOfType([number, func]),
  radiusScale: number,
  autoHighlight: bool,
  highlightColor: arrayOf(number),
  onLayerClick: func,
  onHover: func,
  tooltipInfo: shape({}),
  x: number,
  y: number
};

MapOverlay.defaultProps = {
  pickable: true,
  opacity: 0.8,
  filled: true,
  getFillColor: [0, 0, 0],
  stroked: true,
  getLineColor: [112, 122, 122, 100],
  getLineWidth: 10,
  extruded: false,
  autoHighlight: false
};

export default MapOverlay;
