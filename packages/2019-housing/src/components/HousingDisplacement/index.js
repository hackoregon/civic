import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isLoaded } from "reduxful";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import housingDisplacementMeta from "./housingDisplacementMeta";
import api from "../../state/housing-displacement/api";

const HousingDisplacement = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
  }, [
    /*
    https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

    Add second argument to prevent useEffect running init() again
    */
  ]);

  const loading = !isLoaded(data.homeownershipByRace);

  return (
    <CivicCard
      cardMeta={housingDisplacementMeta}
      isLoading={loading}
      data={data}
      Layout={Layout}
    />
  );
};

HousingDisplacement.displayName = "HousingDisplacement";

HousingDisplacement.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ homeownershipByRace: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      homeownershipByRace: api.selectors.getHomeownershipByRaceData(
        state.package2019Housing || state
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getHomeownershipByRaceData());
    }
  })
)(HousingDisplacement);
