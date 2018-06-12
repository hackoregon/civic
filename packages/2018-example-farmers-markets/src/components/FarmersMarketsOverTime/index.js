import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, LineChart } from '@hackoregon/component-library';

import { fetchFarmersMarketsOverTime } from '../../state/farmers-markets-over-time/actions';
import {
  isFarmersMarketsOverTimePending,
  getFarmersMarketsOverTimeData,
} from '../../state/farmers-markets-over-time/selectors';

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

export class FarmersMarketsOverTime extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      farmersMarketsOverTime,
    } = this.props;

    if (isLoading) {
      return <div className={cardLoading}>Loading...</div>;
    } else if (!farmersMarketsOverTime) {
      return <div className={cardError}>Could not render Farmers Markets Over Time</div>;
    }

    return (
      <div>
        <CivicStoryCard title="Farmers Markets Trending Upward">
          <div>
            <LineChart
              subtitle="Have we hit peak Farmers Markets?"
              data={farmersMarketsOverTime}
              xLabel="Year"
              yLabel="# Farmers Markets Nationally"
              dataKey="Year"
              dataValue="FarmersMarketCount"
              dataKeyLabel="Year"
            />
          </div>
          <p>
            Farmers' markets saw steady growth through the 1990s into the mid-2000s. The recession
            correlates with abnormal growth in the total number of Farmers' Markets. The last two
            years have shown no growth. Is this plateau expected to continue? What causes
            growth or decline in Farmers' Markets?
          </p>
        </CivicStoryCard>
      </div>
    );
  }
}

FarmersMarketsOverTime.displayName = 'FarmersMarketsOverTime';
FarmersMarketsOverTime.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  farmersMarketsOverTime: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => ({
    isLoading: isFarmersMarketsOverTimePending(state),
    farmersMarketsOverTime: getFarmersMarketsOverTimeData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchFarmersMarketsOverTime());
    },
  }),
)(FarmersMarketsOverTime);
