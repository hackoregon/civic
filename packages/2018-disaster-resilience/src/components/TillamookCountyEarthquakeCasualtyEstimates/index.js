import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import tillamookCountyEarthquakeCasualtyEstimatesMeta from "./tillamookCountyEarthquakeCasualtyEstimatesMeta";
import api from "../../state/tillamook-county-earthquake-casualty-estimates/api";

const TillamookCountyEarthquakeCasualtyEstimates = ({ init, data, Layout }) => {
  useEffect(
    () => {
      init();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [init]
  );

  return (
    <CivicCard
      cardMeta={tillamookCountyEarthquakeCasualtyEstimatesMeta}
      data={data}
      Layout={Layout}
    />
  );
};

TillamookCountyEarthquakeCasualtyEstimates.displayName =
  "TillamookCountyEarthquakeCasualtyEstimates";

TillamookCountyEarthquakeCasualtyEstimates.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ earthquakeCasualties: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      earthquakeCasualties: api.selectors.getEarthquakeCasualtiesData(
        state.package2018DisasterResilience || state
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getEarthquakeCasualtiesData());
    }
  })
)(TillamookCountyEarthquakeCasualtyEstimates);
