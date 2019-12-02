import { useState } from "react";
import {
  arrayOf,
  bool,
  func,
  number,
  string,
  shape,
  oneOfType
} from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import BaseMap from "../BaseMap/BaseMap";
import CivicSandboxMap from "../MultiLayerMap/MultiLayerMap";
import CivicSandboxTooltip from "../CivicSandboxMap/CivicSandboxTooltip";
import SandboxDrawer from "./SandboxDrawer";
import SandboxIntroDialog from "./SandboxIntroDialog";
import SandboxLegend from "./SandboxLegend";

const baseMapWrapper = css(`
  height: 100vh;
  min-height: 650px;
  @media (max-width: 850px) {
    height: 100vh;
    min-height: 600px;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 100vh;
    min-height: 390px;
  }
`);

const Sandbox = ({
  data,
  layerData,
  defaultFoundation,
  defaultSlides,
  selectedPackage,
  selectedFoundation,
  selectedSlide,
  slideData,
  updatePackage,
  updateFoundation,
  updateSlide,
  fetchSlideDataByDate,
  drawerVisible,
  drawerVisualization,
  drawerLayerSelector,
  toggleDrawer,
  toggleDrawerLayerSelector,
  toggleDrawerVisualization,
  dialogVisible,
  toggleDialog,
  styles,
  onFoundationClick,
  onSlideHover,
  onBaseMapHover,
  tooltipInfo,
  tooltipInfoVector,
  allSlides,
  selectedFoundationDatum,
  areSlidesLoading,
  errors,
  updateSlideKey
}) => {
  const [baseMapStyle, setBaseMapStyle] = useState("light");

  const handleBaseMapStyleChange = baseMapStyleChangeEvent => {
    // eslint-disable-next-line no-unused-expressions
    baseMapStyleChangeEvent.target.value === "light"
      ? setBaseMapStyle("light")
      : setBaseMapStyle("sandbox-dark");
  };

  const featuresArr = layerData.length ? layerData[0].data : [];
  const boundBox = layerData.length ? layerData[0].boundBox : [];

  const [highlightFeatureStateID, setHighlightFeatureStateID] = useState(null);
  const [vectorSource, setVectorSource] = useState(null);
  const [vectorSourceLayer, setVectorSourceLayer] = useState(null);

  const onHoverVectorLayer = (info, mapboxRef) => {
    const [selectedFeature] = info.features;
    const selectedIndex =
      selectedFeature.layer &&
      selectedFeature.layer.metadata &&
      selectedFeature.layer.metadata["sandbox:index"];

    const hoverVectorSource = selectedFeature.source;
    const hoverVectorSourceLayer = selectedFeature.sourceLayer;

    if (highlightFeatureStateID) {
      mapboxRef.removeFeatureState({
        source: vectorSource,
        sourceLayer: vectorSourceLayer
      });
    }

    if (selectedIndex >= 0) {
      setHighlightFeatureStateID(selectedFeature.id);
      setVectorSource(hoverVectorSource);
      setVectorSourceLayer(hoverVectorSourceLayer);
      mapboxRef.setFeatureState(
        {
          source: hoverVectorSource,
          sourceLayer: hoverVectorSourceLayer,
          id: selectedFeature.id
        },
        {
          highlight: true
        }
      );
    }

    const selectedProps = selectedFeature.properties;

    if (selectedProps && selectedIndex !== undefined) {
      const selectedDatum = {
        object: {
          properties: selectedProps
        },
        x: info.point[0],
        y: info.point[1]
      };
      onBaseMapHover(selectedDatum, selectedIndex);
    } else {
      const selectedDatum = {};
      onBaseMapHover(selectedDatum, selectedIndex);
    }
  };

  const mouseOutVectorLayer = mapboxRef => {
    mapboxRef.removeFeatureState({
      source: vectorSource,
      sourceLayer: vectorSourceLayer
    });

    const selectedDatum = {
      object: {}
    };
    onBaseMapHover(selectedDatum);
  };

  return (
    <div css={styles}>
      <div
        css={css`
          position: absolute;
          top: 0;
          right: 0;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100vh;
          min-height: 650px;
          @media (max-width: 850px) {
            height: 100vh;
            min-height: 600px;
          }
          @media (max-width: 500px) {
            width: 100%;
            height: 100vh;
            min-height: 390px;
          }
        `}
      >
        <SandboxIntroDialog open={dialogVisible} onClose={toggleDialog} />
        <SandboxDrawer
          data={data}
          selectedSlide={selectedSlide}
          onChange={updateSlide}
          selectedPackage={selectedPackage}
          toggleDialog={toggleDialog}
          toggleDrawer={toggleDrawer}
          toggleLayerSelector={toggleDrawerLayerSelector}
          toggleVisualization={toggleDrawerVisualization}
          drawerVisible={drawerVisible}
          dialogVisible={dialogVisible}
          drawerVisualization={drawerVisualization}
          drawerLayerSelector={drawerLayerSelector}
          defaultSlides={defaultSlides}
          slideData={slideData}
          fetchSlideByDate={fetchSlideDataByDate}
          selectedFoundation={selectedFoundation}
          foundationData={layerData}
          defaultFoundation={defaultFoundation}
          allSlides={allSlides}
          updatePackage={updatePackage}
          updateFoundation={updateFoundation}
          foundationMapProps={layerData}
          onBaseMapStyleChange={handleBaseMapStyleChange}
          baseMapStyle={baseMapStyle}
          areSlidesLoading={areSlidesLoading}
          errors={errors}
          updateSlideKey={updateSlideKey}
          selectedFoundationDatum={selectedFoundationDatum}
        />
      </div>
      <div css={baseMapWrapper}>
        <BaseMap
          civicMapStyle={baseMapStyle}
          initialLatitude={39.810492}
          initialLongitude={-98.556061}
          initialZoom={3.5}
          minZoom={3}
          maxZoom={14}
          useContainerHeight
          updateViewport={false}
          boundBox={boundBox}
          bboxData={featuresArr}
          bboxPadding={50}
          useScrollZoom
          onBaseMapHover={onHoverVectorLayer}
          onBaseMapMouseOut={mouseOutVectorLayer}
        >
          <CivicSandboxMap
            mapLayers={layerData}
            onLayerClick={onFoundationClick}
            onHoverSlide={onSlideHover}
            selectedFoundationDatum={selectedFoundationDatum}
          >
            {tooltipInfo && <CivicSandboxTooltip tooltipData={tooltipInfo} />}
            {tooltipInfoVector && (
              <CivicSandboxTooltip tooltipData={tooltipInfoVector} />
            )}
          </CivicSandboxMap>
        </BaseMap>
        <SandboxLegend
          foundationData={layerData}
          allSlides={allSlides}
          foundationMapProps={layerData}
          areSlidesLoading={areSlidesLoading}
          errors={errors}
        />
      </div>
    </div>
  );
};

Sandbox.propTypes = {
  data: shape({
    packages: arrayOf(shape({})),
    slides: shape({})
  }).isRequired,
  layerData: arrayOf(shape({})).isRequired,
  defaultFoundation: shape({
    endpoint: string,
    name: string,
    visualization: string
  }),
  defaultSlides: arrayOf(
    shape({
      endpoint: string,
      name: string,
      visualization: string
    })
  ).isRequired,
  selectedPackage: string.isRequired,
  selectedFoundation: string.isRequired,
  selectedSlide: arrayOf(string).isRequired,
  slideData: arrayOf(shape({})).isRequired,
  updatePackage: func.isRequired,
  updateFoundation: func.isRequired,
  updateSlide: func.isRequired,
  fetchSlideDataByDate: func.isRequired,
  drawerVisible: bool.isRequired,
  drawerVisualization: bool.isRequired,
  drawerLayerSelector: bool.isRequired,
  toggleDrawer: func.isRequired,
  toggleDrawerLayerSelector: func.isRequired,
  toggleDrawerVisualization: func.isRequired,
  dialogVisible: bool.isRequired,
  toggleDialog: func.isRequired,
  styles: string,
  onFoundationClick: func,
  onSlideHover: func,
  onBaseMapHover: func,
  tooltipInfo: shape({
    content: arrayOf(shape({})),
    x: number,
    y: number
  }),
  tooltipInfoVector: shape({
    content: arrayOf(shape({})),
    x: number,
    y: number
  }),
  allSlides: arrayOf(
    shape({
      checked: bool,
      color: arrayOf(number),
      endpoint: string,
      label: string,
      mapType: string,
      slideId: oneOfType([string, number])
    })
  ).isRequired,
  selectedFoundationDatum: shape({
    id: number,
    displayName: string,
    featureProperties: shape({}),
    colorKey: string,
    primaryFormat: string
  }),
  areSlidesLoading: bool,
  updateSlideKey: func,
  errors: bool
};

export default Sandbox;
