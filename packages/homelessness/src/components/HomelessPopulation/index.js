/* eslint-disable react/jsx-boolean-value, react/no-unused-prop-types */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { css } from "emotion";
import {
  Dropdown,
  CivicStoryCard,
  HorizontalBarChart
} from "@hackoregon/component-library";
import shared from "../shared.styles";

import { fetchPopulationData } from "../../state/Population/actions";
import {
  ethnicity,
  veteranStatus,
  disability,
  age,
  gender
} from "../../state/Population/selectors";

const barChartsForPopulation = data => {
  return (
    !!data &&
    data.map(el => (
      <HorizontalBarChart
        minimalist
        data={el.data}
        xLabel={el.title}
        dataValue="value"
        dataValueFormatter={d => `${d}%`}
        dataLabel="label"
      />
    ))
  );
};

const containerClass = css`
  text-align: center;
  max-width: 95%;
  margin: auto;
`;

const selectContainerClass = css`
  margin-top: 50px;
  margin: 0 30px;
  padding-bottom: 13px;
  width: 300px;
`;

class HomelessPopulation extends React.Component {
  constructor() {
    super();
    this.state = {
      options: [
        { value: "ethnicity", label: "Ethnicity" },
        { value: "veteranStatus", label: "Veteran Status" },
        { value: "disability", label: "Disability" },
        { value: "age", label: "Age" },
        { value: "gender", label: "Gender" }
      ],
      value: "ethnicity",
      footnote: {
        Ethnicity:
          "All race data in this report are presented as an over-count, which means " +
          "individuals were encouraged to select as many categories of race, ethnicity, or national" +
          "origin as apply and they were counted within each category. For that reason, the " +
          "percentages may add up to more than 100.",
        "Veteran Status":
          "People who have served in the US military are included in Multnomah " +
          "county’s homeless population.\nIn 2015, 11% of the homeless have served in the US " +
          "military. Of those, 39% stayed in transitional housing, 47% were unsheltered and 14% " +
          "stayed in emergency shelters.",
        Disability:
          "A disabling condition is an injury, illness or chronic health condition. " +
          "These categories may include mental health and substance abuse as well as use of " +
          "equipment, such as wheelchair use.\n41% of the homeless with a disabling condition were " +
          "living unsheltered in 2015.",
        Gender:
          "While the Point-in-Time Count includes transgender as an option, the American " +
          "Community Survey (ACS) only includes male and female.",
        Age: ""
      }
    };
  }

  componentDidMount() {
    this.props.loadData();
  }

  handleChange(option) {
    this.setState({ value: option.value });
  }

  render() {
    return (
      <CivicStoryCard
        footer={false}
        watermark={<div />}
        title="Homeless Population"
      >
        <div className={containerClass}>
          <p style={shared.text}>
            The graph below displays the percent of each type of homeless
            demographic against the same demographic for the general population.
          </p>

          <p style={shared.text}>
            People experiencing homelessness are more likely to be people of
            color, male, and more likely to have a disabling condition than
            Multnomah County residents as a whole.
          </p>
          <div className={selectContainerClass}>
            <Dropdown
              options={this.state.options}
              onChange={option => this.handleChange(option)}
              value={this.state.value}
              clearable={false}
            />
          </div>
          {this.props[this.state.value] &&
            barChartsForPopulation(this.props[this.state.value])}
        </div>
        <p style={shared.footnote}>{this.state.footnote[this.state.value]}</p>
      </CivicStoryCard>
    );
  }
}

HomelessPopulation.propTypes = {
  loadData: PropTypes.function,
  ethnicity: PropTypes.array,
  veteranStatus: PropTypes.array,
  disability: PropTypes.array,
  age: PropTypes.array,
  gender: PropTypes.array
};

const mapDispatchToProps = dispatch => ({
  loadData: () => fetchPopulationData(dispatch)
});

const mapStateToProps = allState => {
  const state = allState.homelessness || allState;
  return {
    ethnicity: ethnicity(state),
    veteranStatus: veteranStatus(state),
    disability: disability(state),
    age: age(state),
    gender: gender(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomelessPopulation);
