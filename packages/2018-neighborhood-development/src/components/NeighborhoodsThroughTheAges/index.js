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

    if (isLoading) {
      return <div className={cardLoading}>Loading...</div>;
    } else if (!neighborhoods) {
      return <div className={cardError}>{error ? `API ${error}` : 'Could not render Neighborhoods Through The Ages.'}</div>;
    }

    const neighborhoodSubtitle = !!selectedNeighborhood && ` - ${titleCase(selectedNeighborhood)}`;

    return (
      <CivicStoryCard
        title="Neighborhoods Through the Ages"
        slug="neighborhoods-through-the-ages"
      >
        <p>
        Between the years of 2006 to 2016, for each neighborhood in Portland, Oregon, registered voters have been grouped into the age categories, 18- 25, 26-32, 33-39, 40-49, and 50+. Their residencies are plotted over time to gain insight into the age range and movement of registered voters in Portland neighborhoods.
        </p>
        <Dropdown
          value={selectedNeighborhood}
          onChange={event => this.props.setNeighborhood(event)}
          options={neighborhoods}
        />

        { !!selectedNeighborhoodData &&
          <LineChart
            title="Registered Voters by Age"
            subtitle={`Registered voters in Portland by age group${neighborhoodSubtitle}`}
            data={selectedNeighborhoodData}
            xLabel="Year"
            yLabel="Percent"
            dataKey="year"
            dataValue="pct"
            dataSeries="type"
            xNumberFormatter={year}
            yNumberFormatter={percentage}
          />
        }

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
      dispatch(fetchNeighborhoodAges());
    },
    setNeighborhood(neighborhood) {
      dispatch(updateUserNeighborhood(neighborhood));
    },
  }),
)(NeighborhoodsThroughTheAges);
