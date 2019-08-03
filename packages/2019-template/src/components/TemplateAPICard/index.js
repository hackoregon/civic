import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isLoaded } from "reduxful";
import { resourceShape } from "reduxful/react-addons";
import { CivicStoryCard } from "@hackoregon/component-library";

import api from "../../state/plateau-in-ridership/api";

const TemplateAPICard = ({ init, data }) => {
  useEffect(() => {
    init();
  }, [
    /*
    https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

    Add second argument to prevent useEffect running init() again
    */
  ]);

  const loading = !isLoaded(data.ridershipOverTime);

  return (
    <CivicStoryCard
      title="Plateau in Ridership"
      slug="plateau-in-ridership"
      loading={loading}
    >
      <p>
        Newly released findings from TriMet shows a slow decline in public
        transit ridership relative to population growth over the last 10 years,
        a pattern which appears to be consistent across the nation. While the
        cause of decline in ridership doesn&apos;t point to a single variable,
        it&apos;s been suggested that housing affordability and economic
        displacement may play a role in this phenomenon.
      </p>
    </CivicStoryCard>
  );
};

TemplateAPICard.displayName = "TemplateAPICard";

TemplateAPICard.propTypes = {
  init: PropTypes.func,
  data: resourceShape
};

export default connect(
  state => ({
    data: {
      ridershipOverTime: api.selectors.getRidershipOverTime(
        state.template2019 || state
      )
    }
    // state.packageName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getRidershipOverTime());
    }
  })
)(TemplateAPICard);
