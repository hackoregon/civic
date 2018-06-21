import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { year, percentage, titleCase } from '@hackoregon/component-library/src/utils/formatters';

import { CivicStoryCard, LineChart, Dropdown } from '@hackoregon/component-library';

import { fetchNeighborhoodAges, updateUserNeighborhood } from '../../state/neighborhoods-through-the-ages/actions';
import {
  isNeighborhoodAgesPending,
  catchNeighborhoodAgesErrors,
  getNeighborhoodAgesData,
  getListOfNeighborhoods,
  getSelectedNeighborhood,
  getDataForSelectedNeighborhood,
} from '../../state/neighborhoods-through-the-ages/selectors';

const DEFAULT_NEIGHBORHOOD = { value: 'ROSE CITY PARK', label: 'Rose City Park' };

const cardLoading = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #EEE;
`;

const cardError = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #FDD;
  border: 1px solid #C99;
`;

export class NeighborhoodsThroughTheAges extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      neighborhoods,
      selectedNeighborhood,
      selectedNeighborhoodData,
    } = this.props;

    const neighborhoodSubtitle = !!selectedNeighborhood && ` - ${titleCase(selectedNeighborhood)}`;

    return (
      <CivicStoryCard
        title="Neighborhoods Through the Ages"
        slug="neighborhoods-through-the-ages"
        loading={isLoading}
        error={error}
      >
        <p>
        For each neighborhood registered voters have been grouped into age categories, the proportion
        of residents in different age groups are plotted over time. This allows visualization of the 
        age range and movement of registered voters in Portland neighborhoods
        </p>

        { !!selectedNeighborhood &&
          <Dropdown
          value={selectedNeighborhood}
          onChange={event => event && this.props.setNeighborhood(event)}
          options={neighborhoods}
          />
        }

        { !!selectedNeighborhoodData &&
          <LineChart
            title="Registered Voters by Age"
            subtitle={`Registered voters in Portland by age group${neighborhoodSubtitle}`}
            data={selectedNeighborhoodData}
            xLabel="Year"
            yLabel="Percent"
            dataKey="year"
            dataValue="value"
            dataSeries="type"
            xNumberFormatter={year}
            yNumberFormatter={percentage}
          />
        }
        <p>Individuals who have lived in different neighborhoods in the same year are counted multiple times.
        </p>
        <p>
          Example: Hillside/Northwest district is a good example of a neighborhood where young people have been 
          moving into this neighborhood from 2006 to 2016.
        </p>
        <p>
          Below are the list of neighborhoods with the largest changes for each age group:
          Neighborhoods with the largest decrease for each age group
        </p>
        <p> 
        <dl>
          <dt>Ages 18-25: WOODLAND PARK</dt>
          <dt>Ages 26-32: ARDENWALD-JOHNSON CREEK/WOODSTOCK</dt>
          <dt>Ages 33-39: GRANT PARK/HOLLYWOOD</dt>
          <dt>Ages 40-29: BEAVER CREEK</dt>
          <dt>Ages 50+: GOOSE HOLLOW/SOUTHWEST HILL</dt>
        </dl>
        </p>
        <p>
          Neighborhoods with the largest increase for each age group
        <dl>
          <dt>Ages 18-25: HILLSIDE/NORTHWEST DISTRICT</dt>
          <dt>Ages 26-32: GLENFAIR</dt>
          <dt>Ages 33-39: MARSHALL PARK</dt>
          <dt>Ages 40-49: MARKHAM</dt>
          <dt>Ages 50+: 'WOODLAND PARK'</dt>
        </dl>
        </p>

      </ CivicStoryCard>
    );
  }
}

NeighborhoodsThroughTheAges.displayName = 'NeighborhoodsThroughTheAges';
NeighborhoodsThroughTheAges.propTypes = {
  init: PropTypes.func,
  setNeighborhood: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  neighborhoods: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  selectedNeighborhood: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  selectedNeighborhoodData: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default connect(
  state => ({
    isLoading: isNeighborhoodAgesPending(state),
    error: catchNeighborhoodAgesErrors(state),
    data: getNeighborhoodAgesData(state),
    neighborhoods: getListOfNeighborhoods(state),
    selectedNeighborhood: getSelectedNeighborhood(state),
    selectedNeighborhoodData: getDataForSelectedNeighborhood(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchNeighborhoodAges()).then(() => {
        dispatch(updateUserNeighborhood(DEFAULT_NEIGHBORHOOD));
      });
    },
    setNeighborhood(neighborhood) {
      dispatch(updateUserNeighborhood(neighborhood));
    },
  }),
)(NeighborhoodsThroughTheAges);
