import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import { insert } from 'ramda';
import { groupBy } from 'lodash';

import CivicVictoryTheme from '@hackoregon/component-library/src/VictoryTheme/VictoryThemeIndex';

import {
  CivicStoryCard,
  ChartTitle,
  SimpleLegend,
} from '@hackoregon/component-library';

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

const policyContainer = css`
  width: 100%;
`;

const policyLink = css`
  color: #ee4950;
  border-bottom: 2px solid;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.25s ease-in-out;
  width: fit-content;
`;

const flexContainer = css`
  display: flex;
  width: 90%;
  margin: 0px auto;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const legendTitles = [
  { name: 'Low Implementation' },
  { name: 'Medium Implementation' },
  { name: 'High Implementation' },
];
const legendScale = [7, 15, 99];

function SelectedPolicy(props) {
  const govData = groupBy(
    props.data.governments,
    item => item.government_entity
  );

  return (
    <div
      className={css`
        width: 100%;
      `}
    >
      <h3>Category: {props.data.category}</h3>
      <p>{props.data.description}</p>
      <h3>Implementing governments</h3>
      {console.log(govData)}
      {console.log(Object.keys(govData))}
      <ul>
        {Object.keys(govData).map(gov => (
          <li key={gov}>
            <strong>{gov}</strong>
            <ul>
              {govData[gov].map(
                item =>
                  item.description && (
                    <li key={item.description}>
                      {item.name && <a href={item.link}>{item.name}</a>}
                      {item.name && ': '}
                      {`${item.description} `}
                      {!item.name && <a href={item.link}>(link)</a>}
                    </li>
                  )
              )}
            </ul>
          </li>
        ))}
      </ul>
      {props.data.links[0].link && (
        <div>
          <h3>More information:</h3>
          <ul>
            {props.data.links.map(
              item =>
                item.link && (
                  <li key={item.link}>
                    <a href={item.link}>{item.link_name}</a>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function PolicyText(props) {
  return (
    <div className={policyContainer} onClick={props.onClick}>
      {props.selected ? (
        <h2 className={policyLink}>
          <SimpleCircle
            selected={props.selected}
            index={legendScale.findIndex(x => props.data.governments <= x)}
          />
          {props.data.policy_name}
        </h2>
      ) : (
        <h3 className={policyLink}>
          <SimpleCircle
            selected={props.selected}
            index={legendScale.findIndex(x => props.data.governments <= x)}
          />
          {props.data.policy_name}
        </h3>
      )}
    </div>
  );
}

function SimpleCircle(props) {
  const width = props.selected ? '18px' : '10px';
  const padding = props.selected ? '9px' : '5px';

  return (
    <svg
      className={css`
        padding-right: ${padding};
      `}
      viewBox="0 0 10 10"
      width={width}
    >
      <circle
        cx="5"
        cy="5"
        r="5"
        fill={CivicVictoryTheme.civic.group.colorScale[props.index]}
      />
    </svg>
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
                <div className={policyContainer}>
                  <h2>Select a policy for more information:</h2>
                </div>
              ),
              tableData.map(
                item =>
                  item.policy === this.props.selectedPolicy ? (
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
