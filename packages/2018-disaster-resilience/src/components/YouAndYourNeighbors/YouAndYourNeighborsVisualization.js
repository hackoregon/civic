import { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { BaseMap, IconMap, ChartTitle } from "@hackoregon/component-library";

import api from "../../state/you-and-your-neighbors/api";
import { youAndYourNeighborsSetCoords } from "../../state/you-and-your-neighbors/local-api";
import CoordsShakingInformation from "./CoordsShakingInformation";
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

const YouAndYourNeighborsVisualization = ({
  data,
  setCoordinates,
  selectedCoords,
  coordsData
}) => {
  const isLoadingGrid = !isLoaded(data.disasterNeighborhoodGrid);
  const coordsLoaded = isLoaded(coordsData);
  const disasterNeighborhoodGrid =
    !isLoadingGrid && data.disasterNeighborhoodGrid.value;

  const geocoderChange = viewport => {
    const stringCoordinates = {
      latitude: viewport.latitude.toPrecision(6),
      longitude: viewport.longitude.toPrecision(6)
    };
    const floatCoordinates = {
      latitude: parseFloat(stringCoordinates.latitude),
      longitude: parseFloat(stringCoordinates.longitude)
    };
    setCoordinates(stringCoordinates, floatCoordinates);
  };

  let coordsProperties = null;
  let noCoordsData = null;
  if (coordsLoaded) {
    const { results } = coordsData.value;

    coordsProperties =
      results.features &&
      results.features.length > 0 &&
      results.features[0].properties;
    noCoordsData = results.features && results.features.length < 1;
  }

  return (
    <Fragment>
      {!isLoadingGrid && data && (
        <Fragment>
          <ChartTitle
            title="Your Personalized Earthquake Map"
            subtitle="BEECN locations, Schools, Hospitals, and Fire Stations"
          />
          <div css={mapContainer}>
            <BaseMap
              initialLongitude={selectedCoords.longitude}
              initialLatitude={selectedCoords.latitude}
              initialZoom={ZOOM}
              navigation={false}
              locationMarker
              locationMarkerCoord={selectedCoords}
              geocoder
              geocoderOptions={geocoderOptions}
              geocoderOnChange={geocoderChange}
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
          {noCoordsData && (
            <p>
              {`We don't have complete information for your address. `}
              <a href="https://civicplatform.org/">
                Learn more about how your city can work to get their data in
                Civic.
              </a>
            </p>
          )}
          {coordsProperties && (
            <CoordsShakingInformation coordsProperties={coordsProperties} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

YouAndYourNeighborsVisualization.propTypes = {
  data: PropTypes.shape({ disasterNeighborhoodGrid: resourceShape }),
  selectedCoords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }),
  setCoordinates: PropTypes.func,
  coordsData: PropTypes.shape({})
};

const mapStateToProps = state => {
  const applicableState = state.package2018DisasterResilience || state;
  const { selectedCoords } = applicableState.youAndYourNeighborsLocalData;
  const stringCoordinates = {
    latitude: selectedCoords.latitude.toString(),
    longitude: selectedCoords.longitude.toString()
  };
  return {
    coordsData: api.selectors.getYouAndYourNeighborsCoords(
      applicableState,
      stringCoordinates
    ),
    selectedCoords
  };
};

const mapDispatchToProps = dispatch => ({
  setCoordinates(stringCoordinates = {}, floatCoordinates = {}) {
    dispatch(
      api.actionCreators.getYouAndYourNeighborsCoords(stringCoordinates)
    );
    dispatch(youAndYourNeighborsSetCoords(floatCoordinates));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouAndYourNeighborsVisualization);
