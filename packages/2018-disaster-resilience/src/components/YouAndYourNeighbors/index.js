import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, BaseMap, IconMap, GradientScale } from '@hackoregon/component-library';

import {
  fetchYouAndYourNeighbors,
  fetchYouAndYourNeighborsCoords,
  youAndYourNeighborsSetCoords,
} from '../../state/you-and-your-neighbors/actions';
import {
  isYouAndYourNeighborsPending,
  catchYouAndYourNeighborsErrors,
  getYouAndYourNeighborsData,
  isYouAndYourNeighborsCoordsPending,
  catchYouAndYourNeighborsCoordsErrors,
  getYouAndYourNeighborsCoordsData,
  getSelectedCoords,
} from '../../state/you-and-your-neighbors/selectors';

const mapContainer = css`
  display: flex;
  justifyContent: center;
  width: 500px;
  margin: 0 auto;
`;

const LAT = 45.5231;
const LONG = -122.6765;
const ZOOM = 13.5;

const geocoderOptions = {
  bbox: [-123.1847001376, 45.2458284187, -122.2151566806, 45.8544896021],
  zoom: 13.5,
  trackProximity: true,
  placeholder: 'Enter your address',
};

const mapGLOptions = {
  scrollZoom: false,
  dragPan: false,
  dragRotate: false,
  doubleClickZoom: false,
  touchZoom: false,
  touchRotate: false,
  keyboard: false,
};

// Slide 016 - points of interest
const poiIconMapping = {
  School: {
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    mask: true,
  },
  Hospital: {
    x: 250,
    y: 0,
    width: 250,
    height: 250,
    mask: true,
  },
  BEECN: {
    x: 500,
    y: 0,
    width: 250,
    height: 250,
    mask: true,
  },
  'Fire Station': {
    x: 0,
    y: 250,
    width: 250,
    height: 250,
    mask: true,
  },
  Pin: {
    x: 250,
    y: 250,
    width: 250,
    height: 250,
    mask: true,
  },
  COMMCTR: {
    x: 500,
    y: 250,
    width: 250,
    height: 250,
    mask: true,
  },
};

const poiIconZoomScale = zoom => zoom > 11.5 ? 10 :
  zoom > 10.5 ? 8 :
  zoom > 9.5 ? 6 :
  zoom > 8.5 ? 4 :
  zoom > 7.5 ? 2 :
  1;

const poiGetIconColor = f => f.properties.type === 'BEECN' ? [0, 0, 0, 255] :
  f.properties.type === 'COMMCTR' ? [114, 29, 124, 255] :
  f.properties.type === 'Fire Station' ? [220, 69, 86, 255] :
  f.properties.type === 'School' ? [255, 178, 38, 255] :
  f.properties.type === 'Hospital' ? [30, 98, 189, 255] :
  [0, 0, 0, 255];

const shakingScale = {
  1: {
    shaking: 'Not felt',
    description: 'Not felt except by a very few under especially favorable conditions.',
  },
  2: {
    shaking: 'Weak',
    description: 'Felt only by a few persons at rest,especially on upper floors of buildings.',
  },
  3: {
    shaking: 'Weak',
    description: 'Felt quite noticeably by persons indoors, especially on upper floors of buildings. Many people do not recognize it as an earthquake. Standing motor cars may rock slightly. Vibrations similar to the passing of a truck. Duration estimated.',
  },
  4: {
    shaking: 'Light',
    description: 'Felt indoors by many, outdoors by few during the day. At night, some awakened. Dishes, windows, doors disturbed; walls make cracking sound. Sensation like heavy truck striking building. Standing motor cars rocked noticeably.',
  },
  5: {
    shaking: 'Moderate',
    description: 'Felt by nearly everyone; many awakened. Some dishes, windows broken. Unstable objects overturned. Pendulum clocks may stop.',
  },
  6: {
    shaking: 'Strong',
    description: 'Felt by all, many frightened. Some heavy furniture moved; a few instances of fallen plaster. Damage slight.',
  },
  7: {
    shaking: 'Very strong',
    description: 'Damage negligible in buildings of good design and construction; slight to moderate in well-built ordinary structures; considerable damage in poorly built or badly designed structures; some chimneys broken.',
  },
  8: {
    shaking: 'Severe',
    description: 'Damage slight in specially designed structures; considerable damage in ordinary substantial buildings with partial collapse. Damage great in poorly built structures. Fall of chimneys, factory stacks, columns, monuments, walls. Heavy furniture overturned.',
  },
  9: {
    shaking: 'Violent',
    description: 'Damage considerable in specially designed structures; well-designed frame structures thrown out of plumb. Damage great in substantial buildings, with partial collapse. Buildings shifted off foundations.',
  },
  10: {
    shaking: 'Extreme',
    description: 'Some well-built wooden structures destroyed; most masonry and frame structures destroyed with foundations. Rails bent.',
  },
};

const landslidesScale = {
  None: {
    scale: 0,
    description: 'No potential permanent ground deformation due to landslides',
  },
  Low: {
    scale: 1,
    description: 'Low potential permanent ground deformation due to landslides (0 - 4 inches)',
  },
  Moderate: {
    scale: 2,
    description: 'Moderate potential permanent ground deformation due to landslides (4 - 12 inches)',
  },
  High: {
    scale: 3,
    description: 'High potential permanent ground deformation due to landslides (12 - 39 inches)',
  },
  'Very High': {
    scale: 4,
    description: 'Very high potential permanent ground deformation due to landslides (39 - 173 inches)',
  },
};

const liquefactionScale = {
  None: {
    scale: 0,
    description: 'No potential permanent ground deformation due to liquefaction',
  },
  Low: {
    scale: 1,
    description: 'Low potential permanent ground deformation due to liquefaction (0 - 4 inches)',
  },
  Moderate: {
    scale: 2,
    description: 'Moderate potential permanent ground deformation due to liquefaction (4 - 12 inches)',
  },
  High: {
    scale: 3,
    description: 'High potential permanent ground deformation due to liquefaction (12 - 39 inches)',
  },
  'Very High': {
    scale: 4,
    description: 'Very high potential permanent ground deformation due to liquefaction (39 - 173 inches)',
  },
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
      setCoordinates,
    } = this.props;

    const geocoderChange = viewport => setCoordinates({ latitude: viewport.latitude, longitude: viewport.longitude });
    const coordProperties = (coordsData && coordsData.features.length > 0) && coordsData.features[0].properties;
    const noCoordsData = coordsData && coordsData.features.length < 1;

    const overlay = !data
    ? null
    : (
      <IconMap
        data={data.features}
        pickable
        opacity={0.5}
        iconAtlas="https://i.imgur.com/xgTAROe.png"
        iconMapping={poiIconMapping}
        iconSizeScale={poiIconZoomScale}
        getPosition={f => f.geometry === null ? [0, 0] : f.geometry.coordinates}
        getIcon={f => f.properties.type}
        getSize={f => 11}
        getColor={poiGetIconColor}
        autoHighlight={false}
        highlightColor={[0, 0, 0, 0]}
      />
    );

    return (
      <CivicStoryCard
        title="You and Your Neighbors in the Earthquake"
        slug="you-and-your-neighbors-in-the-earthquake"
        loading={isLoading}
        error={error && 'Error loading data'}
      >
        <div>
        <p>It will be critical for individuals to understand their location relative to key resources immediately following an earthquake. The <a href="https://www.portlandoregon.gov/pbem/59630" target="_blank" rel="noopener noreferrer">BEECN site</a> is a place to go in Portland after a major earthquake to ask for emergency assistance or report severe damage/injury. Places like hospitals, fire stations and schools will be rallying areas for the community and crucial for recovery efforts. Input your address, or a friend/family member’s address below to generate a personalized map.</p>
          <div className={mapContainer}>
            <BaseMap
              initialLongitude={LONG}
              initialLatitude={LAT}
              initialZoom={ZOOM}
              navigation={false}
              geocoder
              geocoderOptions={geocoderOptions}
              geocoderOnChange={geocoderChange}
              mapGLOptions={mapGLOptions}
            >
              {overlay}
            </BaseMap>
          </div>
          { noCoordsData && <p>We don't have complete information for your address. <a href='http://www.civicplatform.org/'>Learn more about how your city can work to get their data in Civic.</a></p>}
          {
            coordProperties &&
            <div>
              <h3>
                <strong>Shaking Intensity: </strong>{shakingScale[coordProperties.pgv_site_mean_mmi].shaking}
              </h3>
              <GradientScale
                domain={[1, 10]}
                primary={coordProperties.pgv_site_mean_mmi}
                height={50}
              />
              <p>
                {shakingScale[coordProperties.pgv_site_mean_mmi].description}
              </p>
              <h3>
                <strong>Landslide Potential: </strong>{coordProperties.pgd_landslide_wet_mean_di}
              </h3>
              <GradientScale
                domain={[0, 4]}
                primary={landslidesScale[coordProperties.pgd_landslide_wet_mean_di].scale}
                height={50}
              />
              <p>
                {landslidesScale[coordProperties.pgd_landslide_wet_mean_di].description}
              </p>
              <h3>
                <strong>Liquefaction Potential: </strong>{coordProperties.pgd_liquefaction_wet_mean_di}
              </h3>
              <GradientScale
                domain={[0, 4]}
                primary={liquefactionScale[coordProperties.pgd_liquefaction_wet_mean_di].scale}
                height={50}
              />
              <p>
                {liquefactionScale[coordProperties.pgd_liquefaction_wet_mean_di].description}
              </p>
            </div>
          }
        </div>
      </CivicStoryCard>
    );
  }
}

YouAndYourNeighbors.displayName = 'YouAndYourNeighbors';
YouAndYourNeighbors.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object,
  isCoordsLoading: PropTypes.bool,
  coordsError: PropTypes.object,
  coordsData: PropTypes.object,
  setCoordinates: PropTypes.func,
};

export default connect(
  state => ({
    isLoading: isYouAndYourNeighborsPending(state),
    error: catchYouAndYourNeighborsErrors(state),
    data: getYouAndYourNeighborsData(state),
    isCoordsLoading: isYouAndYourNeighborsCoordsPending(state),
    coordsError: catchYouAndYourNeighborsCoordsErrors(state),
    coordsData: getYouAndYourNeighborsCoordsData(state),
    selectedCoords: getSelectedCoords(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchYouAndYourNeighbors());
    },
    setCoordinates(coordinates = {}) {
      dispatch(fetchYouAndYourNeighborsCoords(coordinates));
      dispatch(youAndYourNeighborsSetCoords(coordinates));
    },
  }),
)(YouAndYourNeighbors);
