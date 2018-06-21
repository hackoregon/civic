import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, Scatterplot } from '@hackoregon/component-library';

import { fetchDriversOfParticipation } from '../../state/drivers-of-participation/actions';
import {
  isDriversOfParticipationPending,
  catchDriversOfParticipationErrors,
  getDriversOfParticipationData,
} from '../../state/drivers-of-participation/selectors';

export class DriversOfPublicTransitParticipation extends React.Component {
componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      driversOfParticipation,
    } = this.props;

    return (
      <CivicStoryCard
        title="Drivers of Public Transit Participation"
        slug="drivers-of-public-transit-participation"
      >
        <p>
The Relationship between Service Availability and the Change in Ridership is complex, and while we cannot claim to understand it completely, we can start looking at the data. To help facilitate future discussion about this potential relationship, we have plotted year-over-year changes in Scheduled Service vs Ridership.        </p>
        { driversOfParticipation &&
          <Scatterplot
            title="Ridership Change and Service Availability"
            subtitle="Percent change in ridership and service availability by line between 2009 and 2017"
            data={driversOfParticipation}
            xLabel="Year"
            yLabel="Ridership"
            dataKey="year"
            dataValue="ons"
            dataSeries="type"
            xNumberFormatter={d => `${d}`}
            domain={{ x: [-2050, 2050], y: [-400000, 400000] }}
          />
        }
      </CivicStoryCard>
    );
  }
}

DriversOfPublicTransitParticipation.displayName = 'DriversOfPublicTransitParticipation';
DriversOfPublicTransitParticipation.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  driversOfParticipation: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => ({
    isLoading: isDriversOfParticipationPending(state),
    error: catchDriversOfParticipationErrors(state),
    driversOfParticipation: getDriversOfParticipationData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchDriversOfParticipation());
    },
  }),
)(DriversOfPublicTransitParticipation);
