import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { css } from "emotion";
import { min, max } from "lodash";

import {
  CivicStoryCard,
  Collapsable,
  BaseMap,
  ScatterPlotMap,
  Button,
  ChartContainer
} from "@hackoregon/component-library";
import { contextualDesc, belowFoldOne, belowFoldTwo } from "./text";

import {
  fetchCampsiteSweeps,
  incrementTimer
} from "../../state/explore-urban-campsite-sweeps/actions";
import {
  isCampsiteSweepsPending,
  catchCampsiteSweepsErrors,
  getCampsiteSweepsDataByTime,
  getCampsiteSweepsDateRange
} from "../../state/explore-urban-campsite-sweeps/selectors";

const LAT = 45.5231;
const LONG = -122.6765;
const ZOOM = 10.5;

export class ExploreUrbanCampsiteSweeps extends React.Component {
  componentDidMount() {
    this.props.init();
    const timerID = this.props.startTimer();
    this.setState({ timerID });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerID);
  }

  render() {
    const { isLoading, error, data, timer } = this.props;

    const scatterplot = !data ? null : (
      <ScatterPlotMap
        data={data}
        autoHighlight={false}
        getFillColor={() => [220, 69, 86]}
        getLineColor={() => [220, 69, 86]}
        getRadius={() => 100}
      />
    );

    return (
      <CivicStoryCard
        title="Explore Urban Campsite Sweeps by Neighborhood"
        slug="explore-urban-campsite-sweeps"
        loading={isLoading}
        error={error}
        source="https://github.com/hackoregon/neighborhoods-2018/tree/master/docs/campsites"
      >
        <Collapsable>
          <Collapsable.Section>
            <div>
              <p>{contextualDesc}</p>
              <h2>{timer}</h2>
              <BaseMap
                initialLongitude={LONG}
                initialLatitude={LAT}
                initialZoom={ZOOM}
              >
                {scatterplot}
              </BaseMap>
            </div>
          </Collapsable.Section>
          <Collapsable.Section hidden>
            <div>
              <p>{belowFoldOne}</p>
              <p>{belowFoldTwo}</p>
            </div>
          </Collapsable.Section>
        </Collapsable>
      </CivicStoryCard>
    );
  }
}

ExploreUrbanCampsiteSweeps.displayName = "ExploreUrbanCampsiteSweeps";
ExploreUrbanCampsiteSweeps.propTypes = {
  init: PropTypes.func,
  startTimer: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  timer: PropTypes.int
};

export default connect(
  state => ({
    isLoading: isCampsiteSweepsPending(state),
    error: catchCampsiteSweepsErrors(state),
    data: getCampsiteSweepsDataByTime(state),
    timer: getCampsiteSweepsDateRange(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchCampsiteSweeps());
    },
    startTimer() {
      return setInterval(() => dispatch(incrementTimer(1)), 800);
    }
  })
)(ExploreUrbanCampsiteSweeps);
