import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import morningRushMeta from "./morningRushMeta";
import api from "../../state/morning-rush/api";

const MorningRush = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
  }, [init]); // eslint-disable=line

  return <CivicCard cardMeta={morningRushMeta} data={data} Layout={Layout} />;
};

MorningRush.displayName = "MorningRush";

MorningRush.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ onOffs: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      onOffs: api.selectors.getOnOffsData(
        // state fallback needed to for 2018 packages and when running package-specific dev server
        // state.packageProjectName || state
        state.package2019Transportation || state
      ),
      busAmRushSummary: api.selectors.getBusAmRushSummaryData(
        state.package2019Transportation || state
      )
    }
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getOnOffsData());
      dispatch(api.actionCreators.getBusAmRushSummaryData());
    }
  })
)(MorningRush);
