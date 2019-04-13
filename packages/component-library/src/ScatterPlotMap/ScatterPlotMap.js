import React from "react";
import PropTypes from "prop-types";
import DeckGL, { ScatterplotLayer } from "deck.gl";
import { css } from "emotion";

const crosshair = css`
  cursor: crosshair;
`;

const ScatterPlotMap = props => {
  const {
    viewport,
    data,
    getPosition,
    opacity,
    getColor,
    getRadius,
    radiusScale,
    outline,
    strokeWidth,
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

  const tooltipRender = tooltipInfo ? tooltip : null;

  return (
    <div className={crosshair}>
      <DeckGL className="DeckGL" {...viewport}>
        <ScatterplotLayer
          className="ScatterPlotMap"
          id="scatterplot-layer"
          pickable
          data={data}
          getPosition={getPosition}
          opacity={opacity}
          getColor={getColor}
          getRadius={getRadius}
          radiusScale={radiusScale}
          radiusMinPixels={1}
          outline={outline}
          strokeWidth={strokeWidth}
          autoHighlight={autoHighlight}
          highlightColor={highlightColor}
          onClick={onLayerClick}
          parameters={{ depthTest: false }}
          visible={visible}
          updateTriggers={{ instanceColors: getColor }}
          onHover={onHover}
        />
        {tooltipRender}
      </DeckGL>
    </div>
  );
};

ScatterPlotMap.propTypes = {
  viewport: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPosition: PropTypes.func,
  opacity: PropTypes.number,
  getColor: PropTypes.func,
  getRadius: PropTypes.func,
  radiusScale: PropTypes.number,
  outline: PropTypes.bool,
  strokeWidth: PropTypes.number,
  autoHighlight: PropTypes.bool,
  highlightColor: PropTypes.array,
  onLayerClick: PropTypes.func,
  visible: PropTypes.bool,
  tooltipInfo: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  onHover: PropTypes.func,
  children: PropTypes.node
};

ScatterPlotMap.defaultProps = {
  getPosition: d => d.geometry.coordinates,
  opacity: 0.8,
  getColor: () => [0, 0, 0],
  getRadius: () => 50,
  radiusScale: 1,
  outline: false,
  strokeWidth: 1,
  visible: true,
  highlightColor: [0, 255, 0, 255]
};

export default ScatterPlotMap;
