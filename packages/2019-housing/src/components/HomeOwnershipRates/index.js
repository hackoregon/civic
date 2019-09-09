import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import homeOwnershipRatesMeta from "./homeOwnershipRatesMeta";
import api from "../../state/home-ownership-rates/api";

const HomeOwnershipRates = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
  }, [init]);

  return (
    <CivicCard cardMeta={homeOwnershipRatesMeta} data={data} Layout={Layout} />
  );
};

HomeOwnershipRates.displayName = "HomeOwnershipRates";

HomeOwnershipRates.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ homeownershipByRace: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      homeownershipByRace: api.selectors.getHomeownershipByRaceData(
        state.package2019Housing || state,
        { limit: 50 }
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getHomeownershipByRaceData({ limit: 50 }));
    }
  })
)(HomeOwnershipRates);
