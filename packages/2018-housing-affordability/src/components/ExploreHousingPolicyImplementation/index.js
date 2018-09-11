import React from 'react';
import { connect } from 'react-redux';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

import { fetchAllHousingPolicyData } from '../../state/housing-policy/actions';
import {
  isLoading,
  isError,
  getAllPolicies,
  getAllPrograms,
} from '../../state/housing-policy/selectors';

export class ExploreHousingPolicyImplementation extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <CivicStoryCard
        title="Explore Housing Policy Implementation in the Portland Metro Area"
        slug="explore-housing-policy-implementation"
      >
        <p>
          Use the arrows to click through policies currently being utilized to
          learn more about what the policy means for affordable housing, which
          governments in the region implement it, and links to additional
          information.
        </p>

        <Placeholder issue="106" />

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
        <p>
          <a href="https://docs.google.com/spreadsheets/d/1SVs9AQkw5guxEIuV1eGASKCg5miWhPn3UoZrALQpXLI/edit?usp=sharing">
            Explore Findings
          </a>
        </p>
      </CivicStoryCard>
    );
  }
}

ExploreHousingPolicyImplementation.displayName =
  'ExploreHousingPolicyImplementation';

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isLoading(state),
    isError: isError(state),
    allPolicies: getAllPolicies(state),
    allPrograms: getAllPrograms(state),
  }),
  dispatch => ({
    fetchData() {
      dispatch(fetchAllHousingPolicyData());
    },
  })
)(ExploreHousingPolicyImplementation);
