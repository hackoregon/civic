import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, LineChart } from '@hackoregon/component-library';

import { fetchRidershipOverTime } from '../../state/decline-in-ridership/actions';
import {
  isRidershipOverTimePending,
  catchRidershipOverTimeErrors,
  getRidershipOverTimeData,
} from '../../state/decline-in-ridership/selectors';

export class DeclineInRidership extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      ridershipOverTime,
    } = this.props;

    return (
      <CivicStoryCard
        title="Plateau in Ridership"
        slug="plateau-in-ridership"
        loading={isLoading}
        error={error}
      >
          <p>As populations grow, an increase in Public Transit Ridership should be 
            inevitable, and yet, in many large cities in America, that simply isn’t 
            the case. In the chart below, we see a plateauing trend in transit ridership.
          </p>
          { ridershipOverTime &&
            <LineChart
              title="Public Transit Ridership"
              subtitle="Average daily ridership for TriMet bus and rail (unlinked trips)"
              data={ridershipOverTime}
              xLabel="Year"
              yLabel="Ridership"
              dataKey="year"
              dataValue="ons"
              dataSeries="type"
              xNumberFormatter={d => `${d}`}
            />
          }
      </CivicStoryCard>
    );
  }
}
DeclineInRidership.displayName = 'ridershipOverTime';
DeclineInRidership.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  ridershipOverTime: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => ({
    isLoading: isRidershipOverTimePending(state),
    error: catchRidershipOverTimeErrors(state),
    ridershipOverTime: getRidershipOverTimeData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchRidershipOverTime());
    },
  }),
)(DeclineInRidership);
