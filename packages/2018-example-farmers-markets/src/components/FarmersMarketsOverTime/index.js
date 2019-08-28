import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { CivicStoryCard, LineChart } from "@hackoregon/component-library";

import { fetchFarmersMarketsOverTime } from "../../state/farmers-markets-over-time/actions";
import {
  isFarmersMarketsOverTimePending,
  getFarmersMarketsOverTimeData
} from "../../state/farmers-markets-over-time/selectors";

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

class FarmersMarketsOverTime extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, farmersMarketsOverTime } = this.props;

    if (isLoading) {
      return <div css={cardLoading}>Loading...</div>;
    }

    if (!farmersMarketsOverTime) {
      return (
        <div css={cardError}>Could not render Farmers Markets Over Time</div>
      );
    }

    return (
      <div>
        <CivicStoryCard
          title="Farmers Markets Trending Upward"
          slug="farmers-markets-over-time"
        >
          <p>
            Farmers&apos; markets saw steady growth through the 1990s into the
            mid-2000s. The recession correlates with abnormal growth in the
            total number of Farmers&apos; Markets. The last two years have shown
            no growth. Is this plateau expected to continue? What causes growth
            or decline in Farmers&apos; Markets?
          </p>
          <div>
            <LineChart
              title="Have we hit peak Farmers Markets?"
              subtitle="US Farmers Markets, excluding farm stands"
              data={farmersMarketsOverTime}
              xLabel="Year"
              yLabel="# Farmers Markets Nationally"
              dataKey="Year"
              dataValue="FarmersMarketCount"
              dataKeyLabel="Year"
            />
          </div>
        </CivicStoryCard>
      </div>
    );
  }
}

FarmersMarketsOverTime.displayName = "FarmersMarketsOverTime";
FarmersMarketsOverTime.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  farmersMarketsOverTime: PropTypes.arrayOf(PropTypes.object)
};

export default connect(
  state => ({
    isLoading: isFarmersMarketsOverTimePending(state),
    farmersMarketsOverTime: getFarmersMarketsOverTimeData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchFarmersMarketsOverTime());
    }
  })
)(FarmersMarketsOverTime);
