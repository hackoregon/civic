import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import aduDistributionsMeta from "./aduDistributionsMeta";
import api from "../../state/adu-distributions/api";

const AduDistributions = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CivicCard cardMeta={aduDistributionsMeta} data={data} Layout={Layout} />
  );
};

AduDistributions.displayName = "AduDistributions";

AduDistributions.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ residentialBuildingPermit: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      residentialBuildingPermit: api.selectors.getResidentialBuildingPermitData(
        state.package2019Housing || state,
        { is_adu: true, limit: 5000 }
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(
        api.actionCreators.getResidentialBuildingPermitData({
          is_adu: true,
          limit: 5000
        })
      );
    }
  })
)(AduDistributions);
