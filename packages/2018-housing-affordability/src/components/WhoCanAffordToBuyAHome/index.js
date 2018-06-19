import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';

import '@hackoregon/component-library/assets/vendor/react-select.min.css';

import { CivicStoryCard, LineChart, Dropdown } from '@hackoregon/component-library';

import {
  fetchAllPTICities,
  fetchPTICity,
  fetchPTICountry,
  setPTICity,
} from '../../state/price-to-income/actions';
import {
  isAllCitiesLoading,
  isCityDetailLoading,
  getCityError,
  getSelectedCity,
  getCityCountryChartData,
  getSelectedCityRank,
  getAllCities,
  isAnyLoading,
} from '../../state/price-to-income/selectors';

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

export class WhoCanAffordToBuyAHome extends React.Component {
  componentDidMount() {
    this.props.fetchAllCities();
    this.props.fetchCountry();
    this.props.setCity();
  }

  render() {
    const {
      isLoadingAllCities,
      isLoading,
      isError,
      selectedCity,
      chartData,
      allCities,
      selectedCityRank,
      setCity,
      isAnyLoading,
    } = this.props;

    const cityOptions = allCities && allCities.map(c => ({ value: c, label: c }));

    const Loader = () => <div className={loader}>Loading...</div>;
    const ErrorMessage = () => <div className={error}>Could not load data for this city.</div>;

    return (
      <CivicStoryCard
        title="Who Can Afford to Buy a Home in America?"
        slug="who-can-afford-to-buy-a-home"
      >
        <div>
          <strong>Search An Area</strong>
          {allCities && allCities.length && <Dropdown
            value={cityOptions.find(c => c.value === selectedCity)}
            onChange={setCity}
            options={cityOptions}
          />}
        </div>
        <section>
          {isAnyLoading && <Loader />}
          {chartData && (<div>
            <p>
              {selectedCity} ranks <strong className={emphasis}>{selectedCityRank.rank}/{selectedCityRank.total} </strong>
              for the median home price to median income ratio in <strong className={emphasis}>2016</strong>
            </p>
            <input
              disabled
              className={inputClass}
              type="range"
              min="1"
              value={selectedCityRank.rank}
              max={selectedCityRank.total}
            />
          </div>)}
        </section>
        <section>
          {isAnyLoading || (<div>
            <LineChart
              data={chartData}
              dataKey="year"
              dataValue="value"
              dataSeries="series"
              title={`${selectedCity} Median Home Price to Median Income Ratio`}
              subtitle="Compared to the United States Median"
              yLabel="Ratio"
              xLabel="Year"
              yNumberFormatter={n => Math.round(n * 100) / 100}
              xNumberFormatter={year => year}
            />
          </div>)}
          {isError && <ErrorMessage />}
        </section>
      </CivicStoryCard>
    );
  }
}

WhoCanAffordToBuyAHome.displayName = 'WhoCanAffordToBuyAHome';

export default connect(
  state => ({
    isLoadingAllCities: isAllCitiesLoading(state),
    isError: getCityError(state),
    selectedCity: getSelectedCity(state),
    allCities: getAllCities(state),
    chartData: getCityCountryChartData(state),
    selectedCityRank: getSelectedCityRank(state),
    isAnyLoading: isAnyLoading(state),
  }),
  dispatch => ({
    fetchAllCities() {
      dispatch(fetchAllPTICities());
    },
    fetchCountry() {
      dispatch(fetchPTICountry());
    },
    setCity(city = {}) {
      dispatch(fetchPTICity(city.value));
      dispatch(setPTICity(city.value));
    },
  })
)(WhoCanAffordToBuyAHome);
