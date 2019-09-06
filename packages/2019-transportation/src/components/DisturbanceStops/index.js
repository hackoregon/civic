import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import disturbanceStopsMeta from "./disturbanceStopsMeta";
import api from "../../state/disturbance-stops/api";

const DisturbanceStops = ({ init, data, Layout }) => {
  useEffect(
    () => {
      init();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [init]
  );

  return (
    <CivicCard cardMeta={disturbanceStopsMeta} data={data} Layout={Layout} />
  );
};

DisturbanceStops.displayName = "DisturbanceStops";

DisturbanceStops.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ disturbanceStops: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      disturbanceStops: api.selectors.getDisturbanceStopsData(
        state.package2019Transportation || state
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getDisturbanceStopsData());
    }
  })
)(DisturbanceStops);
