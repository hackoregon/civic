/* TODO: Fix linting errors */
/* eslint-disable */
import React from "react";
import { arrayOf, shape, func, node, number } from "prop-types";
import DeckGL, {
  IconLayer,
  PathLayer,
  PolygonLayer,
  ScatterplotLayer,
  ScreenGridLayer
} from "deck.gl";
import { scaleQuantize, scaleOrdinal, scaleThreshold, extent } from "d3";

const CivicSandboxMap = props => {
  const {
    viewport,
    mapLayers,
    children,
    onClick,
    onHoverSlide,
    selectedFoundationDatum
  } = props;

  const getDefaultPosition = f => f.geometry.coordinates;
  const getDefaultBoundaryPolygon = f => f.coordinates;

  const highlighterYellow = [255, 255, 0, 200];

  const createPathMap = (slide, index) => (
    <PathLayer
      key={index}
      id={slide.data.id}
      pickable={slide.data.pickable || true}
      data={slide.data.data}
      getColor={slide.data.getColor}
      opacity={slide.data.opacity || 0.9}
      getPath={slide.data.getPath || getDefaultPosition}
      getWidth={slide.data.getWidth}
      widthScale={slide.data.widthScale}
      widthMinPixels={1}
      rounded={slide.data.rounded || false}
      autoHighlight={slide.data.autoHighlight || true}
      highlightColor={slide.data.highlightColor || highlighterYellow}
      onHover={onHoverSlide}
      parameters={{ depthTest: false }}
    />
  );

  const createScatterPlotMap = (slide, index) => (
    <ScatterplotLayer
      key={index}
      id={slide.data.id}
      pickable={slide.data.pickable || true}
      data={slide.data.data}
      getPosition={slide.data.getPosition || getDefaultPosition}
      opacity={slide.data.opacity || 0.9}
      getFillColor={slide.data.getFillColor}
      getLineColor={slide.data.getLineColor}
      stroked={slide.data.stroked || false}
      getLineWidth={slide.data.getLineWidth || 5}
      lineWidthMinPixels={1}
      getRadius={slide.data.getRadius}
      radiusScale={slide.data.radiusScale || 1}
      radiusMinPixels={1}
      autoHighlight={slide.data.autoHighlight || true}
      highlightColor={slide.data.highlightColor || highlighterYellow}
      onHover={onHoverSlide}
      parameters={{ depthTest: false }}
    />
  );

  const createIconMap = (slide, index) => (
    <IconLayer
      key={index}
      id={slide.data.id}
      pickable={slide.data.pickable || true}
      data={slide.data.data}
      opacity={slide.data.opacity}
      iconAtlas={slide.data.iconAtlas}
      iconMapping={slide.data.iconMapping}
      sizeScale={slide.data.sizeScale(viewport.zoom)}
      getPosition={slide.data.getPosition}
      getIcon={slide.data.getIcon}
      getSize={slide.data.getSize}
      getColor={slide.data.getColor}
      autoHighlight={slide.data.autoHighlight || false}
      highlightColor={slide.data.highlightColor || [0, 0, 0, 0]}
      onHover={onHoverSlide}
      parameters={{ depthTest: false }}
    />
  );

  const createScreenGridMap = (slide, index) => (
    <ScreenGridLayer
      key={index}
      id={slide.data.id}
      pickable={slide.data.pickable || true}
      data={slide.data.data}
      getPosition={slide.data.getPosition || getDefaultPosition}
      opacity={slide.data.opacity || 0.9}
      colorRange={slide.data.colorRange}
      cellSizePixels={slide.data.cellSizePixels}
      autoHighlight={slide.data.autoHighlight || true}
      highlightColor={slide.data.highlightColor || highlighterYellow}
      updateTriggers={{ instanceColors: slide.data }}
      gpuAggregation={false}
    />
  );

  const createBoundaryMap = (slide, index) => (
    <PolygonLayer
      key={index}
      id={slide.data.id}
      pickable={false}
      data={slide.data.data}
      opacity={slide.data.opacity}
      getPolygon={slide.data.getPolygon || getDefaultBoundaryPolygon}
      getLineColor={slide.data.getLineColor}
      getLineWidth={slide.data.getLineWidth}
      lineWidthMinPixels={1}
      lineWidthScale={1}
      lineJointRounded={slide.data.lineJointRounded || false}
      stroked={true}
      filled={false}
      autoHighlight={false}
      parameters={{ depthTest: false }}
    />
  );

  const createPolygonMap = (slide, index) => (
    <PolygonLayer
      key={index}
      id={slide.data.id}
      pickable={true}
      data={slide.data.data}
      opacity={slide.data.opacity || 0.9}
      getPolygon={slide.data.getPolygon || getDefaultPosition}
      getLineColor={slide.data.getLineColor}
      getLineWidth={slide.data.getLineWidth}
      lineWidthMinPixels={1}
      lineWidthScale={1}
      lineJointRounded={slide.data.lineJointRounded || false}
      stroked={slide.data.stroked || true}
      getFillColor={slide.data.getFillColor}
      filled={slide.data.filled || true}
      onHover={onHoverSlide}
      autoHighlight={slide.data.autoHighlight || true}
      highlightColor={slide.data.highlightColor || highlighterYellow}
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
    const scaleType = slide.data.scaleType;
    const colorScale =
      scaleType === "ordinal"
        ? createDiscreteBins(slide.data.categories, slide.data.color)
        : scaleType === "threshold"
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
      return colorScale(value) ? colorScale(value) : [0, 0, 0, 55];
    };

    const getLineColor = f => {
      const [selectedFeature] = selectedFoundationDatum;
      const id = selectedFeature ? selectedFeature.id : null;
      return f.id === id ? [255, 255, 0, 255] : [112, 122, 122, 155];
    };

    const getLineWidth = f => {
      const [selectedFeature] = selectedFoundationDatum;
      const id = selectedFeature ? selectedFeature.id : null;
      return f.id === id ? 75 : 1;
    };

    return (
      <PolygonLayer
        key={index}
        id={slide.data.id}
        pickable={true}
        data={slide.data.data}
        opacity={slide.data.opacity || 0.9}
        getPolygon={f => f.geometry.coordinates}
        getLineColor={slide.data.getLineColor || getLineColor}
        getLineWidth={slide.data.getLineWidth || getLineWidth}
        lineWidthMinPixels={1}
        stroked={true}
        getFillColor={slide.data.getFillColor || getFillColor}
        filled={true}
        onClick={onClick || slide.data.onLayerClick}
        autoHighlight={true}
        highlightColor={slide.data.highlightColor || [255, 255, 0, 55]}
        parameters={{ depthTest: false }}
        updateTriggers={
          slide.data.updateTriggers || {
            getLineColor: selectedFoundationDatum,
            getLineWidth: selectedFoundationDatum
          }
        }
      />
    );
  };

  const renderMaps = mapLayers.map((layer, index) => {
    const mapType = layer.data.mapType;
    return mapType === "PathMap"
      ? createPathMap(layer, index)
      : mapType === "ScatterPlotMap"
      ? createScatterPlotMap(layer, index)
      : mapType === "IconMap"
      ? createIconMap(layer, index)
      : mapType === "ScreenGridMap"
      ? createScreenGridMap(layer, index)
      : mapType === "PolygonPlotMap"
      ? createPolygonMap(layer, index)
      : mapType === "SmallPolygonMap"
      ? createPolygonMap(layer, index)
      : mapType === "ChoroplethMap"
      ? createChoroplethMap(layer, index)
      : mapType === "BoundaryMap"
      ? createBoundaryMap(layer, index)
      : null;
  });

  return (
    <div>
      <DeckGL className="DeckGL" {...viewport} getCursor={() => "crosshair"}>
        {renderMaps}
        {children}
      </DeckGL>
    </div>
  );
};

CivicSandboxMap.propTypes = {
  viewport: shape({
    latitude: number,
    longitude: number,
    height: number,
    width: number,
    zoom: number
  }),
  mapLayers: arrayOf(
    shape({
      data: shape({})
    })
  ).isRequired,
  onHoverSlide: func,
  onClick: func,
  children: node,
  selectedFoundationDatum: arrayOf(shape({}))
};

CivicSandboxMap.defaultProps = {
  selectedFoundationDatum: []
};

export default CivicSandboxMap;
