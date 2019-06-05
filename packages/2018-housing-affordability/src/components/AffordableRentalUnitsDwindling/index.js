/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";

import "@hackoregon/component-library/assets/vendor/react-select.min.css";

import {
  HorizontalBarChart,
  CivicStoryCard,
  Dropdown,
  GradientScale,
  Collapsable
} from "@hackoregon/component-library";

import { civicFormat } from "@hackoregon/component-library/dist/utils";
import { loader, error, gradientLabel, emphasis } from "../css-utils";

import {
  fetchAllARUCities,
  fetchARUCity,
  setARUCity
} from "../../state/affordable-rental-units/actions";
import {
  isAllCitiesLoading,
  isCityDetailLoading,
  getCityError,
  getSelectedCity,
  getSelectedCityData,
  getSelectedCityLowRank,
  getSelectedCityHighRank,
  getAllCities,
  getChartData
} from "../../state/affordable-rental-units/selectors";

const capitalize = str =>
  str.length &&
  str
    .split(" ")
    .reduce(
      (full, word) => `${full} ${word[0].toUpperCase() + word.substring(1)}`,
      ""
    )
    .trim();

export class AffordableRentalUnitsDwindling extends React.Component {
  componentDidMount() {
    const { fetchAllCities, setCity } = this.props;
    fetchAllCities();
    setCity();
  }

  render() {
    const {
      isLoading,
      isError,
      selectedCity,
      selectedCityData,
      allCities,
      selectedCityLowRank,
      selectedCityHighRank,
      setCity,
      chartData
    } = this.props;

    const cityOptions =
      allCities && allCities.map(c => ({ value: c, label: capitalize(c) }));

    const Loader = () => <div className={loader}>Loading...</div>;
    const ErrorMessage = () => (
      <div className={error}>Could not load data for this city.</div>
    );

    return (
      <CivicStoryCard
        title="Affordable Rental Units are Dwindling"
        slug="affordable-rental-units-are-dwindling"
      >
        <div>
          <strong>Search An Area</strong>
          {allCities && allCities.length && (
            <Dropdown
              value={cityOptions.find(
                c => c.value === capitalize(selectedCity)
              )}
              onChange={setCity}
              options={cityOptions}
            />
          )}
        </div>
        <section>
          {isLoading && <Loader />}
          {selectedCityData && (
            <div>
              <p>
                {capitalize(selectedCity)} ranks{" "}
                <strong className={emphasis}>
                  {selectedCityLowRank.rank}/{selectedCityLowRank.total}{" "}
                </strong>
                for new units that cost{" "}
                <strong className={emphasis}>&lt;$800/mo</strong>
              </p>
              <p>
                <strong className={gradientLabel}>More Units Added</strong>
                <GradientScale
                  domain={[1, selectedCityLowRank.total]}
                  primary={selectedCityLowRank.rank}
                  height={50}
                />
              </p>
            </div>
          )}
          {selectedCityData && (
            <div>
              <p>
                {capitalize(selectedCity)} ranks{" "}
                <strong className={emphasis}>
                  {selectedCityHighRank.rank}/{selectedCityHighRank.total}{" "}
                </strong>
                for new units that cost{" "}
                <strong className={emphasis}>&gt;$2,000/mo</strong>
              </p>
              <p>
                <strong className={gradientLabel}>Less Units Added</strong>
                <GradientScale
                  domain={[1, selectedCityHighRank.total]}
                  primary={selectedCityHighRank.rank}
                  height={50}
                />
              </p>
            </div>
          )}
        </section>
        <section>
          {chartData && (
            <div>
              <HorizontalBarChart
                data={chartData}
                dataLabel="datatype"
                dataValue="value"
                dataValueFormatter={civicFormat.percentage}
                title={`${capitalize(
                  selectedCity
                )} Change in Total Units By Cost Per Month`}
                subtitle="Change in Share of Units by Real Rent Level, 2005-2015"
                yLabel="Cost Per Month"
                xLabel="% Change in Total Units"
              />
            </div>
          )}
          {isError && <ErrorMessage />}
        </section>
        <Collapsable>
          <Collapsable.Section hidden>
            <p>
              Every year, Harvard Joint Center on Housing publishes a report on
              the number of rental units available at different price points. In
              the Portland metropolitan area, there has been a decrease in
              affordable units and an increase in more expensive units. From
              2005 to 2015, Portland added 53,847 rental units. Despite this
              increase in rental housing, the area lost 39,645 units below
              $1000/month during this time. Units costing more than $1000 saw an
              increase, and the number of rentals costing more than $1400
              increased by 52,374.
            </p>

            <p>
              If you are making near 100% of the median income in Portland, your
              family is likely able to find affordable housing. However, if you
              make less than 100%, you’ll have a much harder time today than in
              2005 finding an affordable rent.
            </p>

            <p>
              From 2005 to 2015, the Portland Metro lost 39,645 units below
              $1000/month.
            </p>
          </Collapsable.Section>
        </Collapsable>
      </CivicStoryCard>
    );
  }
}

AffordableRentalUnitsDwindling.displayName = "AffordableRentalUnitsDwindling";

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
    chartData: getChartData(state)
  }),
  dispatch => ({
    fetchAllCities() {
      dispatch(fetchAllARUCities());
    },
    setCity(city = {}) {
      dispatch(fetchARUCity(city.value));
      dispatch(setARUCity(city.value));
    }
  })
)(AffordableRentalUnitsDwindling);
