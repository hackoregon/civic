import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import { insert } from 'ramda';

import { CivicStoryCard, GradientScale } from '@hackoregon/component-library';

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
import { gradientLabel } from '../css-utils';

const svgHeading = css`
  font-size: 26px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  padding: 5px;
`;

const flexContainer = css`
  display: flex;
  width: 90%;
  margin: 40px auto;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ocean = [
  '#ffffe1',
  '#effac1',
  '#ceedc2',
  '#8cd5c6',
  '#4fc1cc',
  '#28a1c8',
  '#3e76b3',
  '#4752a2',
  '#2d4070',
];
const colorScale = (num, total) => ocean[Math.floor((9 * num) / total)];
const fillColor = selected => (selected ? '#eb2d5f' : '#AAA4AB');

function SelectedPolicy(props) {
  return (
    <div
      className={css`
        width: 100%;
        border: 1px solid red;
      `}
    >
      {props.data.governments.map(item => (
        <div>{item.government_entity}</div>
      ))}
    </div>
  );
}

function PolicyCircle(props) {
  return (
    <div className={svgHeading} onClick={props.onClick}>
      <svg
        viewBox="0 0 100 100"
        width="100px"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <circle cx="50" cy="50" r="50" fill={fillColor(props.selected)} />
        <circle cx="50" cy="50" r="45" fill="#F3F2F3" />
        <circle cx="80" cy="80" r="20" fill="#F3F2F3" />
        <circle
          cx="80"
          cy="80"
          r="18"
          fill={colorScale(props.data.governments, 20)}
        />
        <text x="50" y="53.25" textAnchor="middle" alignmentBaseline="middle">
          {props.data.policy}
        </text>
        <text
          x="80"
          y="83.25"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="#F3F2F3"
        >
          {props.data.governments}
        </text>
      </svg>
    </div>
  );
}

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
          Use the arrows to click through policies currently being utilized to
          learn more about what the policy means for affordable housing, which
          governments in the region implement it, and links to additional
          information.
        </p>

        <div
          className={css`
            width: 90%;
            margin: 0 auto;
          `}
        >
          <strong className={gradientLabel}>Fewer policies</strong>
          <GradientScale
            colorScale="ocean"
            domain={[0, 100]}
            primary={800}
            height={50}
          />
        </div>

        <div className={flexContainer}>
          {tableData &&
            tableData.length &&
            insert(
              this.props.selectedPolicy
                ? tableData.findIndex(
                    item => item.policy === this.props.selectedPolicy
                  ) + 1
                : 0,
              this.props.selectedPolicy ? (
                <SelectedPolicy
                  data={selectedPolicyData}
                  key={'selectedPolicyInset'}
                />
              ) : (
                <div className={css`min-width=100%;`}><h2>Pick One</h2></div>
              ),
              tableData.map(
                item =>
                  item.policy === this.props.selectedPolicy ? (
                    <PolicyCircle
                      data={item}
                      onClick={() => this.handleClick(item.policy)}
                      selected
                      key={item.policy}
                    />
                  ) : (
                    <PolicyCircle
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
