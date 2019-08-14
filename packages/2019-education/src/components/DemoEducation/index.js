import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isLoaded } from "reduxful";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import DemoEducationMeta from "./demoEducationMeta";
import api from "../../state/demo-education/api";

const DemoEducation = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
  }, [
    /*
    https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

    Add second argument to prevent useEffect running init() again
    */
  ]);

  // FIXME: mockRidershipOverTime should be a variable
  const loading = !isLoaded(data.mockRidershipOverTime);

  return (
    <CivicCard
      cardMeta={DemoEducationMeta}
      isLoading={loading}
      data={data}
      Layout={Layout}
    />
  );
};

DemoEducation.displayName = "DemoEducation";

DemoEducation.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ mockRidershipOverTime: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      // FIXME: mockRidershipOverTime should be a variable
      mockRidershipOverTime: api.selectors.getMockRidershipData(
        state.package2019Education || state
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      // FIXME: mockRidershipOverTime should be a variable
      dispatch(api.actionCreators.getMockRidershipData());
    }
  })
)(DemoEducation);
