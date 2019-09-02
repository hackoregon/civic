import { Fragment } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { BaseMap, IconMap, ChartTitle } from "@hackoregon/component-library";
import {
  poiIconZoomScale,
  poiGetIconColor,
  poiIconMapping
} from "./layerStyles";

const mapContainer = css`
  display: flex;
  justifycontent: center;
  width: 500px;
  margin: 0 auto;
  padding-bottom: 40px;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ZOOM = 13.5;

const geocoderOptions = {
  bbox: [-123.1847001376, 45.2458284187, -122.2151566806, 45.8544896021],
  zoom: 13.5,
  placeholder: "Enter your address"
};

const mapGLOptions = {
  scrollZoom: false,
  dragPan: false,
  dragRotate: false,
  doubleClickZoom: false,
  touchZoom: false,
  touchRotate: false,
  keyboard: false
};

const YouAndYourNeighborsGorillaVisualization = ({ data }) => {
  const isLoading = !isLoaded(data.disasterNeighborhoodGrid);
  const disasterNeighborhoodGrid =
    !isLoading && data.disasterNeighborhoodGrid.value;
  return (
    <Fragment>
      {!isLoading && data && (
        <Fragment>
          <ChartTitle
            title="Your Personalized Earthquake Map"
            subtitle="BEECN locations, Schools, Hospitals, and Fire Stations"
          />
          <div css={mapContainer}>
            <BaseMap
              // initialLongitude={selectedCoords.longitude}
              // initialLatitude={selectedCoords.latitude}
              initialZoom={ZOOM}
              navigation={false}
              locationMarker
              // locationMarkerCoord={selectedCoords}
              // geocoder
              // geocoderOptions={geocoderOptions}
              // geocoderOnChange={geocoderChange}
              mapGLOptions={mapGLOptions}
            >
              {disasterNeighborhoodGrid && (
                <IconMap
                  data={disasterNeighborhoodGrid.features}
                  pickable
                  opacity={0.5}
                  iconAtlas="https://i.imgur.com/xgTAROe.png"
                  iconMapping={poiIconMapping}
                  iconSizeScale={poiIconZoomScale}
                  getPosition={f =>
                    f.geometry === null ? [0, 0] : f.geometry.coordinates
                  }
                  getIcon={f => f.properties.type}
                  getSize={() => 7}
                  getColor={poiGetIconColor}
                  autoHighlight={false}
                  highlightColor={[0, 0, 0, 0]}
                />
              )}
            </BaseMap>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

YouAndYourNeighborsGorillaVisualization.propTypes = {
  data: PropTypes.shape({ disasterNeighborhoodGrid: resourceShape })
};

export default YouAndYourNeighborsGorillaVisualization;
