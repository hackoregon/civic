import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import systemWideSummaryMeta from "./systemWideSummaryMeta";
import api from "../../state/system-wide-summary/api";

const SystemWideSummary = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CivicCard cardMeta={systemWideSummaryMeta} data={data} Layout={Layout} />
  );
};

SystemWideSummary.displayName = "SystemWideSummary";

SystemWideSummary.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ busSystemWideSummary: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      busSystemWideSummary: api.selectors.getBusSystemWideSummaryData(
        state.package2019Transportation || state
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getBusSystemWideSummaryData());
    }
  })
)(SystemWideSummary);
