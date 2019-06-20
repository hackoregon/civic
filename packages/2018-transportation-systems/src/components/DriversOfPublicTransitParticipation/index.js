import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CivicStoryCard, Scatterplot } from "@hackoregon/component-library";

import { civicFormat } from "@hackoregon/component-library/dist/utils";

import { fetchDriversOfParticipation } from "../../state/drivers-of-participation/actions";
import {
  isDriversOfParticipationPending,
  catchDriversOfParticipationErrors,
  getDriversOfParticipationData
} from "../../state/drivers-of-participation/selectors";

export class DriversOfPublicTransitParticipation extends React.Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, error, driversOfParticipation } = this.props;

    return (
      <CivicStoryCard
        title="Drivers of Public Transit Participation"
        slug="drivers-of-public-transit-participation"
        loading={isLoading}
        error={error}
      >
        <p>
          The Relationship between Service Availability and the Change in
          Ridership is complex, and while we cannot claim to understand it
          completely, we can start looking at the data. To help facilitate
          future discussion about this potential relationship, we have plotted
          year-over-year changes in Scheduled Service vs Ridership.{" "}
        </p>
        {driversOfParticipation && (
          <Scatterplot
            title="TriMet Ridership and Service Availability Changes"
            subtitle="Annual changes in ridership and service availability by line between 2013 and 2017"
            data={driversOfParticipation}
            xLabel="Frequency Change"
            yLabel="Ridership Change"
            dataKey="frequency_change"
            dataKeyLabel="combinedLabel"
            dataValue="ridership_change"
            dataSeries="year"
            xNumberFormatter={civicFormat.percentage}
            yNumberFormatter={civicFormat.percentage}
            domain={{ x: [-1, 2], y: [-1, 2] }}
          />
        )}
      </CivicStoryCard>
    );
  }
}

DriversOfPublicTransitParticipation.displayName =
  "DriversOfPublicTransitParticipation";
DriversOfPublicTransitParticipation.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  driversOfParticipation: PropTypes.arrayOf(PropTypes.object)
};

export default connect(
  state => ({
    isLoading: isDriversOfParticipationPending(state),
    error: catchDriversOfParticipationErrors(state),
    driversOfParticipation: getDriversOfParticipationData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchDriversOfParticipation());
    }
  })
)(DriversOfPublicTransitParticipation);
