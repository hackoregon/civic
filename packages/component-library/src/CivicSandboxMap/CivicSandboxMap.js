/* TODO: Fix linting errors */
/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import DeckGL, {
  IconLayer,
  PathLayer,
  PolygonLayer,
  ScatterplotLayer,
  ScreenGridLayer
} from "deck.gl";
import { css } from "emotion";
import { scaleQuantize, scaleOrdinal, scaleThreshold, extent } from "d3";

const crosshair = css`
  cursor: crosshair;
`;

const CivicSandboxMap = props => {
  const { viewport, mapLayers, children, onClick, onHoverSlide } = props;

  const createPathMap = (slide, index) => (
    <PathLayer
      key={index}
      id={slide.data.id}
      pickable={slide.data.pickable}
      data={slide.data.data}
      getColor={slide.data.getColor}
      opacity={slide.data.opacity}
      getPath={slide.data.getPath}
      getWidth={slide.data.getWidth}
      widthScale={slide.data.widthScale}
      widthMinPixels={1}
      rounded={slide.data.rounded}
      autoHighlight={slide.data.autoHighlight}
      highlightColor={slide.data.highlightColor}
      onHover={onHoverSlide}
      parameters={{ depthTest: false }}
    />
  );

  const createScatterPlotMap = (slide, index) => (
    <ScatterplotLayer
      key={index}
      id={slide.data.id}
      pickable={slide.data.pickable}
      data={slide.data.data}
      getPosition={slide.data.getPosition}
      opacity={slide.data.opacity}
      getColor={slide.data.getColor}
      getRadius={slide.data.getRadius}
      radiusScale={slide.data.radiusScale}
      autoHighlight={slide.data.autoHighlight}
      highlightColor={slide.data.highlightColor}
      onHover={onHoverSlide}
      parameters={{ depthTest: false }}
    />
  );

  const createIconMap = (slide, index) => (
    <IconLayer
      key={index}
      id={slide.data.id}
      pickable={slide.data.pickable}
      data={slide.data.data}
      opacity={slide.data.opacity}
      iconAtlas={slide.data.iconAtlas}
      iconMapping={slide.data.iconMapping}
      sizeScale={slide.data.sizeScale(viewport.zoom)}
      getPosition={slide.data.getPosition}
      getIcon={slide.data.getIcon}
      getSize={slide.data.getSize}
      getColor={slide.data.getColor}
      autoHighlight={slide.data.autoHighlight}
      highlightColor={slide.data.highlightColor}
      onHover={onHoverSlide}
      parameters={{ depthTest: false }}
    />
  );

  const createScreenGridMap = (slide, index) => (
    <ScreenGridLayer
      key={index}
      id={slide.data.id}
      pickable={slide.data.pickable}
      data={slide.data.data}
      getPosition={slide.data.getPosition}
      opacity={slide.data.opacity}
      colorRange={slide.data.colorRange}
      cellSizePixels={slide.data.cellSizePixels}
      autoHighlight={slide.data.autoHighlight}
      highlightColor={slide.data.highlightColor}
      updateTriggers={{ instanceColors: slide.data || {} }}
    />
  );

  const createPolygonMap = (slide, index) => (
    <PolygonLayer
      key={index}
      id={slide.data.id}
      pickable={slide.data.pickable}
      data={slide.data.data}
      opacity={slide.data.opacity}
      getPolygon={slide.data.getPolygon}
      getLineColor={slide.data.getLineColor}
      getLineWidth={slide.data.getLineWidth}
      lineWidthMinPixels={1}
      stroked={slide.data.stroked}
      getFillColor={slide.data.getFillColor}
      filled={slide.data.filled}
      onHover={onHoverSlide}
      autoHighlight={slide.data.autoHighlight}
      highlightColor={slide.data.highlightColor}
      parameters={{ depthTest: false }}
    />
  );

  const createEqualBins = (data, color, getPropValue) => {
    const quantizeScale = scaleQuantize()
      .domain(extent(data, getPropValue))
      .range(color)
      .nice();
    return quantizeScale;
  };

  const createDiscreteBins = (categories, color) => {
    const ordinalScale = scaleOrdinal()
      .domain(categories)
      .range(color)
      .unknown([0, 0, 0, 0]);
    return ordinalScale;
  };

  const createThresholdBins = (categories, color) => {
    const thresholdScale = scaleThreshold()
      .domain(categories)
      .range(color);
    return thresholdScale;
  };

  const createChoroplethMap = (slide, index) => {
    const scale =
      slide.data.scaleType === "ordinal"
        ? createDiscreteBins(slide.data.categories, slide.data.color)
        : slide.data.scaleType === "threshold"
        ? createThresholdBins(slide.data.categories, slide.data.color)
        : createEqualBins(
            slide.data.data,
            slide.data.color,
            slide.data.getPropValue
          );

    const getFillColor = f => {
      const value =
        slide.data.scaleType === "ordinal"
          ? f.properties[slide.data.propName]
          : parseFloat(f.properties[slide.data.propName]);
      return scale(value) ? scale(value) : [0, 0, 0, 0];
    };

    return (
      <PolygonLayer
        key={index}
        id={slide.data.id}
        pickable={slide.data.pickable}
        data={slide.data.data}
        opacity={slide.data.opacity}
        getPolygon={slide.data.getPolygon}
        getLineColor={slide.data.getLineColor}
        getLineWidth={slide.data.getLineWidth}
        lineWidthMinPixels={1}
        stroked={slide.data.stroked}
        getFillColor={getFillColor}
        filled={slide.data.filled}
        onClick={onClick || slide.data.onLayerClick}
        autoHighlight={slide.data.autoHighlight}
        highlightColor={slide.data.highlightColor}
        parameters={{ depthTest: false }}
        updateTriggers={
          slide.data.updateTriggers || { instancePickingColors: getFillColor }
        }
      />
    );
  };

  const renderMaps = mapLayers.map((layer, index) => {
    return layer.data.mapType === "PathMap"
      ? createPathMap(layer, index)
      : layer.data.mapType === "ScatterPlotMap"
      ? createScatterPlotMap(layer, index)
      : layer.data.mapType === "IconMap"
      ? createIconMap(layer, index)
      : layer.data.mapType === "ScreenGridMap"
      ? createScreenGridMap(layer, index)
      : layer.data.mapType === "PolygonPlotMap" ||
        layer.data.mapType === "SmallPolygonMap"
      ? createPolygonMap(layer, index)
      : layer.data.mapType === "ChoroplethMap"
      ? createChoroplethMap(layer, index)
      : null;
  });

  return (
    <div className={crosshair}>
      <DeckGL className="DeckGL" {...viewport}>
        {renderMaps}
        {children}
      </DeckGL>
    </div>
  );
};

CivicSandboxMap.propTypes = {
  viewport: PropTypes.shape({}),
  mapLayers: PropTypes.array.isRequired,
  onHoverSlide: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default CivicSandboxMap;
