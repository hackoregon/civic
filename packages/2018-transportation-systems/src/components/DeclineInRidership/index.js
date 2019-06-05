import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CivicStoryCard, LineChart } from "@hackoregon/component-library";

import { fetchRidershipOverTime } from "../../state/decline-in-ridership/actions";
import {
  isRidershipOverTimePending,
  catchRidershipOverTimeErrors,
  getRidershipOverTimeData
} from "../../state/decline-in-ridership/selectors";

export class DeclineInRidership extends React.Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, error, ridershipOverTime } = this.props;

    return (
      <CivicStoryCard
        title="Plateau in Ridership"
        slug="plateau-in-ridership"
        loading={isLoading}
        error={error}
      >
        <p>
          Newly released findings from TriMet shows a slow decline in public
          transit ridership relative to population growth over the last 10
          years, a pattern which appears to be consistent across the nation.
          While the cause of decline in ridership doesn&apos;t point to a single
          variable, it&apos;s been suggested that housing affordability and
          economic displacement may play a role in this phenomenon.
        </p>
        {ridershipOverTime && (
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
        )}
      </CivicStoryCard>
    );
  }
}
DeclineInRidership.displayName = "ridershipOverTime";
DeclineInRidership.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  ridershipOverTime: PropTypes.arrayOf(PropTypes.object)
};

export default connect(
  state => ({
    isLoading: isRidershipOverTimePending(state),
    error: catchRidershipOverTimeErrors(state),
    ridershipOverTime: getRidershipOverTimeData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchRidershipOverTime());
    }
  })
)(DeclineInRidership);
