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
// import CivicSandboxMap from "../CivicSandboxMap/CivicSandboxMap";
import CivicSandboxMap from "../MultiLayerMap/MultiLayerMap";
import CivicSandboxTooltip from "../CivicSandboxMap/CivicSandboxTooltip";
import SandboxDrawer from "./SandboxDrawer";

const baseMapWrapper = css(`
  height: 80vh;
  min-height: 700px;
  @media (max-width: 850px) {
    height: 65vh;
    min-height: 550px;
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
  foundationData,
  slideData,
  updatePackage,
  updateFoundation,
  updateSlide,
  fetchSlideDataByDate,
  drawerVisible,
  toggleDrawer,
  styles,
  onFoundationClick,
  onSlideHover,
  tooltipInfo,
  allSlides,
  foundationMapProps,
  selectedFoundationDatum,
  areSlidesLoading,
  errors
}) => {
  const [baseMapStyle, setBaseMapStyle] = useState("dark");

  const handleBaseMapStyleChange = baseMapStyleChangeEvent => {
    // eslint-disable-next-line no-unused-expressions
    baseMapStyleChangeEvent.target.value === "light"
      ? setBaseMapStyle("light")
      : setBaseMapStyle("dark");
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
          height: 75vh;
          min-height: 600px;
          @media (max-width: 850px) {
            height: 60vh;
            min-height: 500px;
          }
        `}
      >
        <SandboxDrawer
          data={data}
          selectedSlide={selectedSlide}
          onChange={updateSlide}
          selectedPackage={selectedPackage}
          toggleDrawer={toggleDrawer}
          drawerVisible={drawerVisible}
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
        />
      </div>
      <div css={baseMapWrapper}>
        <BaseMap
          civicMapStyle={baseMapStyle}
          initialZoom={10.5}
          initialLatitude={45.5431}
          initialLongitude={-122.5765}
          useContainerHeight
          updateViewport={false}
        >
          <CivicSandboxMap
            mapLayers={layerData}
            onClick={onFoundationClick}
            onHoverSlide={onSlideHover}
            selectedFoundationDatum={selectedFoundationDatum}
          >
            {tooltipInfo && <CivicSandboxTooltip tooltipData={tooltipInfo} />}
          </CivicSandboxMap>
        </BaseMap>
      </div>
    </div>
  );
};

Sandbox.propTypes = {
  data: shape({
    packages: shape({}),
    foundations: shape({}),
    slides: shape({})
  }).isRequired,
  layerData: arrayOf(shape({})).isRequired,
  defaultFoundation: shape({
    endpoint: string,
    name: string,
    visualization: string
  }).isRequired,
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
  foundationData: shape({
    slide_data: shape({}),
    slide_meta: shape({})
  }).isRequired,
  slideData: arrayOf(shape({})).isRequired,
  updatePackage: func.isRequired,
  updateFoundation: func.isRequired,
  updateSlide: func.isRequired,
  fetchSlideDataByDate: func.isRequired,
  drawerVisible: bool.isRequired,
  toggleDrawer: func.isRequired,
  styles: shape({}),
  onFoundationClick: func,
  onSlideHover: func,
  tooltipInfo: shape({
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
      slideId: string
    })
  ).isRequired,
  foundationMapProps: shape({
    color: arrayOf(arrayOf(number)),
    getPropValue: func,
    propName: string,
    scaleType: string
  }).isRequired,
  selectedFoundationDatum: arrayOf(
    shape({
      data: oneOfType([arrayOf(shape({})), number, string]),
      id: oneOfType([number, string]),
      title: string,
      visualizationType: string
    })
  )
};

export default Sandbox;
