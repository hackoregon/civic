import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import youAndYourNeighborsMeta from "./youAndYourNeighborsMeta";
import api from "../../state/you-and-your-neighbors/api";

const YouAndYourNeighbors = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

  return (
    <CivicCard cardMeta={youAndYourNeighborsMeta} data={data} Layout={Layout} />
  );
};

YouAndYourNeighbors.displayName = "YouAndYourNeighbors";
YouAndYourNeighbors.tags = youAndYourNeighborsMeta().tags;

YouAndYourNeighbors.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ disasterNeighborhoodGrid: resourceShape }),
  Layout: PropTypes.func
};

const mapStateToProps = state => ({
  data: {
    disasterNeighborhoodGrid: api.selectors.getYouAndYourNeighbors(
      state.package2018DisasterResilience || state
    )
  }
  // state.packageProjectName || state needed to make work in the project package and 2018 package
});

const mapDispatchToProps = dispatch => ({
  init() {
    dispatch(api.actionCreators.getYouAndYourNeighbors());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouAndYourNeighbors);
