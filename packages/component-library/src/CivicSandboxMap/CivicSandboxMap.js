import React from 'react';
import PropTypes from 'prop-types';
import DeckGL, {
  IconLayer,
  PathLayer,
  PolygonLayer,
  ScatterplotLayer,
  ScreenGridLayer,
} from 'deck.gl';
import { css } from 'emotion';

const crosshair = css`
  cursor: crosshair;
`;

const CivicSandboxMap = props => {
  const { viewport, mapLayers, children, onClick, onHoverSlide } = props;

  const renderMaps = mapLayers.map((layer, index) => {
    return layer.data.mapType === 'PathMap' ? (
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
        onHover={onHoverSlide}
        parameters={{ depthTest: false }}
      />
    ) : layer.data.mapType === 'ScatterPlotMap' ? (
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
        autoHighlight={layer.data.autoHighlight}
        highlightColor={layer.data.highlightColor}
        onHover={onHoverSlide}
        parameters={{ depthTest: false }}
      />
    ) : layer.data.mapType === 'IconMap' ? (
      <IconLayer
        key={index}
        id={layer.data.id}
        pickable={layer.data.pickable}
        data={layer.data.data}
        opacity={layer.data.opacity}
        iconAtlas={layer.data.iconAtlas}
        iconMapping={layer.data.iconMapping}
        sizeScale={layer.data.sizeScale(viewport.zoom)}
        getPosition={layer.data.getPosition}
        getIcon={layer.data.getIcon}
        getSize={layer.data.getSize}
        getColor={layer.data.getColor}
        autoHighlight={layer.data.autoHighlight}
        highlightColor={layer.data.highlightColor}
        onHover={onHoverSlide}
        parameters={{ depthTest: false }}
      />
    ) : layer.data.mapType === 'ScreenGridMap' ? (
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
        highlightColor={layer.data.highlightColor}
        updateTriggers={{ instanceColors: layer.data || {} }}
      />
    ) : layer.data.mapType === 'PolygonPlotMap' ||
      layer.data.mapType === 'SmallPolygonMap' ? (
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
        onHover={onHoverSlide}
        autoHighlight={layer.data.autoHighlight}
        highlightColor={layer.data.highlightColor}
        parameters={{ depthTest: false }}
      />
    ) : layer.data.mapType === 'ChoroplethMap' ? (
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
        onClick={onClick}
        autoHighlight={layer.data.autoHighlight}
        highlightColor={layer.data.highlightColor}
        parameters={{ depthTest: false }}
        updateTriggers={layer.data.updateTriggers || {}}
      />
    ) : null;
  });

  return (
    <div className={crosshair}>
      <DeckGL className={'DeckGL'} {...viewport}>
        {renderMaps}
        {children}
      </DeckGL>
    </div>
  );
};

CivicSandboxMap.propTypes = {
  viewport: PropTypes.object,
  mapLayers: PropTypes.array.isRequired,
  onHoverSlide: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

CivicSandboxMap.defaultProps = {};

export default CivicSandboxMap;
