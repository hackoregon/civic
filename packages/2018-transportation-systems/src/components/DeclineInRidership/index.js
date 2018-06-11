import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, LineChart } from '@hackoregon/component-library';

import { fetchRidershipOverTime } from '../../state/decline-in-ridership/actions';
import {
  isRidershipOverTimePending,
  getRidershipOverTimeData,
} from '../../state/decline-in-ridership/selectors';

const sampleSimpleData = [
  { x: 0, y: 20 },
  { x: 10, y: 30 },
  { x: 20, y: 50 },
  { x: 30, y: 40 },
];

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

export class DeclineInRidership extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      ridershipOverTime,
    } = this.props;

    if (isLoading) {
      return <div className={cardLoading}>Loading...</div>;
    } else if (!ridershipOverTime) {
      return <div className={cardError}>Could not render Farmers Markets Over Time</div>;
    }

    return (
      <CivicStoryCard title="Decline in Ridership">
          <p>
Newly released findings from TriMet shows a slow decline in public transit ridership relative to population growth over the last 10 years, a pattern which appears to be consistent across the nation.  While the cause of decline in ridership doesn't point to a single variable, it's been suggested that housing affordability and economic displacement may play a role in this phenomenon.
          </p>
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
      </CivicStoryCard>
    );
  }
}
DeclineInRidership.displayName = 'ridershipOverTime';
DeclineInRidership.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  ridershipOverTime: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => ({
    isLoading: isRidershipOverTimePending(state),
    ridershipOverTime: getRidershipOverTimeData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchRidershipOverTime());
    },
  }),
)(DeclineInRidership);
