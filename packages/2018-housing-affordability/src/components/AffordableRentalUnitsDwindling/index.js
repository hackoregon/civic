import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';

import '@hackoregon/component-library/assets/vendor/react-select.min.css';

import { HorizontalBarChart, CivicStoryCard, Dropdown } from '@hackoregon/component-library';
import { percentage } from '@hackoregon/component-library/src/utils/formatters';

import {
  fetchAllARUCities,
  fetchARUCity,
  setARUCity,
} from '../../state/affordable-rental-units/actions';
import {
  isAllCitiesLoading,
  isCityDetailLoading,
  getCityError,
  getSelectedCity,
  getSelectedCityData,
  getSelectedCityLowRank,
  getSelectedCityHighRank,
  getAllCities,
} from '../../state/affordable-rental-units/selectors';

const loader = css`
  background: #EEE;
  padding: 30px;
`;

const error = css`
  background: #FEE;
  color: #C00;
  padding: 30px;
`;

const inputClass = css`
  width: 100%;
`;

const emphasis = css`
  color: #000;
`;

const capitalize = str => str.length && str.split(' ')
  .reduce((full, word) => `${full} ${word[0].toUpperCase() + word.substring(1)}`, '')
  .trim();

export class AffordableRentalUnitsDwindling extends React.Component {
  componentDidMount() {
    this.props.fetchAllCities();
    this.props.setCity();
  }

  render() {
    const {
      isLoadingAllCities,
      isLoading,
      isError,
      selectedCity,
      selectedCityData,
      allCities,
      selectedCityLowRank,
      selectedCityHighRank,
      setCity,
    } = this.props;

    const cityOptions = allCities && allCities.map(c => ({ value: c, label: capitalize(c) }));

    const Loader = () => <div className={loader}>Loading...</div>;
    const ErrorMessage = () => <div className={error}>Could not load data for this city.</div>;

    return (
      <CivicStoryCard
        title="Affordable Rental Units are Dwindling"
        slug="affordable-rental-units-are-dwindling"
      >
        <div>
          <strong>Search An Area</strong>
          {allCities && allCities.length && <Dropdown
            value={cityOptions.find(c => c.value === capitalize(selectedCity))}
            onChange={setCity}
            options={cityOptions}
          />}
        </div>
        <section>
          {isLoading && <Loader />}
          {selectedCityData && (<div>
            <p>
              {capitalize(selectedCity)} ranks <strong className={emphasis}>{selectedCityLowRank.rank}/{selectedCityLowRank.total} </strong>
              for new units that cost <strong className={emphasis}>&lt;$800/mo</strong>
            </p>
            <input
              disabled
              className={inputClass}
              type="range"
              min="1"
              value={selectedCityLowRank.rank}
              max={selectedCityLowRank.total}
            />
          </div>)}
          {selectedCityData && (<div>
            <p>
              {capitalize(selectedCity)} ranks <strong className={emphasis}>{selectedCityHighRank.rank}/{selectedCityHighRank.total} </strong>
              for new units that cost <strong className={emphasis}>&gt;$2,000/mo</strong>
            </p>
            <input
              disabled
              className={inputClass}
              type="range"
              min="1"
              value={selectedCityHighRank.rank}
              max={selectedCityHighRank.total}
            />
          </div>)}
        </section>
        <section>
          {selectedCityData && (<div>
            <HorizontalBarChart
              data={selectedCityData}
              dataLabel="datatype"
              dataValue="value"
              dataValueFormatter={percentage}
              title={`${capitalize(selectedCity)} Change in Total Units By Cost Per Month`}
              yLabel="Cost Per Month Brackets"
              xLabel="Percent Change in Total Units"
            />
          </div>)}
          {isError && <ErrorMessage />}
        </section>
      </CivicStoryCard>
    );
  }
}

AffordableRentalUnitsDwindling.displayName = 'AffordableRentalUnitsDwindling';

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoadingAllCities: isAllCitiesLoading(state),
    isLoading: isCityDetailLoading(state),
    isError: getCityError(state),
    selectedCity: getSelectedCity(state),
    allCities: getAllCities(state),
    selectedCityData: getSelectedCityData(state),
    selectedCityLowRank: getSelectedCityLowRank(state),
    selectedCityHighRank: getSelectedCityHighRank(state),
  }),
  dispatch => ({
    fetchAllCities() {
      dispatch(fetchAllARUCities());
    },
    setCity(city = {}) {
      dispatch(fetchARUCity(city.value));
      dispatch(setARUCity(city.value));
    },
  })
)(AffordableRentalUnitsDwindling);
