/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";

import "@hackoregon/component-library/assets/vendor/react-select.min.css";

import {
  BarChart,
  CivicStoryCard,
  Dropdown
} from "@hackoregon/component-library";

import { civicFormat } from "@hackoregon/component-library/dist/utils";

import {
  fetchAllRaces,
  fetchRace,
  setRace
} from "../../state/volume-of-money/actions";
import {
  isAllRacesLoading,
  getAllRacesError,
  getSelectedRace,
  isAnyLoading,
  getAllRacesData,
  getSelectedRaceData
} from "../../state/volume-of-money/selectors";

const RACE_TYPES = [
  "Statewide Races",
  "Statewide Ballot Measure",
  "Portland and Multnomah County",
  "State Legislature",
  "Other"
];
const raceTypes = RACE_TYPES.map(r => ({ value: r, label: r }));

export class IncreasingVolumeOfMoney extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchAllRaces();
  }

  render() {
    const {
      isError,
      selectedRace,
      allRacesData,
      // eslint-disable-next-line no-shadow
      setRace,
      // eslint-disable-next-line no-shadow
      isAnyLoading,
      selectedRaceData
    } = this.props;

    const raceSubtitle = selectedRace
      ? `Monthly total for all contributions reported in ORESTAR - ${selectedRace}`
      : `Monthly total for all contributions reported in ORESTAR`;

    return (
      <CivicStoryCard
        title="The Increasing Volume of Money in Oregon Elections"
        slug="increasing-volume-of-money"
        loading={isAnyLoading}
        error={isError && "Error loading data"}
      >
        <div>
          <strong>Select A Race Type</strong>
          {raceTypes && (
            <Dropdown
              value={selectedRace || "Select a Race"}
              onChange={setRace}
              options={raceTypes}
            />
          )}
        </div>
        <section>
          {allRacesData && (
            <div>
              <BarChart
                data={selectedRaceData || allRacesData}
                dataKey="date"
                dataValue="sum"
                title="Money Raised For Oregon Elections"
                subtitle={raceSubtitle}
                yLabel="Money Raised"
                xLabel="Year"
                xNumberFormatter={x => civicFormat.year(x)}
                yNumberFormatter={y => civicFormat.dollars(y)}
                barWidth={3}
                domain={{ x: [2008, 2018] }}
              />
            </div>
          )}
        </section>
      </CivicStoryCard>
    );
  }
}

IncreasingVolumeOfMoney.displayName = "IncreasingVolumeOfMoney";

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoadingAllRaces: isAllRacesLoading(state),
    isError: getAllRacesError(state),
    selectedRace: getSelectedRace(state),
    selectedRaceData: getSelectedRaceData(state),
    allRacesData: getAllRacesData(state),
    isAnyLoading: isAnyLoading(state)
  }),
  dispatch => ({
    fetchAllRaces() {
      dispatch(fetchAllRaces());
    },
    setRace(race = {}) {
      dispatch(fetchRace(race.value));
      dispatch(setRace(race.value));
    }
  })
)(IncreasingVolumeOfMoney);
