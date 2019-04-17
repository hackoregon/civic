/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";

import "@hackoregon/component-library/assets/vendor/react-select.min.css";
import {
  Dropdown,
  CivicStoryCard,
  Collapsable,
  LineChart,
  BarChart,
  GradientScale
} from "@hackoregon/component-library";

import { loader, error, gradientLabel, emphasis } from "../css-utils";
import {
  fetchAllRentalCrisisCities,
  fetchRentalCrisisCity,
  setRentalCrisisCity
} from "../../state/rental-crisis/actions";
import {
  isCityLoading,
  getCityError,
  getSelectedCity,
  getSelectedCityData,
  getSelectedCityRank,
  getAllCities
} from "../../state/rental-crisis/selectors";

export class PortlandNeedsAffordableRentalUnits extends React.Component {
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
      selectedCityData,
      selectedCityRank,
      setCity
    } = this.props;

    const cityOptions =
      allCities && allCities.map(c => ({ value: c, label: c }));

    const Loader = () => <div className={loader}>Loading...</div>;
    const ErrorMessage = () => (
      <div className={error}>Could not load data for this city.</div>
    );

    return (
      <CivicStoryCard
        title="Portland Needs Affordable Rental Units"
        slug="portland-needs-affordable-rental-units"
      >
        <Collapsable>
          <Collapsable.Section>
            <div>
              <p>
                Portland Metro area lost nearly 39,645 affordable units from
                2005 to 2015. During that same time, the region’s need for
                affordable units also grew.
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
                      This ranking is based on the number of AAA (adequate,
                      affordable, and available) units per 100 ELI (extremely
                      low income) renters. A ranking of 1 indicates there are a
                      lot of AAA units per 100 ELI households, and a ranking of
                      3142 represents the least number of AAA units per 100 ELI
                      households.
                    </p>
                    <strong className={gradientLabel}>
                      More units available
                    </strong>
                    <GradientScale
                      domain={[1, selectedCityRank.total]}
                      primary={selectedCityRank.rank}
                      height={50}
                    />
                  </div>
                )}
                {selectedCityData && (
                  <div>
                    <LineChart
                      data={selectedCityData}
                      dataKey="year"
                      dataValue="eli_renters"
                      title={`Extremely Low-Income Renter Households, ${selectedCity}`}
                      yLabel="# of Households"
                      xLabel="Year"
                      xNumberFormatter={year => year}
                    />
                    <BarChart
                      domain={{ x: [2000, 2014], y: [0, 100] }}
                      data={selectedCityData}
                      dataKey="year"
                      dataValue="aaa_units_per_100"
                      title={`Adequate, Affordable, and Available Units, ${selectedCity}`}
                      yLabel="Units per 100 ELI Households"
                      xLabel="Year"
                      xNumberFormatter={year => year}
                    />
                  </div>
                )}
              </section>
            </div>
          </Collapsable.Section>
          <Collapsable.Section hidden>
            <div>
              <p>
                To understand the need for affordable housing, we can turn to a
                recent Urban Institute report. It tracks the number of AAA
                (adequate, affordable, and available) units for extremely low
                income (ELI) households (making less than 30% of the area median
                income). Of all the country’s counties, Multnomah County ranked
                2833 out of 3142 in 2014 with regards to having enough AAA
                housing for ELI households.
              </p>
              <p>
                Nationwide, there is not enough affordable housing available to
                extremely low-income households. In 2014, there were 11,775,631
                ELI households in the United States, and only 46 adequate,
                affordable, and available (AAA) units per 100 households deemed
                affordable. While this is happening across the country, the
                situation in the Portland metropolitan area is especially
                concerning.
              </p>
              <p>
                In 2000, there were about 39,786 extremely low income households
                in Multnomah, Washington and Clackamas Counties. In 2014, that
                number increased to 63,825 households. This indicates the need
                for affordable housing has increased. As of 2014, Multnomah
                County had 29 units, Clackamas County had 28 units, and
                Washington County had 21 available affordable units per 100
                households that needed them.
              </p>
              <p>
                The National Low Income Housing Coalition reported in March 2017
                that the region needs 25,958 rental units for families making
                50% of median family income, and 52,848 for those making 30%.
              </p>
            </div>
          </Collapsable.Section>
        </Collapsable>
      </CivicStoryCard>
    );
  }
}

PortlandNeedsAffordableRentalUnits.displayName =
  "PortlandNeedsAffordableRentalUnits";

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isCityLoading(state),
    allCities: getAllCities(state),
    selectedCity: getSelectedCity(state),
    selectedCityData: getSelectedCityData(state),
    selectedCityRank: getSelectedCityRank(state),
    isError: getCityError(state)
  }),
  dispatch => ({
    fetchAllCities() {
      dispatch(fetchAllRentalCrisisCities());
    },
    setCity(city = {}) {
      dispatch(fetchRentalCrisisCity(city.value));
      dispatch(setRentalCrisisCity(city.value));
    }
  })
)(PortlandNeedsAffordableRentalUnits);
