import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isLoaded } from "reduxful";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import homeLoanApprovalsMeta from "./homeLoanApprovalsMeta";
import api from "../../state/home-loan-approvals/api";

const HomeLoanApprovals = ({ init, data, Layout }) => {
  useEffect(() => {
    init(data);
  }, [
    /*
    https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

    Add second argument to prevent useEffect running init() again
    */
  ]);

  const loading =
    !isLoaded(data.totalLoans) || !isLoaded(data.ncdbCensusTractMap);

  return (
    <CivicCard
      cardMeta={homeLoanApprovalsMeta}
      isLoading={loading}
      data={data}
      Layout={Layout}
    />
  );
};

HomeLoanApprovals.displayName = "HomeLoanApprovals";

HomeLoanApprovals.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ totalLoans: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      totalLoans: api.selectors.getTotalLoansData(
        state.package2019Housing || state
      )
    },
    ncdbCensusTractMap: api.selectors.getNcdbCensusTractMap(
      state.package2019Housing || state,
      { limit: 500 }
    )
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init(data) {
      dispatch(api.actionCreators.getTotalLoansData());
      if (!data.ncdbCensusTractMap) {
        dispatch(
          api.actionCreators.getNcdbCensusTractMap({
            limit: 500
          })
        );
      }
    }
  })
)(HomeLoanApprovals);
