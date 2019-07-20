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
    getRadius,
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

  return (
    <div>
      <DeckGL {...viewport} className="DeckGL" getCursor={() => "crosshair"}>
        <GeoJsonLayer
          id={id}
          className="GeoJSONMap"
          pickable={pickable}
          data={data}
          opacity={opacity}
          filled={filled}
          getFillColor={getFillColor}
          stroked={stroked}
          getLineColor={getLineColor}
          getLineWidth={getLineWidth}
          lineWidthMinPixels={1}
          extruded={extruded}
          getElevation={getElevation}
          getRadius={getRadius}
          autoHighlight={autoHighlight}
          highlightColor={highlightColor}
          onClick={onLayerClick}
          onHover={onHover}
          updateTriggers={{
            getFillColor,
            getLineColor,
            getLineWidth
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
  data: oneOfType([shape({}), arrayOf(shape({}))]).isRequired,
  pickable: bool,
  opacity: number,
  filled: bool,
  getFillColor: oneOfType([arrayOf(number), func]),
  stroked: bool,
  getLineColor: oneOfType([arrayOf(number), func]),
  getLineWidth: oneOfType([number, func]),
  extruded: bool,
  getElevation: oneOfType([number, func]),
  getRadius: oneOfType([number, func]),
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
