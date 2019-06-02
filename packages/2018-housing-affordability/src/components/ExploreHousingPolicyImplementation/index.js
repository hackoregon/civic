import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { css } from "emotion";
import { splitAt } from "ramda";
import {
  CivicStoryCard,
  ChartTitle,
  SimpleLegend
} from "@hackoregon/component-library";

import PolicyText from "./PolicyText";
import SelectedPolicy from "./SelectedPolicy";

import {
  fetchAllHousingPolicyData,
  setSelectedPolicy,
  unsetSelectedPolicy
} from "../../state/housing-policy/actions";
import {
  isLoading,
  isError,
  getTableData,
  getSelectedPolicy,
  getSelectedPolicyData
} from "../../state/housing-policy/selectors";

const flexContainer = css`
  display: flex;
  width: 90%;
  margin: 0px auto;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const policyContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f3f3f3;
  padding: 10px 0;
`;

const legendTitles = [
  { name: "Rarely Implemented" },
  { name: "Uncommonly Implemented" },
  { name: "Commonly Implemented" }
];

export class ExploreHousingPolicyImplementation extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  handleClick(policy) {
    const { selectedPolicy, unsetPolicy, setPolicy } = this.props;
    // eslint-disable-next-line no-unused-expressions
    policy === selectedPolicy ? unsetPolicy() : setPolicy(policy);
  }

  render() {
    const {
      loading,
      error,
      tableData,
      selectedPolicy,
      selectedPolicyData
    } = this.props;

    const selectedIndex = selectedPolicy
      ? tableData.findIndex(item => item.policy === selectedPolicy) + 1
      : 0;

    const [beforeList, afterList] = splitAt(selectedIndex, tableData || []);

    return (
      <CivicStoryCard
        loading={loading}
        error={error && "Could not load required data"}
        title="Explore Housing Policy Implementation in the Portland Metro Area"
        slug="explore-housing-policy-implementation"
      >
        <p>
          Navigate through policies currently being utilized to learn more about
          what the policy means for affordable housing, which governments in the
          region implement it, and links to additional information.
        </p>

        <ChartTitle
          title="Housing Policies In The Portland Metro Area"
          subtitle="Collected by Hack Oregon, as of June 2018"
        />
        <SimpleLegend legendData={legendTitles} />
        <div className={flexContainer}>
          {beforeList.map(item => (
            <PolicyText
              data={item}
              key={item.policy}
              selected={item.policy === selectedPolicy}
              onClick={() => this.handleClick(item.policy)}
            />
          ))}
          {!selectedPolicy ? (
            <div className={policyContainer} />
          ) : (
            <SelectedPolicy data={selectedPolicyData} />
          )}
          {afterList.map(item => (
            <PolicyText
              data={item}
              key={item.policy}
              onClick={() => this.handleClick(item.policy)}
            />
          ))}
        </div>

        <p>
          There are a number of different housing programs and policies in place
          throughout the Portland metro area. They’re administered by various
          jurisdictions ranging from the city to the state level and at times,
          these policies can be tough to interpret.
        </p>
        <p>
          In the spring and summer of 2018,{" "}
          <a href="http://www.hackoregon.org/">Hack Oregon</a> volunteers
          surveyed local governments to understand what policies were being
          implemented. Taking inspiration from the{" "}
          <a href="https://www.housingconsortium.org/maps/">
            Housing Consortium in Seattle, WA
          </a>
          , the Hack Oregon project team created a framework of 22 policies
          impacting housing affordability in the region. To get the most
          accurate representation of policies being implemented, government
          websites were reviewed and interviews with government employees were
          conducted in order to verify our findings.
        </p>
      </CivicStoryCard>
    );
  }
}

ExploreHousingPolicyImplementation.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  tableData: PropTypes.arrayOf(PropTypes.shape({})),
  selectedPolicy: PropTypes.shape({}),
  selectedPolicyData: PropTypes.shape({}),
  fetchData: PropTypes.func,
  setPolicy: PropTypes.func,
  unsetPolicy: PropTypes.func
};

ExploreHousingPolicyImplementation.displayName =
  "ExploreHousingPolicyImplementation";

export default connect(
  state => ({
    loading: isLoading(state),
    error: isError(state),
    tableData: getTableData(state),
    selectedPolicy: getSelectedPolicy(state),
    selectedPolicyData: getSelectedPolicyData(state)
  }),
  dispatch => ({
    fetchData() {
      dispatch(fetchAllHousingPolicyData());
    },
    setPolicy(policy = {}) {
      dispatch(setSelectedPolicy(policy));
    },
    unsetPolicy() {
      dispatch(unsetSelectedPolicy());
    }
  })
)(ExploreHousingPolicyImplementation);
