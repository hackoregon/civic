/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import PropTypes from "prop-types";

import React from "react";
import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';

import {
  CivicStoryCard,
  Slider,
  Dropdown
} from "@hackoregon/component-library";

import "@hackoregon/component-library/assets/global.styles.css";
import "@hackoregon/component-library/assets/vendor/react-select.min.css";

import { fetchAffordabilityData } from "../../state/affordability/actions";
import { fetchRentData } from "../../state/rent/actions";
import { fetchNeighborhoods } from "../../state/neighborhoods/actions";
import { fetchHouseholdsData } from "../../state/households/actions";
import { fetchPopulationsData } from "../../state/populations/actions";
import {
  isAnyCallPending,
  getCombinedNeighborhoodsData,
  getCombinedDemographicData
} from "../../state/globalSelectors";
import Map from "../Map";
import CustomSlider from "../CustomSlider";
import DemographicDetailView from "../DemographicDetailView";
import TempProdVsCost from "../TempProdVsCost";
import TempVoterRegistration from "../TempVoterRegistration";
import MapLegend from "../MapLegend";
import "./app.styles.css";

import {
  updateOtherUnitSize,
  updateOtherDemographic,
  updateUserIncome,
  updateUserUnitSize,
  updateNeighborhood
} from "../../state/parameters/actions";
import {
  getUserIncome,
  getUserUnitSize,
  getOtherDemographic,
  getOtherUnitSize
} from "../../state/parameters/selectors";
import {
  DEMOGRAPHICS,
  HOUSING_TYPES,
  DEFAULT_INCOME,
  MIN_INCOME,
  MAX_INCOME
} from "../../utils/data-constants";

const parameterGroupStyle = {
  display: "inline-block",
  verticalAlign: "top",
  width: "50%",
  minWidth: "340px"
};

const mapContainerStyles = {
  background: "#f3f3f3",
  borderBottom: "1px solid #ddd",
  padding: "10px"
};

const mapStyles = {
  border: "1px solid #ddd"
};

const tooltipStyles = {
  background: "#f3f3f3",
  padding: "30px",
  position: "relative",
  zIndex: "1001"
};

const arrowHackStyles = {
  background: "#f3f3f3",
  width: "100px",
  height: "100px",
  transform: "rotate(45deg) translate(-30%, -30%)",
  margin: "auto",
  position: "absolute",
  zIndex: "1000",
  left: "0",
  right: "0",
  border: "1px solid #ddd"
};

const textAlignCenter = {
  textAlign: "center"
};

export class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllData();
  }

  render() {
    const {
      neighborhoodData,
      demographicData,
      userIncome,
      userUnitSize,
      setUserIncome,
      otherDemographic,
      setOtherDemographic,
      setUnitSize,
      setNeighborhood
    } = this.props;

    const activeNeighborhood =
      neighborhoodData &&
      demographicData &&
      neighborhoodData.features.find(n => n.id === demographicData.id);

    return (
      <div>
        <CivicStoryCard
          footer={false}
          watermark={<div />}
          title="Map Your Affordability"
        >
          <p className="description" style={textAlignCenter}>
            Compare your income to the average income of common demographics.
          </p>
          <div>
            <div style={parameterGroupStyle}>
              <h3 style={textAlignCenter}>
                Your income: ${userIncome.toFixed(2)}/hr
              </h3>
              <CustomSlider
                min={MIN_INCOME}
                max={MAX_INCOME}
                value={userIncome}
                onChange={setUserIncome}
              />
            </div>
            <div style={parameterGroupStyle}>
              <h3 style={textAlignCenter}>Housing Type </h3>
              <Dropdown
                value={userUnitSize.value}
                onChange={event => setUnitSize(event)}
                options={HOUSING_TYPES}
              />
              <h3 style={textAlignCenter}>See How Other Portlanders Compare</h3>
              <Dropdown
                value={otherDemographic}
                onChange={event => setOtherDemographic(event)}
                options={DEMOGRAPHICS}
              />
            </div>
          </div>
          <div style={mapContainerStyles}>
            <MapLegend otherDemographicLabel={otherDemographic.label || ""} />
            <div style={mapStyles}>
              <Map
                neighborhoodData={neighborhoodData}
                activeNeighborhood={activeNeighborhood}
                onSelect={({ object }) => setNeighborhood(object)}
              />
            </div>
            <div style={arrowHackStyles} />
            <div style={tooltipStyles}>
              <DemographicDetailView demographics={demographicData} />
            </div>
          </div>
        </CivicStoryCard>
        <TempProdVsCost />
        <TempVoterRegistration />
      </div>
    );
  }
}

App.displayName = "App";
App.defaultProps = {
  children: <div />,
  neighborhoodData: {},
  demographicData: {},
  userIncome: DEFAULT_INCOME,
  userUnitSize: HOUSING_TYPES[0],
  otherDemographic: DEMOGRAPHICS[0],
  isLoading: false,
  setUserIncome() {},
  setOtherDemographic() {},
  setNeighborhood() {},
  fetchAllData() {},
  setUnitSize() {}
};

App.propTypes = {
  neighborhoodData: PropTypes.object,
  demographicData: PropTypes.object,
  setOtherDemographic: PropTypes.func,
  otherDemographic: PropTypes.object,
  userIncome: PropTypes.number,
  userUnitSize: PropTypes.object,
  setUserIncome: PropTypes.func,
  setUnitSize: PropTypes.func,
  setNeighborhood: PropTypes.func,
  fetchAllData: PropTypes.func
};

const mapDispatch = dispatch => ({
  fetchAllData() {
    dispatch(fetchAffordabilityData());
    dispatch(fetchRentData());
    dispatch(fetchNeighborhoods());
    dispatch(fetchHouseholdsData());
    dispatch(fetchPopulationsData());
  },

  setUnitSize(size) {
    dispatch(updateOtherUnitSize(size));
    dispatch(updateUserUnitSize(size));

    dispatch(fetchAffordabilityData());
    dispatch(fetchRentData());
  },

  setOtherDemographic(demographic) {
    dispatch(updateOtherDemographic(demographic));
    dispatch(fetchAffordabilityData());
  },

  setUserIncome(income) {
    dispatch(updateUserIncome(income));
    // no call here, will filter
  },

  setNeighborhood(id) {
    dispatch(updateNeighborhood(id));
  }
});

const mapProps = state => {
  const fromState = state.housing || state;
  return {
    neighborhoodData: getCombinedNeighborhoodsData(fromState),
    demographicData: getCombinedDemographicData(fromState),
    isLoading: isAnyCallPending(fromState),
    userIncome: getUserIncome(fromState),
    userUnitSize: getUserUnitSize(fromState),
    otherDemographic: getOtherDemographic(fromState),
    otherUnitSize: getOtherUnitSize(fromState)
  };
};

export default connect(
  mapProps,
  mapDispatch
)(App);
