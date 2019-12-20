import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import holcRedliningMeta from "./holcRedliningMeta";
import api from "../../state/holc-redlining/api";

const HolcRedlining = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <CivicCard cardMeta={holcRedliningMeta} data={data} Layout={Layout} />;
};

HolcRedlining.displayName = "HolcRedlining";
HolcRedlining.tags = holcRedliningMeta().tags;

HolcRedlining.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ redliningMap: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      redliningMap: api.selectors.getRedliningMapData(
        state.package2019Housing || state,
        { limit: 100 }
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getRedliningMapData({ limit: 100 }));
    }
  })
)(HolcRedlining);
