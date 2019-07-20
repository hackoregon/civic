import React from "react";
import PropTypes from "prop-types";
import DeckGL, { ScatterplotLayer } from "deck.gl";

const ScatterPlotMap = props => {
  const {
    stroked,
    getLineWidth,
    getFillColor,
    getLineColor,
    viewport,
    data,
    getPosition,
    opacity,
    getRadius,
    radiusScale,
    autoHighlight,
    highlightColor,
    onLayerClick,
    visible,
    tooltipInfo,
    x,
    y,
    onHover,
    children
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
      <DeckGL className="DeckGL" {...viewport} getCursor={() => "crosshair"}>
        <ScatterplotLayer
          className="ScatterPlotMap"
          id="scatterplot-layer"
          pickable
          data={data}
          getPosition={getPosition}
          opacity={opacity}
          getRadius={getRadius}
          radiusScale={radiusScale}
          radiusMinPixels={1}
          autoHighlight={autoHighlight}
          highlightColor={highlightColor}
          onClick={onLayerClick}
          parameters={{ depthTest: false }}
          visible={visible}
          onHover={onHover}
          stroked={stroked}
          getLineColor={getLineColor}
          getLineWidth={getLineWidth}
          getFillColor={getFillColor}
          updateTriggers={{ getRadius }}
        />
      </DeckGL>
      {tooltipRender}
    </div>
  );
};

ScatterPlotMap.propTypes = {
  viewport: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getPosition: PropTypes.func,
  opacity: PropTypes.number,
  getRadius: PropTypes.func,
  radiusScale: PropTypes.number,
  autoHighlight: PropTypes.bool,
  highlightColor: PropTypes.arrayOf(PropTypes.number),
  onLayerClick: PropTypes.func,
  visible: PropTypes.bool,
  tooltipInfo: PropTypes.shape({}),
  x: PropTypes.number,
  y: PropTypes.number,
  onHover: PropTypes.func,
  children: PropTypes.node,
  stroked: PropTypes.bool,
  getLineColor: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  getLineWidth: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  getFillColor: PropTypes.oneOfType([PropTypes.func, PropTypes.array])
};

ScatterPlotMap.defaultProps = {
  getPosition: d => d.geometry.coordinates,
  opacity: 0.8,
  getRadius: () => 50,
  radiusScale: 1,
  visible: true,
  highlightColor: [0, 255, 0, 255],
  stroked: false,
  getLineColor: () => [0, 0, 0],
  getLineWidth: () => 1,
  getFillColor: () => [0, 0, 0]
};

export default ScatterPlotMap;
