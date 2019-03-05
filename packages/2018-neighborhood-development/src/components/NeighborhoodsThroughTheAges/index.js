import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import {
  year,
  percentage,
  titleCase,
} from '@hackoregon/component-library/src/utils/formatters';

import {
  CivicStoryCard,
  LineChart,
  Dropdown,
} from '@hackoregon/component-library';

import {
  fetchNeighborhoodAges,
  updateUserNeighborhood,
} from '../../state/neighborhoods-through-the-ages/actions';
import {
  isNeighborhoodAgesPending,
  catchNeighborhoodAgesErrors,
  getNeighborhoodAgesData,
  getListOfNeighborhoods,
  getSelectedNeighborhood,
  getDataForSelectedNeighborhood,
} from '../../state/neighborhoods-through-the-ages/selectors';

const DEFAULT_NEIGHBORHOOD = {
  value: 'ROSE CITY PARK',
  label: 'Rose City Park',
};

const cardLoading = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #eee;
`;

const cardError = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #fdd;
  border: 1px solid #c99;
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

    const neighborhoodSubtitle =
      !!selectedNeighborhood && ` - ${titleCase(selectedNeighborhood)}`;

    return (
      <CivicStoryCard
        title="Neighborhoods Through the Ages"
        slug="neighborhoods-through-the-ages"
        loading={isLoading}
        error={error}
        source="https://github.com/hackoregon/neighborhoods-2018/blob/master/docs/voter_registration/neighborhood%20age%20group%20occupancy.ipynb"
      >
        <p>
          Between the years of 2006 to 2016, for each neighborhood in Portland,
          Oregon, registered voters have been grouped into the age categories,
          18- 25, 26-32, 33-39, 40-49, and 50+. Their residencies are plotted
          over time to gain insight into the age range and movement of
          registered voters in Portland neighborhoods.
        </p>

        {!!selectedNeighborhood && (
          <Dropdown
            value={selectedNeighborhood}
            onChange={event => event && this.props.setNeighborhood(event)}
            options={neighborhoods}
          />
        )}

        {!!selectedNeighborhoodData && (
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
        )}
      </CivicStoryCard>
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
  selectedNeighborhoodData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
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
  })
)(NeighborhoodsThroughTheAges);
