/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";

import "@hackoregon/component-library/assets/vendor/react-select.min.css";
import {
  CivicStoryCard,
  Dropdown,
  Scatterplot,
  GradientScale
} from "@hackoregon/component-library";

import { gradientLabel, emphasis } from "../css-utils";
import {
  fetchAllPNWSurgeData,
  setPNWSurgeCity
} from "../../state/pnw-surge/actions";
import {
  isLoading,
  isError,
  getAllCities,
  getSelectedCity,
  getSelectedCityRank,
  getChartData
} from "../../state/pnw-surge/selectors";

export class PacificNorthwestTopsNationInSurgingHomePrices extends React.Component {
  componentDidMount() {
    const { fetchData, setCity } = this.props;
    fetchData();
    setCity();
  }

  render() {
    const {
      // eslint-disable-next-line no-shadow
      isLoading,
      // eslint-disable-next-line no-shadow
      isError,
      allCities,
      selectedCity,
      selectedCityRank,
      chartData,
      setCity
    } = this.props;

    const cityOptions =
      allCities && allCities.map(c => ({ value: c, label: c }));

    return (
      <CivicStoryCard
        loading={isLoading}
        error={isError && "Could not load required data"}
        title="Pacific Northwest Tops the Nation in Surging Home Prices"
        slug="pacific-northwest-tops-nation-in-surging-home-prices"
      >
        <section>
          <p>
            The JCHS of Harvard University reports on the metro-area home price
            changes over time and looks at changes in value between peaks and
            troughs in the housing market.{" "}
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
          {selectedCityRank && (
            <div>
              <p>
                {selectedCity} ranks{" "}
                <strong className={emphasis}>
                  {selectedCityRank.rank}/{selectedCityRank.total}{" "}
                </strong>
                for home price changes between{" "}
                <strong className={emphasis}>2015 and 2016</strong>
              </p>
              <p>
                <strong className={gradientLabel}>Less percent change</strong>
                <GradientScale
                  domain={[1, selectedCityRank.total]}
                  primary={selectedCityRank.rank}
                  height={50}
                />
              </p>
            </div>
          )}
        </section>

        <p>
          If we consider the most recent trough period associated with the
          recession up until 2016, Portland is ranked 104 out of 120. In this
          case, a rank of 1 indicates the least change, and a rank of 120
          indicates the greatest increase in home prices. If we look at a more
          recent period that considers December 2015 through December 2016,
          Portland is ranked 119 out of 120, followed by Seattle.
        </p>

        {chartData && (
          <section>
            <Scatterplot
              data={chartData}
              dataKey="longTerm"
              dataValue="shortTerm"
              dataSeries="series"
              title="% Change in Home Prices"
              subtitle="Comparing short-term and long-term trends"
              xLabel="% Change, Jan. 2000 - Dec. 2016"
              yLabel="% Change, Dec. 2015 - Dec. 2016"
            />
          </section>
        )}
      </CivicStoryCard>
    );
  }
}

PacificNorthwestTopsNationInSurgingHomePrices.displayName =
  "PacificNorthwestTopsNationInSurgingHomePrices";

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isLoading(state),
    isError: isError(state),
    allCities: getAllCities(state),
    selectedCity: getSelectedCity(state),
    selectedCityRank: getSelectedCityRank(state),
    chartData: getChartData(state)
  }),
  dispatch => ({
    fetchData() {
      dispatch(fetchAllPNWSurgeData());
    },
    setCity(city = {}) {
      dispatch(setPNWSurgeCity(city.value));
    }
  })
)(PacificNorthwestTopsNationInSurgingHomePrices);
