import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import householdIncomeByRaceMeta from "./householdIncomeByRaceMeta";
import api from "../../state/household-income-by-race/api";

const HouseholdIncomeByRace = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CivicCard
      cardMeta={householdIncomeByRaceMeta}
      data={data}
      Layout={Layout}
    />
  );
};

HouseholdIncomeByRace.displayName = "HouseholdIncomeByRace";

HouseholdIncomeByRace.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ householdIncomeByRace: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      householdIncomeByRace: api.selectors.getHouseholdIncomeByRaceData(
        state.package2019Housing || state,
        { limit: 50 }
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getHouseholdIncomeByRaceData({ limit: 50 }));
    }
  })
)(HouseholdIncomeByRace);
