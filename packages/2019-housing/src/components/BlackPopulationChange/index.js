import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isLoaded } from "reduxful";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import blackPopulationChangeMeta from "./blackPopulationChangeMeta";
import api from "../../state/black-population-change/api";

const BlackPopulationChange = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
  }, [
    /*
    https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

    Add second argument to prevent useEffect running init() again
    */
  ]);

  const loading =
    !isLoaded(data.ncdbYearly1990) ||
    !isLoaded(data.ncdbYearly2017) ||
    !isLoaded(data.ncdbCensusTractMap);

  return (
    <CivicCard
      cardMeta={blackPopulationChangeMeta}
      isLoading={loading}
      data={data}
      Layout={Layout}
    />
  );
};

BlackPopulationChange.displayName = "BlackPopulationChange";

BlackPopulationChange.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({
    ncdbYearly1990: resourceShape,
    ncdbCensusTractMap: resourceShape
  }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      ncdbYearly1990: api.selectors.getNcdbYearlyData(
        state.package2019Housing || state,
        {
          limit: 500,
          metroname: "Portland-Vancouver-Hillsboro, OR-WA",
          year: 1990
        }
      ),
      ncdbYearly2017: api.selectors.getNcdbYearlyData(
        state.package2019Housing || state,
        {
          limit: 500,
          metroname: "Portland-Vancouver-Hillsboro, OR-WA",
          year: 2017
        }
      ),
      ncdbCensusTractMap: api.selectors.getNcdbCensusTractMap(
        state.package2019Housing || state,
        { limit: 500 }
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(
        api.actionCreators.getNcdbYearlyData({
          limit: 500,
          metroname: "Portland-Vancouver-Hillsboro, OR-WA",
          year: 1990
        })
      );
      dispatch(
        api.actionCreators.getNcdbYearlyData({
          limit: 500,
          metroname: "Portland-Vancouver-Hillsboro, OR-WA",
          year: 2017
        })
      );
      dispatch(
        api.actionCreators.getNcdbCensusTractMap({
          limit: 500
        })
      );
    }
  })
)(BlackPopulationChange);
