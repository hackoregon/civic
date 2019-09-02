import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import proactivePlanningMeta from "./proactivePlanningMeta";
import api from "../../state/proactive-planning/api";

const ProactivePlanning = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CivicCard cardMeta={proactivePlanningMeta} data={data} Layout={Layout} />
  );
};

ProactivePlanning.displayName = "ProactivePlanning";

ProactivePlanning.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ proactivePlanning: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      proactivePlanning: api.selectors.getProactivePlanningData(
        state.package2018DisasterResilience || state
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getProactivePlanningData());
    }
  })
)(ProactivePlanning);
