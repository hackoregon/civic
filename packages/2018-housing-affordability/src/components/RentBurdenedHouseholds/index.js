/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import {
  CivicStoryCard,
  Dropdown,
  Collapsable,
  PieChart,
  GradientScale
} from "@hackoregon/component-library";
import { loader, error, gradientLabel, emphasis } from "../css-utils";

import {
  fetchAllRentBurdenCities,
  fetchRentBurdenCity,
  setRentBurdenCity
} from "../../state/rent-burden/actions";
import {
  isCityLoading,
  getCityError,
  getSelectedCity,
  getSelectedCityData,
  getSelectedCityRank,
  getAllCities,
  getChartData
} from "../../state/rent-burden/selectors";

export class RentBurdenedHouseholds extends React.Component {
  componentDidMount() {
    const { fetchAllCities, setCity } = this.props;
    fetchAllCities();
    setCity();
  }

  render() {
    const {
      isLoading,
      isError,
      allCities,
      selectedCity,
      selectedCityRank,
      setCity,
      chartData
    } = this.props;

    const cityOptions =
      allCities && allCities.map(c => ({ value: c, label: c }));

    const Loader = () => <div className={loader}>Loading...</div>;
    const ErrorMessage = () => (
      <div className={error}>Could not load data for this city.</div>
    );

    return (
      <CivicStoryCard
        title="Rent Burdened Households"
        slug="rent-burdened-households"
      >
        <p>
          A household is severely burdened when its monthly rent exceeds 50% of
          monthly income. In 2015, 24% of all households in the Portland region
          were severely burdened, up 8 percentage points from 2014. Nationally,
          Portland ranks 50 out of 100 in terms of cost burdened renters{" "}
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
          {isLoading && <Loader />}
          {isError && <ErrorMessage />}
          {selectedCityRank && (
            <div>
              <p>
                {selectedCity} ranks{" "}
                <strong className={emphasis}>
                  {selectedCityRank.rank}/{selectedCityRank.total}{" "}
                </strong>
                metropolitan areas with regards to the percentage of renter
                households that are severely burdened{" "}
                <strong className={emphasis}>2015</strong>. A rank of 1 is the
                smallest percentage of burdened households, while a rank of 100
                is the greatest percentage of burdened households.
              </p>
              <p>
                <strong className={gradientLabel}>Less burdened</strong>
                <GradientScale
                  domain={[1, selectedCityRank.total]}
                  primary={selectedCityRank.rank}
                  height={50}
                />
              </p>
            </div>
          )}
        </section>
        {chartData && (
          <section>
            <PieChart
              title="Cost Burden Rates for Renters in 2015"
              subtitle={selectedCity}
              data={chartData}
              innerRadius={90}
              dataLabel="label"
              dataValue="value"
            />
          </section>
        )}
        <Collapsable>
          <Collapsable.Section hidden>
            <p>
              Moderately burdened renters have housing costs of more than 30%
              and up to 50% of household income, and severely burdened renters
              have housing costs greater than 50%. In 2015, 24% of households
              were severely burdened, and 23% were moderately burdened, meaning
              that 47% of all renter households were burdened by housing costs.
            </p>
          </Collapsable.Section>
        </Collapsable>
      </CivicStoryCard>
    );
  }
}

RentBurdenedHouseholds.displayName = "RentBurdenedHouseholds";

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isCityLoading(state),
    allCities: getAllCities(state),
    selectedCity: getSelectedCity(state),
    selectedCityData: getSelectedCityData(state),
    selectedCityRank: getSelectedCityRank(state),
    chartData: getChartData(state),
    isError: getCityError(state)
  }),
  dispatch => ({
    fetchAllCities() {
      dispatch(fetchAllRentBurdenCities());
    },
    setCity(city = {}) {
      dispatch(fetchRentBurdenCity(city.value));
      dispatch(setRentBurdenCity(city.value));
    }
  })
)(RentBurdenedHouseholds);
