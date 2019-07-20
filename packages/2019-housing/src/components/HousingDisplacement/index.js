import React, { Component } from "react";
import {
  CivicStoryCard,
  LineChart,
  Slider
} from "@hackoregon/component-library";
import { css } from "emotion";

// TODO: Wire this up the the API when it is built
import data from "./test-housing-displacement.json";

class TestDisplacementCard extends Component {
  constructor(props) {
    super(props);
    this.state = { threshold: 30 };
  }

  componentDidMount() {
    // initialize data here
  }

  render() {
    const { threshold } = this.state;

    // Make these getter FNs
    const fullData = data
      .filter(row => {
        return row[1] === "full_pop";
      })
      .map(row => {
        return { x: row[2], y: row[4], series: row[3] };
      });

    const historicallyBlackData = data
      .filter(row => {
        return row[1] === `black_gt${threshold}`;
      })
      .map(row => {
        return { x: row[2], y: row[4], series: row[3] };
      });

    const dataSeries = "series";
    const xKey = "x";
    const xLabel = "Year";
    const yKey = "y";
    const yLabel = "Population";

    return (
      <CivicStoryCard
        title="(Story Card 1, Issue #481) Portland Population Change Over Time, by Demographic"
        slug="portland-population-change-over-time"
      >
        {/* DEV STATUS NOTES */}
        <em>Local mock data only / not wired up to an API</em>
        {/* DEV STATUS NOTES */}

        <p>
          As Portland has gentrified, neighborhoods that were historically black
          have seen decreases in black populations. Further, the black
          population in the Portland MSA has proportionally decreased over time,
          demonstrating that the people displaced in these neighborhoods have
          not stayed within the Portland MSA.
        </p>
        <div
          className={css`
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1rem;
          `}
        >
          <div
            className={css`
              width: fit-content;
            `}
          >
            <h5
              className={css`
                margin-bottom: 0.75rem;
              `}
            >
              1990 Black Population Threshold
            </h5>
            <Slider.SliderWithTooltip
              min={20}
              max={40}
              defaultValue={30}
              step={10}
              tipFormatter={value => `${value}%`}
              onChange={value => this.setState({ threshold: value })}
              value={threshold}
            />
          </div>
        </div>
        <div>
          <LineChart
            data={historicallyBlackData}
            dataKey={xKey}
            dataValue={yKey}
            dataSeries={dataSeries}
            title="Historically Black Areas"
            xLabel={xLabel}
            yLabel={yLabel}
            xNumberFormatter={tick => tick.toString()}
          />
          <LineChart
            data={fullData}
            dataKey={xKey}
            dataValue={yKey}
            dataSeries={dataSeries}
            title="All of Portland"
            xLabel={xLabel}
            yLabel={yLabel}
            xNumberFormatter={tick => tick.toString()}
          />
        </div>
      </CivicStoryCard>
    );
  }
}

TestDisplacementCard.displayName = "TestDisplacementCard";

export default TestDisplacementCard;
