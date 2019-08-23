import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { css } from "emotion";

import {
  CivicStoryCard,
  Scatterplot,
  Collapsable,
  VictoryTheme,
  DataTable,
  ChartTitle
} from "@hackoregon/component-library";

import {
  fetchVotersOnTheMove,
  fetchAwayVotersOnTheMove
} from "../../state/voters-on-the-move/actions";

import {
  isVotersOnTheMovePending,
  catchVotersOnTheMoveErrors,
  getVotersOnTheMoveData,
  isAwayVotersOnTheMovePending,
  catchAwayVotersOnTheMoveErrors,
  getAwayVotersOnTheMoveData
} from "../../state/voters-on-the-move/selectors";

const smallMultiples = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const chartColumn = css`
  width: 100%;
`;

const ageGroupLabels = [
  { category: 18, label: "18-25" },
  { category: 26, label: "26-32" },
  { category: 33, label: "33-39" },
  { category: 40, label: "40-49" },
  { category: 50, label: "50+" }
];

const ageLabels = {
  18: { category: 0, label: "18-25" },
  26: { category: 1, label: "26-32" },
  33: { category: 2, label: "33-39" },
  40: { category: 3, label: "40-49" },
  50: { category: 4, label: "50+" }
};

const legendStyle = css`
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0 0 0;
`;

const tableRows = [
  { ageGroup: "18-25", towards: "50.3%", away: "49.7%", moves: "1.93" },
  { ageGroup: "26-32", towards: "43.3%", away: "56.7%", moves: "1.97" },
  { ageGroup: "33-39", towards: "41.1%", away: "58.9%", moves: "1.72" },
  { ageGroup: "40-49", towards: "44.1%", away: "55.9%", moves: "1.52" },
  { ageGroup: "55+", towards: "45.7%", away: "54.3%", moves: "1.40" }
];

const tableCols = [
  {
    align: "left",
    header: "Age Group",
    key: "ageGroup"
  },
  {
    align: "left",
    header: "Average Number of Moves",
    key: "moves"
  },
  {
    align: "left",
    header: "Moves Towards City Center",
    key: "towards"
  },
  {
    align: "left",
    header: "Moves Away From City Center",
    key: "away"
  }
];

const tableData = {
  columns: tableCols,
  data: tableRows
};

const legendComponent = age => (
  <div className={legendStyle}>
    <span
      className={css`
        margin-left: 5px;
      `}
    >
      <svg viewBox="0 0 10 10" width="10px">
        <circle
          cx="5"
          cy="5"
          r="5"
          fill={VictoryTheme.group.colorScale[ageLabels[age].category]}
        />
      </svg>
      <span
        className={css`
          margin-left: 5px;
        `}
      >
        {`Ages ${ageLabels[age].label}`}
      </span>
    </span>
  </div>
);

export class VotersOnTheMove extends React.Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const {
      isLoading,
      error,
      votersOnTheMove,
      isAwayLoading,
      awayError,
      awayVotersOnTheMove
    } = this.props;

    const data = { center: votersOnTheMove, away: awayVotersOnTheMove };

    const voterScatterplot = (age, direction) => (
      <Scatterplot
        data={data[direction].results.filter(
          ({ ageGroup }) => ageGroup === age
        )}
        dataKey="x"
        dataValue="y"
        dataSeries="ageGroup"
        dataSeriesLabel={ageGroupLabels}
        xLabel="SE"
        yLabel="NW"
        domain={{ x: [-19.5, 19.5], y: [-10.5, 10.5] }}
        legendComponent={() => legendComponent(age)}
      />
    );

    return (
      <CivicStoryCard
        title="Voters on the Move"
        slug="voters-on-the-move"
        loading={isLoading || isAwayLoading}
        error={(error || awayError) && "error"}
      >
        <Collapsable>
          <Collapsable.Section>
            <div>
              <p>
                For voters relocating within Portland during 2006 - 2016, the
                visualizations below show movement distance and direction by age
                group.
              </p>
              <ChartTitle
                title="Movement of Registered Voters Within Portland"
                subtitle="Number of moves and change relative to city center by age group as measured by changes in voter registration, 2006-2016"
              />
              <DataTable data={tableData} />
              <p>
                Overall, the data showed that a greater percentage of Portland
                registered voters moved away from the city center than moved
                towards it, and that the average number of moves decreased by
                age group. The sample of individual voter movements below paint
                a more granual picture of voter movement patterns.
              </p>
              {votersOnTheMove && awayVotersOnTheMove && (
                <div>
                  <ChartTitle
                    title="Distance and Direction of Moves Within Portland"
                    subtitle="Distance in miles and direction of travel for 2000 randomly sampled moves within Portland"
                  />
                  <div className={smallMultiples}>
                    <div className={chartColumn}>
                      <h2>Moves Towards City Center</h2>
                      {voterScatterplot(18, "center")}
                      {voterScatterplot(26, "center")}
                    </div>
                    <div className={chartColumn}>
                      <h2>Moves Away From City Center</h2>
                      {voterScatterplot(18, "away")}
                      {voterScatterplot(26, "away")}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Collapsable.Section>
          <Collapsable.Section hidden>
            <div>
              {votersOnTheMove && awayVotersOnTheMove && (
                <div className={smallMultiples}>
                  <div className={chartColumn}>
                    {voterScatterplot(33, "center")}
                    {voterScatterplot(40, "center")}
                    {voterScatterplot(50, "center")}
                  </div>
                  <div className={chartColumn}>
                    {voterScatterplot(33, "away")}
                    {voterScatterplot(40, "away")}
                    {voterScatterplot(50, "away")}
                  </div>
                </div>
              )}
              <p>
                Age is calculated at the time of relocation. Portland city
                center is defined as the center of the Burnside Bridge. Change
                in distance from Portland city center is calculated by taking
                the displacement from the individual’s previous address. The
                scatterplots show when people relocate from their previous
                address, the direction and the distance moved either toward or
                away from the city center. The scatterplots are generated based
                on a random sampling of 2000 voter movements within Portland
                (1000 movements towards the city center, 1000 movements away
                from the city center).
              </p>
            </div>
          </Collapsable.Section>
        </Collapsable>
      </CivicStoryCard>
    );
  }
}

VotersOnTheMove.displayName = "VotersOnTheMove";
VotersOnTheMove.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  votersOnTheMove: PropTypes.arrayOf(PropTypes.object),
  isAwayLoading: PropTypes.bool,
  awayError: PropTypes.string,
  awayVotersOnTheMove: PropTypes.arrayOf(PropTypes.object)
};

export default connect(
  state => ({
    isLoading: isVotersOnTheMovePending(state),
    error: catchVotersOnTheMoveErrors(state),
    votersOnTheMove: getVotersOnTheMoveData(state),
    isAwayLoading: isAwayVotersOnTheMovePending(state),
    awayError: catchAwayVotersOnTheMoveErrors(state),
    awayVotersOnTheMove: getAwayVotersOnTheMoveData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchVotersOnTheMove());
      dispatch(fetchAwayVotersOnTheMove());
    }
  })
)(VotersOnTheMove);
