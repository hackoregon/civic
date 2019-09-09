import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import homeAppreciationMeta from "./homeAppreciationMeta";
import api from "../../state/home-appreciation/api";

const HomeAppreciation = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
  }, [init]);

  return (
    <CivicCard cardMeta={homeAppreciationMeta} data={data} Layout={Layout} />
  );
};

HomeAppreciation.displayName = "HomeAppreciation";

HomeAppreciation.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({
    annualHomeAppreciation: resourceShape,
    homeownershipByRace: resourceShape,
    homeInflationData: resourceShape
  }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      annualHomeAppreciation: api.selectors.getAnnualHomeAppreciationData(
        state.package2019Housing || state,
        { limit: 40 }
      ),
      homeownershipByRace: api.selectors.getHomeownershipByRaceData(
        state.package2019Housing || state,
        { yr: 1990 }
      ),
      homeInflationData: api.selectors.getHomeInflationData(
        state.package2019Housing || state,
        { limit: 6000 }
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getAnnualHomeAppreciationData({ limit: 40 }));
      dispatch(api.actionCreators.getHomeownershipByRaceData({ yr: 1990 }));
      dispatch(api.actionCreators.getHomeInflationData({ limit: 6000 }));
    }
  })
)(HomeAppreciation);
