import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CivicStoryCard, LineChart } from "@hackoregon/component-library";

import {
  ungroupBy,
  civicFormat
} from "@hackoregon/component-library/dist/utils";

import { fetchServiceAndRidership } from "../../state/service-and-ridership/actions";
import {
  isServiceAndRidershipPending,
  catchServiceAndRidershipErrors,
  getServiceAndRidershipData
} from "../../state/service-and-ridership/selectors";

const TC_REPORT_DATA = [
  {
    year: 2002,
    total_ridership_millions: 265,
    total_vrk_bus_millions: 51.5,
    total_vrk_rail_millions: 41.8
  },
  {
    year: 2003,
    total_ridership_millions: 260,
    total_vrk_bus_millions: 51.4,
    total_vrk_rail_millions: 42.6
  },
  {
    year: 2004,
    total_ridership_millions: 261,
    total_vrk_bus_millions: 51.7,
    total_vrk_rail_millions: 43.1
  },
  {
    year: 2005,
    total_ridership_millions: 282,
    total_vrk_bus_millions: 51.6,
    total_vrk_rail_millions: 43.5
  },
  {
    year: 2006,
    total_ridership_millions: 282,
    total_vrk_bus_millions: 51,
    total_vrk_rail_millions: 46.4
  },
  {
    year: 2007,
    total_ridership_millions: 308,
    total_vrk_bus_millions: 51.1,
    total_vrk_rail_millions: 47.5
  },
  {
    year: 2008,
    total_ridership_millions: 305,
    total_vrk_bus_millions: 51,
    total_vrk_rail_millions: 46.8
  },
  {
    year: 2009,
    total_ridership_millions: 300,
    total_vrk_bus_millions: 50.8,
    total_vrk_rail_millions: 47.2
  },
  {
    year: 2010,
    total_ridership_millions: 295,
    total_vrk_bus_millions: 48.5,
    total_vrk_rail_millions: 46.5
  },
  {
    year: 2011,
    total_ridership_millions: 300,
    total_vrk_bus_millions: 46.8,
    total_vrk_rail_millions: 46
  },
  {
    year: 2012,
    total_ridership_millions: 304,
    total_vrk_bus_millions: 45.7,
    total_vrk_rail_millions: 46.3
  },
  {
    year: 2013,
    total_ridership_millions: 305,
    total_vrk_bus_millions: 45.2,
    total_vrk_rail_millions: 47.5
  },
  {
    year: 2014,
    total_ridership_millions: 309,
    total_vrk_bus_millions: 45,
    total_vrk_rail_millions: 48
  },
  {
    year: 2015,
    total_ridership_millions: 304,
    total_vrk_bus_millions: 45.3,
    total_vrk_rail_millions: 49.5
  }
];

const percentageSince = arr =>
  arr.map(obj => ({
    year: obj.year,
    total_ridership_millions: obj.total_ridership_millions / 265 - 1,
    total_vrk_bus_millions: obj.total_vrk_bus_millions / 51.5 - 1,
    total_vrk_rail_millions: obj.total_vrk_rail_millions / 41.8 - 1
  }));

const categories = [
  "total_ridership_millions",
  "total_vrk_bus_millions",
  "total_vrk_rail_millions"
];

const labels = ["National Ridership", "Bus VRK", "Rail VRK"];

const CHART_DATA = ungroupBy(
  percentageSince(TC_REPORT_DATA),
  categories,
  labels
);

const combineData = (a, b) => [...a, ...b];

export class ServiceAndRidership extends React.Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, error, serviceAndRidership } = this.props;

    return (
      <CivicStoryCard
        title="Changing Service, Changing Ridership"
        slug="service-and-ridership"
        loading={isLoading}
        error={error}
      >
        <p>
          Ridership and Transit Service trends arise in Portland for many
          complicated reasons, but we are not alone in these challenges.
          National Transit Reform Research and Advocacy Group, Transit Center,
          recently released the results of a Longitudinal Multilevel Regression
          Analysis Comparing Service Frequency and Ridership. Here, we show the
          year-over-year change in Transit Center’s Results plotted alongside
          the changes we saw in TriMet Ridership in Portland.
        </p>
        {serviceAndRidership && (
          <LineChart
            title="Public Transit Ridership and Operations"
            subtitle="Percentage change since 2002 in ridership (unlinked trips) and transit miles driven (VRK)"
            data={combineData(CHART_DATA, serviceAndRidership)}
            xLabel="Year"
            yLabel="Ridership"
            dataKey="year"
            dataValue="value"
            dataSeries="type"
            xNumberFormatter={d => `${d}`}
            yNumberFormatter={civicFormat.percentage}
          />
        )}
      </CivicStoryCard>
    );
  }
}
ServiceAndRidership.displayName = "ServiceAndRidership";
ServiceAndRidership.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  serviceAndRidership: PropTypes.arrayOf(PropTypes.object)
};

export default connect(
  state => ({
    isLoading: isServiceAndRidershipPending(state),
    error: catchServiceAndRidershipErrors(state),
    serviceAndRidership: getServiceAndRidershipData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchServiceAndRidership());
    }
  })
)(ServiceAndRidership);
