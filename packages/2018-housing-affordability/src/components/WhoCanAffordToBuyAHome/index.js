/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";

import "@hackoregon/component-library/assets/vendor/react-select.min.css";
import {
  CivicStoryCard,
  LineChart,
  Dropdown,
  Collapsable,
  GradientScale
} from "@hackoregon/component-library";

import { loader, error, gradientLabel, emphasis } from "../css-utils";
import {
  fetchAllPTICities,
  fetchPTICity,
  fetchPTICountry,
  setPTICity
} from "../../state/price-to-income/actions";
import {
  isAllCitiesLoading,
  getCityError,
  getSelectedCity,
  getCityCountryChartData,
  getSelectedCityRank,
  getAllCities,
  isAnyLoading
} from "../../state/price-to-income/selectors";

export class WhoCanAffordToBuyAHome extends React.Component {
  componentDidMount() {
    const { fetchAllCities, fetchCountry, setCity } = this.props;
    fetchAllCities();
    fetchCountry();
    setCity();
  }

  render() {
    const {
      isError,
      selectedCity,
      chartData,
      allCities,
      selectedCityRank,
      setCity,
      // eslint-disable-next-line no-shadow
      isAnyLoading
    } = this.props;

    const cityOptions =
      allCities && allCities.map(c => ({ value: c, label: c }));

    const Loader = () => <div className={loader}>Loading...</div>;
    const ErrorMessage = () => (
      <div className={error}>Could not load data for this city.</div>
    );

    return (
      <CivicStoryCard
        title="Who Can Afford to Buy a Home in America?"
        slug="who-can-afford-to-buy-a-home"
      >
        <p>
          One metric that tracks housing affordability is the median home
          price-to-median income ratio. This measure takes the median home price
          and divides by the median income. The idea is, how long will it take
          to pay off a home if 100% of the owner’s income was used. Higher
          ratios indicate that home prices are less affordable, while smaller
          ratios are indicative of greater affordability. For example, if your
          home cost $100,000 and your income is $50,000, the ratio would be 2,
          or the cost of $500,000 and an income of $50,000 would be 10.
        </p>

        <div>
          <strong>Search An Area</strong>
          {allCities && allCities.length && (
            <Dropdown
              value={cityOptions.find(c => c.value === selectedCity)}
              onChange={setCity}
              options={cityOptions}
            />
          )}
        </div>
        <section>
          {isAnyLoading && <Loader />}
          {chartData && (
            <div>
              <p>
                {selectedCity} ranks{" "}
                <strong className={emphasis}>
                  {selectedCityRank.rank}/{selectedCityRank.total}{" "}
                </strong>
                for the median home price to median income ratio in{" "}
                <strong className={emphasis}>2016</strong>
              </p>
              <p>
                <strong className={gradientLabel}>More affordable</strong>
                <GradientScale
                  domain={[1, selectedCityRank.total]}
                  primary={selectedCityRank.rank}
                  height={50}
                />
              </p>
            </div>
          )}
        </section>
        <section>
          {isAnyLoading || (
            <div>
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
            </div>
          )}
          {isError && <ErrorMessage />}
          <Collapsable>
            <Collapsable.Section>
              <div>
                <p>
                  In the early 1990s, the Portland Metropolitan ratio was ~2.5.
                  This number steadily increased up until 2006, reaching a high
                  of 5.35. Following the recession, the ratio showed a downturn;
                  however starting in 2011, it started to bounce back, and
                  recent values are on par with the previous maximum. In 2016,
                  Portland ranked 349 out of 381 Metropolitan areas with regards
                  to affordability.
                </p>
                <p>
                  While the rising cost of home ownership is clearly evident in
                  Portland, this is happening throughout the state. Several
                  other areas are also experiencing challenges with regards to
                  increasing home prices, including Grants Pass, Corvallis,
                  Medford, Bend-Redmond, Eugene, Albany, and Salem.
                </p>
              </div>
            </Collapsable.Section>
          </Collapsable>
        </section>
      </CivicStoryCard>
    );
  }
}

WhoCanAffordToBuyAHome.displayName = "WhoCanAffordToBuyAHome";

export default connect(
  state => ({
    isLoadingAllCities: isAllCitiesLoading(state),
    isError: getCityError(state),
    selectedCity: getSelectedCity(state),
    allCities: getAllCities(state),
    chartData: getCityCountryChartData(state),
    selectedCityRank: getSelectedCityRank(state),
    isAnyLoading: isAnyLoading(state)
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
    }
  })
)(WhoCanAffordToBuyAHome);
