import React from 'react';
import PropTypes from 'prop-types';
import DeckGL, { IconLayer, PathLayer, PolygonLayer, ScatterplotLayer, ScreenGridLayer } from 'deck.gl';
import { css } from 'emotion';

const crosshair = css`
  cursor: crosshair;
`;

const CivicSandboxMap = (props) => {
  const {
    viewport,
    mapLayers,
    tooltipInfo,
    x,
    y,
    onHover,
    children,
  } = props;

  const renderMaps = mapLayers.map((layer, index) => {
    return layer.data.mapType === "PathMap" ? (
      <PathLayer
        key={index}
        id={layer.data.id}
        pickable={layer.data.pickable}
        data={layer.data.data}
        getColor={layer.data.getColor}
        opacity={layer.data.opacity}
        getPath={layer.data.getPath}
        getWidth={layer.data.getWidth}
        widthScale={layer.data.widthScale}
        widthMinPixels={1}
        rounded={layer.data.rounded}
        autoHighlight={layer.data.autoHighlight}
        highlightColor={layer.data.highlightColor}
        onClick={layer.data.onClick}
        onHover={onHover}
        parameters={{depthTest: false}}
      />
      ) : layer.data.mapType === "ScatterPlotMap" ? (
      <ScatterplotLayer
        key={index}
        id={layer.data.id}
        pickable={layer.data.pickable}
        data={layer.data.data}
        getPosition={layer.data.getPosition}
        opacity={layer.data.opacity}
        getColor={layer.data.getColor}
        getRadius={layer.data.getRadius}
        radiusScale={layer.data.radiusScale}
        radiusMinPixels={layer.data.radiusMinPixels}
        autoHighlight={layer.data.autoHighlight}
        onClick={layer.data.onClick}
        onHover={onHover}
        parameters={{depthTest: false}}
        highlightColor={layer.data.highlightColor}
      />
      ) : layer.data.mapType === "IconMap" ? (
      <IconLayer
        key={index}
        id={layer.data.id}
        pickable={layer.data.pickable}
        data={layer.data.data}
        opacity={layer.data.opacity}
        iconAtlas={layer.data.iconAtlas}
        iconMapping={layer.data.iconMapping}
        sizeScale={layer.data.sizeScale}
        getPosition={layer.data.getPosition}
        getIcon={layer.data.getIcon}
        getSize={layer.data.getSize}
        getColor={layer.data.getColor}
        autoHighlight={layer.data.autoHighlight}
        onClick={layer.data.onClick}
        onHover={onHover}
        updateTriggers={layer.data.updateTriggers}
      />
      ) : layer.data.mapType === "ScreenGridMap" ? (
      <ScreenGridLayer
        key={index}
        id={layer.data.id}
        pickable={layer.data.pickable}
        data={layer.data.data}
        getPosition={layer.data.getPosition}
        opacity={layer.data.opacity}
        colorRange={layer.data.colorRange}
        cellSizePixels={layer.data.cellSizePixels}
        autoHighlight={layer.data.autoHighlight}
        onClick={layer.data.onClick}
      />
      ) : layer.data.mapType === "ChoroplethMap" || 
          layer.data.mapType === "PolygonPlotMap" || 
          layer.data.mapType === "SmallPolygonMap" ? (
      <PolygonLayer
        key={index}
        id={layer.data.id}
        pickable={layer.data.pickable}
        data={layer.data.data}
        opacity={layer.data.opacity}
        getPolygon={layer.data.getPolygon}
        getLineColor={layer.data.getLineColor}
        getLineWidth={layer.data.getLineWidth}
        lineWidthMinPixels={1}
        stroked={layer.data.stroked}
        getFillColor={layer.data.getFillColor}
        filled={layer.data.filled}
        onClick={layer.data.onClick}
        onHover={onHover}
        autoHighlight={layer.data.autoHighlight}
        highlightColor={layer.data.highlightColor}
        parameters={{depthTest: false}}
      />
      ) : null;
  });

  const tooltip = React.Children.map(children, child => {
    return React.cloneElement(child, {
      tooltipInfo,
      x,
      y,
    });
  });

  const tooltipRender = tooltipInfo ? tooltip : null;

  return (
    <div className={crosshair}>
      <DeckGL
        className={'DeckGL'}
        {...viewport}
      >
        { renderMaps }
        { tooltipRender }
      </DeckGL>
    </div>
  );
};

CivicSandboxMap.propTypes = {
  viewport: PropTypes.object,
  mapLayers: PropTypes.array.isRequired,
  tooltipInfo: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  onHover: PropTypes.func,
  children: PropTypes.node,
};

CivicSandboxMap.defaultProps = {
};

export default CivicSandboxMap;
