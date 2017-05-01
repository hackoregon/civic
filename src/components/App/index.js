/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';
import { connect } from 'react-redux';
import Slider from '@hackoregon/component-library/lib/Slider/Slider';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import Dropdown from '@hackoregon/component-library/lib/Dropdown/Dropdown';
import classNames from 'classnames/bind';
import { fetchAffordabilityData } from '../../state/affordability/actions';
import { fetchRentData } from '../../state/rent/actions';
import { fetchNeighborhoods } from '../../state/neighborhoods/actions';
import { fetchHouseholdsData } from '../../state/households/actions';
import { fetchPopulationsData } from '../../state/populations/actions';
import {
  isAnyCallPending,
  getCombinedNeighborhoodsData,
  getCombinedDemographicData,
} from '../../state/globalSelectors';
import Map from '../Map';
import DemographicDetailView from '../DemographicDetailView';
import TempProdVsCost from '../TempProdVsCost';
import styles from './app.styles.css';

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

const cx = classNames.bind(styles);

const dropdowns = cx({ dropdowns: true });

const parameterGroupStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%',
  minWidth: '340px',
};

const mapContainerStyles = {
  background: '#f3f3f3',
  borderBottom: '1px solid #ddd',
  padding: '10px',
};

const mapStyles = {
  border: '1px solid #ddd',
};

const tooltipStyles = {
  background: '#f3f3f3',
  padding: '30px',
  position: 'relative',
  zIndex: '1001',
};

const arrowHackStyles = {
  background: '#f3f3f3',
  width: '100px',
  height: '100px',
  transform: 'rotate(45deg) translate(-30%, -30%)',
  margin: 'auto',
  position: 'absolute',
  zIndex: '1000',
  left: '0',
  right: '0',
  border: '1px solid #ddd',
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
      setNeighborhood,
    } = this.props;

    return (
      <div>
        <StoryCard title="Map Your Affordability" collectionId="housing" cardId="affordability-map">
          <p className="description">Compare your income to the average income of common demographics.</p>
          <div>
            <div style={parameterGroupStyle}>
              <h3>Your income: ${userIncome.toFixed(2)}/hr</h3>
              <Slider
                min={MIN_INCOME}
                max={MAX_INCOME}
                value={userIncome}
                onChange={setUserIncome}
              />
            </div>
            <div className={dropdowns} style={parameterGroupStyle}>
              <h3>Housing Type </h3>
              <Dropdown
                value={userUnitSize.value}
                onChange={event => setUnitSize(event)}
                options={HOUSING_TYPES}
              />
              <h3>See How Other Portlanders Compare</h3>
              <Dropdown
                value={otherDemographic}
                onChange={event => setOtherDemographic(event)}
                options={DEMOGRAPHICS}
              />
            </div>
          </div>
          <div style={mapContainerStyles}>
            <div style={mapStyles}>
              <Map
                neighborhoods={neighborhoodData}
                onSelect={id => setNeighborhood(id)}
                activeNeighborhood={demographicData ? demographicData.id : 0}
              />
            </div>
            <div style={arrowHackStyles}></div>
            <div style={tooltipStyles}>
              <DemographicDetailView demographics={demographicData} />
            </div>
          </div>
        </StoryCard>
        <TempProdVsCost />
      </div>
    );
  }
}

App.displayName = 'App';
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
  setUnitSize() {},
};

App.propTypes = {
  neighborhoodData: React.PropTypes.object,
  demographicData: React.PropTypes.object,
  setOtherDemographic: React.PropTypes.func,
  otherDemographic: React.PropTypes.object,
  userIncome: React.PropTypes.number,
  userUnitSize: React.PropTypes.object,
  setUserIncome: React.PropTypes.func,
  setUnitSize: React.PropTypes.func,
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
  },
});

const mapProps = state => ({
  neighborhoodData: getCombinedNeighborhoodsData(state),
  demographicData: getCombinedDemographicData(state),
  isLoading: isAnyCallPending(state),
  userIncome: getUserIncome(state),
  userUnitSize: getUserUnitSize(state),
  otherDemographic: getOtherDemographic(state),
  otherUnitSize: getOtherUnitSize(state),
});

export default connect(mapProps, mapDispatch)(App);
