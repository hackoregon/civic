/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';
import { connect } from 'react-redux';

import Slider from '@hackoregon/component-library/lib/Slider/Slider';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';

import { fetchAffordabilityData } from '../../state/affordability/actions';
import { fetchRentData } from '../../state/rent/actions';
import { fetchNeighborhoods } from '../../state/neighborhoods/actions';
import { fetchHouseholdsData } from '../../state/households/actions';
import { fetchPopulationsData } from '../../state/populations/actions';
import { isAnyCallPending, getCombinedNeighborhoodsData } from '../../state/globalSelectors';
import Map from '../Map';

import {
  updateOtherUnitSize,
  updateOtherDemographic,
  updateUserIncome,
  updateUserUnitSize,
  updateNeighborhood,
} from '../../state/parameters/actions';
import {
  getUserIncome,
  getUserUnitSize,
  getOtherDemographic,
  getOtherUnitSize,
} from '../../state/parameters/selectors';
import {
  DEMOGRAPHICS,
  HOUSING_TYPES,
  DEFAULT_INCOME,
  MIN_INCOME,
  MAX_INCOME,
} from '../../utils/data-constants';

export class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllData();
  }

  render() {
    const {
      neighborhoodData,
      userIncome,
      userUnitSize,
      setUserIncome,
      setUserUnitSize,
      otherDemographic,
      otherUnitSize,
      setOtherUnitSize,
      setOtherDemographic,
      setNeighborhood,
    } = this.props;

    return (
      <div>
        <StoryCard title="Portland Neighborhood Affordability" collectionId="housing" cardId="affordability-map">
          <p className="description">Compare your income to the average income of common demographics.</p>
          <strong>Your income: ${userIncome.toFixed(2)}/hr</strong>
          <Slider
            min={MIN_INCOME}
            max={MAX_INCOME}
            value={userIncome}
            onChange={setUserIncome}
          />
          <p className="description">
            <strong>Your Housing Type: </strong>
            <select value={userUnitSize} onChange={event => setUserUnitSize(event.target.value)}>
              {HOUSING_TYPES.map(size => (
                <option value={size} key={size}>{size}</option>
              ))}
            </select>
          </p>
          <p className="description">
            <strong>Others Housing Type: </strong>
            <select value={otherUnitSize} onChange={event => setOtherUnitSize(event.target.value)}>
              {HOUSING_TYPES.map(size => (
                <option value={size} key={size}>{size}</option>
              ))}
            </select>
          </p>
          <p className="description">
            <strong>Others Demographic: </strong>
            <select
              value={otherDemographic}
              onChange={event => setOtherDemographic(event.target.value)}
            >
              {DEMOGRAPHICS.map(demo => (
                <option value={demo} key={demo}>{demo}</option>
              ))}
            </select>
          </p>
          <Map neighborhoods={neighborhoodData} onSelect={id => setNeighborhood(id)} />
        </StoryCard>
      </div>
    );
  }
}

App.displayName = 'App';
App.defaultProps = {
  children: <div />,
  neighborhoodData: {},
  userIncome: DEFAULT_INCOME,
  userUnitSize: HOUSING_TYPES[0],
  otherDemographic: DEMOGRAPHICS[0],
  otherUnitSize: HOUSING_TYPES[0],
  isLoading: false,
  setUserIncome() {},
  setUserUnitSize() {},
  setOtherDemographic() {},
  setOtherUnitSize() {},
  setNeighborhood() {},
  fetchAllData() {},
};

App.propTypes = {
  neighborhoodData: React.PropTypes.object,
  setOtherDemographic: React.PropTypes.func,
  setOtherUnitSize: React.PropTypes.func,
  otherDemographic: React.PropTypes.string,
  otherUnitSize: React.PropTypes.string,
  userIncome: React.PropTypes.number,
  userUnitSize: React.PropTypes.string,
  setUserIncome: React.PropTypes.func,
  setUserUnitSize: React.PropTypes.func,
  setNeighborhood: React.PropTypes.func,
  fetchAllData: React.PropTypes.func,
};

const mapDispatch = dispatch => ({
  fetchAllData() {
    dispatch(fetchAffordabilityData());
    dispatch(fetchRentData());
    dispatch(fetchNeighborhoods());
    dispatch(fetchHouseholdsData());
    dispatch(fetchPopulationsData());
  },

  setOtherUnitSize(size) {
    dispatch(updateOtherUnitSize(size));
    dispatch(fetchAffordabilityData());
  },

  setOtherDemographic(demographic) {
    dispatch(updateOtherDemographic(demographic));
    dispatch(fetchAffordabilityData());
  },

  setUserIncome(income) {
    dispatch(updateUserIncome(income));
    // no call here, will filter
  },

  setUserUnitSize(size) {
    dispatch(updateUserUnitSize(size));
    dispatch(fetchRentData());
  },

  setNeighborhood(id) {
    dispatch(updateNeighborhood(id));
  },
});

const mapProps = state => ({
  neighborhoodData: getCombinedNeighborhoodsData(state),
  isLoading: isAnyCallPending(state),
  userIncome: getUserIncome(state),
  userUnitSize: getUserUnitSize(state),
  otherDemographic: getOtherDemographic(state),
  otherUnitSize: getOtherUnitSize(state),
});

export default connect(mapProps, mapDispatch)(App);
