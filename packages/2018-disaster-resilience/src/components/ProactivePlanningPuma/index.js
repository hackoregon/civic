import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import proactivePlanningPumaMeta from "./proactivePlanningPumaMeta";
import api from "../../state/proactive-planning-puma/api";

const ProactivePlanningPuma = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CivicCard
      cardMeta={proactivePlanningPumaMeta}
      data={data}
      Layout={Layout}
    />
  );
};

ProactivePlanningPuma.displayName = "ProactivePlanningPuma";

ProactivePlanningPuma.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ proactivePlanningPuma: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      proactivePlanningPuma: api.selectors.getProactivePlanningPumaData(
        state.package2018DisasterResilience || state
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getProactivePlanningPumaData());
    }
  })
)(ProactivePlanningPuma);
