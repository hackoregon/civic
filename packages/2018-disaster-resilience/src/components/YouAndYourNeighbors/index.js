import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { css } from "emotion";

import {
  CivicStoryCard,
  BaseMap,
  IconMap,
  ChartTitle
} from "@hackoregon/component-library";
import CoordsShakingInformation from "./CoordsShakingInformation";

import {
  fetchYouAndYourNeighbors,
  fetchYouAndYourNeighborsCoords,
  youAndYourNeighborsSetCoords
} from "../../state/you-and-your-neighbors/actions";
import {
  isYouAndYourNeighborsPending,
  catchYouAndYourNeighborsErrors,
  getYouAndYourNeighborsData,
  isYouAndYourNeighborsCoordsPending,
  catchYouAndYourNeighborsCoordsErrors,
  getYouAndYourNeighborsCoordsData,
  getSelectedCoords
} from "../../state/you-and-your-neighbors/selectors";
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

const LAT = 45.5231;
const LONG = -122.6765;
const ZOOM = 13.5;

const geocoderOptions = {
  bbox: [-123.1847001376, 45.2458284187, -122.2151566806, 45.8544896021],
  zoom: 13.5,
  trackProximity: true,
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

export class YouAndYourNeighbors extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      data,
      isCoordsLoading,
      coordsError,
      coordsData,
      selectedCoords,
      setCoordinates
    } = this.props;

    const geocoderChange = viewport =>
      setCoordinates({
        latitude: viewport.latitude,
        longitude: viewport.longitude
      });
    const coordsProperties =
      coordsData &&
      coordsData.features.length > 0 &&
      coordsData.features[0].properties;
    const noCoordsData = coordsData && coordsData.features.length < 1;

    return (
      <CivicStoryCard
        title="You and Your Neighbors in the Earthquake"
        slug="you-and-your-neighbors-in-the-earthquake"
        loading={isLoading}
        error={error && "Error loading data"}
      >
        <div>
          <p>
            It will be critical for individuals to understand their location
            relative to key resources immediately following an earthquake. The{" "}
            <a
              href="https://www.portlandoregon.gov/pbem/59630"
              target="_blank"
              rel="noopener noreferrer"
            >
              BEECN site
            </a>{" "}
            is a place to go in Portland after a major earthquake to ask for
            emergency assistance or report severe damage/injury. Places like
            hospitals, fire stations and schools will be rallying areas for the
            community and crucial for recovery efforts. Input your address, or a
            friend/family member’s address below to generate a personalized map
            and information about expected impacts for your location.
          </p>
          <ChartTitle
            title="Your Personalized Earthquake Map"
            subtitle="BEECN locations, Schools, Hospitals, and Fire Stations"
          />
          <div className={mapContainer}>
            <BaseMap
              initialLongitude={LONG}
              initialLatitude={LAT}
              initialZoom={ZOOM}
              navigation={false}
              // TODO: Reimplement Geocoder
              // geocoder
              // geocoderOptions={geocoderOptions}
              // geocoderOnChange={geocoderChange}
              mapGLOptions={mapGLOptions}
            >
              {data && (
                <IconMap
                  data={data.features}
                  pickable
                  opacity={0.5}
                  iconAtlas="https://i.imgur.com/xgTAROe.png"
                  iconMapping={poiIconMapping}
                  iconSizeScale={poiIconZoomScale}
                  getPosition={f =>
                    f.geometry === null ? [0, 0] : f.geometry.coordinates
                  }
                  getIcon={f => f.properties.type}
                  getSize={f => 7}
                  getColor={poiGetIconColor}
                  autoHighlight={false}
                  highlightColor={[0, 0, 0, 0]}
                />
              )}
            </BaseMap>
          </div>
          {noCoordsData && (
            <p>
              We don't have complete information for your address.{" "}
              <a href="http://civicplatform.org/">
                Learn more about how your city can work to get their data in
                Civic.
              </a>
            </p>
          )}
          {coordsProperties && (
            <CoordsShakingInformation coordsProperties={coordsProperties} />
          )}
        </div>
      </CivicStoryCard>
    );
  }
}

YouAndYourNeighbors.displayName = "YouAndYourNeighbors";
YouAndYourNeighbors.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object,
  isCoordsLoading: PropTypes.bool,
  coordsError: PropTypes.object,
  coordsData: PropTypes.object,
  setCoordinates: PropTypes.func
};

export default connect(
  state => ({
    isLoading: isYouAndYourNeighborsPending(state),
    error: catchYouAndYourNeighborsErrors(state),
    data: getYouAndYourNeighborsData(state),
    isCoordsLoading: isYouAndYourNeighborsCoordsPending(state),
    coordsError: catchYouAndYourNeighborsCoordsErrors(state),
    coordsData: getYouAndYourNeighborsCoordsData(state),
    selectedCoords: getSelectedCoords(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchYouAndYourNeighbors());
    },
    setCoordinates(coordinates = {}) {
      dispatch(fetchYouAndYourNeighborsCoords(coordinates));
      dispatch(youAndYourNeighborsSetCoords(coordinates));
    }
  })
)(YouAndYourNeighbors);
