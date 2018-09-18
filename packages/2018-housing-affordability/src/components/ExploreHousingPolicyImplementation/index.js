import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import { insert } from 'ramda';
import {
  CivicStoryCard,
  ChartTitle,
  SimpleLegend,
} from '@hackoregon/component-library';

import PolicyText from './PolicyText';
import SelectedPolicy from './SelectedPolicy';

import {
  fetchAllHousingPolicyData,
  setSelectedPolicy,
} from '../../state/housing-policy/actions';
import {
  isLoading,
  isError,
  getAllPolicies,
  getAllPrograms,
  getTableData,
  getSelectedPolicy,
  getSelectedPolicyData,
} from '../../state/housing-policy/selectors';

const flexContainer = css`
  display: flex;
  width: 90%;
  margin: 0px auto;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const policyContainer = css`
  width: 100%;
`;

const legendTitles = [
  { name: 'Low Implementation' },
  { name: 'Medium Implementation' },
  { name: 'High Implementation' },
];

export class ExploreHousingPolicyImplementation extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  handleClick(policy) {
    this.props.setPolicy(policy);
  }

  render() {
    const {
      isLoading,
      isError,
      allPolicies,
      allPrograms,
      tableData,
      selectedPolicy,
      selectedPolicyData,
    } = this.props;

    return (
      <CivicStoryCard
        loading={isLoading}
        error={isError && 'Could not load required data 🤷‍♂️'}
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
          {tableData &&
            tableData.length &&
            insert(
              selectedPolicy
                ? tableData.findIndex(
                    item => item.policy === selectedPolicy
                  ) + 1
                : 0,
              selectedPolicy ? (
                <SelectedPolicy
                  data={selectedPolicyData}
                  key={'selectedPolicyInset'}
                />
              ) : (
                <div className={policyContainer}>
                  <h2>Select a policy for more information:</h2>
                </div>
              ),
              tableData.map(
                item =>
                  item.policy === selectedPolicy ? (
                    <PolicyText
                      data={item}
                      onClick={() => this.handleClick(item.policy)}
                      selected
                      key={item.policy}
                    />
                  ) : (
                    <PolicyText
                      data={item}
                      onClick={() => this.handleClick(item.policy)}
                      key={item.policy}
                    />
                  )
              )
            )}
        </div>

        <p>
          There are a number of different housing programs and policies in place
          throughout the Portland metro area. They’re administered by various
          jurisdictions ranging from the city to the state level and at times,
          these policies can be tough to interpret.
        </p>
        <p>
          In the spring and summer of 2018,{' '}
          <a href="http://www.hackoregon.org/">Hack Oregon</a> volunteers
          surveyed local governments to understand what policies were being
          implemented. Taking inspiration from the{' '}
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

ExploreHousingPolicyImplementation.displayName =
  'ExploreHousingPolicyImplementation';

export default connect(
  state => ({
    isLoading: isLoading(state),
    isError: isError(state),
    allPolicies: getAllPolicies(state),
    allPrograms: getAllPrograms(state),
    tableData: getTableData(state),
    selectedPolicy: getSelectedPolicy(state),
    selectedPolicyData: getSelectedPolicyData(state),
  }),
  dispatch => ({
    fetchData() {
      dispatch(fetchAllHousingPolicyData());
    },
    setPolicy(policy = {}) {
      dispatch(setSelectedPolicy(policy));
    },
  })
)(ExploreHousingPolicyImplementation);
