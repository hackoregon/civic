import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import earthquakeDamageEstimatesForBuildingsInTillamookCountyMeta from "./earthquakeDamageEstimatesForBuildingsInTillamookCountyMeta";
import api from "../../state/earthquake-damage-estimates-for-buildings-in-tillamook-county/api";

const EarthquakeDamageEstimatesForBuildingsInTillamookCounty = ({
  init,
  data,
  Layout
}) => {
  useEffect(
    () => {
      init();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [init]
  );

  return (
    <CivicCard
      cardMeta={earthquakeDamageEstimatesForBuildingsInTillamookCountyMeta}
      data={data}
      Layout={Layout}
    />
  );
};

EarthquakeDamageEstimatesForBuildingsInTillamookCounty.displayName =
  "EarthquakeDamageEstimatesForBuildingsInTillamookCounty";

EarthquakeDamageEstimatesForBuildingsInTillamookCounty.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ damageEstimates: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      damageEstimates: api.selectors.getDamageEstimatesData(
        state.package2018DisasterResilience || state
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getDamageEstimatesData());
    }
  })
)(EarthquakeDamageEstimatesForBuildingsInTillamookCounty);
