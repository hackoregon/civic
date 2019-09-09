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
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loading = !isLoaded(data.totalLoans);

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
HomeLoanApprovals.tags = homeLoanApprovalsMeta().tags;

HomeLoanApprovals.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ totalLoans: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      totalLoans: api.selectors.getTotalLoansData(
        state.package2019Housing || state,
        { limit: 500 }
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init(/* data */) {
      dispatch(api.actionCreators.getTotalLoansData({ limit: 500 }));
    }
  })
)(HomeLoanApprovals);
