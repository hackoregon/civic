import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion'
import { connect } from 'react-redux';

import {
  CivicStoryCard,
} from '@hackoregon/component-library';

import {
  fetchContributorBreakdown,
  fetchSpendingBreakdown,
  fetchElectionCycles,
  fetchCommittees,
  setElectionCycle,
  setCampaign,
} from '../../state/political-campaigns/actions';
import {
  isContributorBreakdownLoading,
  getContributorBreakdownData,

  isSpendingBreakdownLoading,
  getSpendingBreakdownData,

  isPoliticalCampaignsLoading,

  getElectionCycles,
  getElectionCycle,
  getCommittees,
  getCampaign,
} from '../../state/political-campaigns/selectors';

import { campaign, electionCycle } from './defaults';
import ContributorBreakdown from './ContributorBreakdown';
import SpendingBreakdown from './SpendingBreakdown';
import Controls from './Controls';

const descriptionClass = css`
`;

const missionClass = css`
`;

const chartGrid = css`
  display: flex;
`;

const chartCol = css`
  flex: 1;
`;

const propTypes = {
  query: PropTypes.func,
  loading: PropTypes.bool,
  campaign: PropTypes.object,
  committees: PropTypes.object,
  setCampaign: PropTypes.func,
  electionCycle: PropTypes.object,
  electionCycles: PropTypes.func,
  spendingBreakdown: PropTypes.object,
  setElectionCycle: PropTypes.func,
  fetchContributorBreakdown: PropTypes.func,
  contributorBreakdown: PropTypes.object,
  fetchSpendingBreakdown: PropTypes.func,

  loadingContributorBreakdown: PropTypes.bool,
};

const defaultProps = {
  campaign: {},
  committees: {
    results: [],
  },
};

class RealTimeInformationOnPoliticalCampaigns extends React.Component {
  componentDidMount() {
    this.props.setCampaign(campaign);
    this.props.setElectionCycle(electionCycle);
    this.props.query();
  }

  componentWillReceiveProps(newProps) {
    if (
      (newProps.electionCycle && newProps.campaign) &&
      (
        (newProps.campaign.id !== this.props.campaign.id) ||
        (newProps.electionCycle.id !== this.props.electionCycle.id)
      )) {
      this.props.fetchContributorBreakdown(newProps.campaign.id, newProps.electionCycle.id);
    }
  }

  render() {
    let committees = [];
    let contributors = [];
    let spending = [];
    let electionCycles = [];

    if (this.props.committees && this.props.committees.results) {
      committees = this.props.committees.results;
    }

    if (this.props.contributorBreakdown && this.props.contributorBreakdown.results) {
      contributors = this.props.contributorBreakdown.results;
    }

    if (this.props.electionCycles && this.props.electionCycles.results) {
      electionCycles = this.props.electionCycles.results;
    }

    if (this.props.spendingBreakdown && this.props.spendingBreakdown.results) {
      spending = this.props.spendingBreakdown.results;
    }

    return (
      <CivicStoryCard
        title="Real-Time Information on Political Campaigns"
        slug="real-time-information-on-political-campaigns"
      >
        <h2 className={descriptionClass}>This is a one line sentence to explain the card</h2>
        <Controls
          campaign={this.props.campaign}
          campaigns={committees}
          setCampaign={this.props.setCampaign}
          electionCycle={this.props.electionCycle}
          electionCycles={electionCycles}
          setElectionCycle={this.props.setElectionCycle}
        />
        <p className={missionClass}>This is our mission. This is why we wake up in the morning. Lorem
          ipsum thats all i remember</p>
        <div className={chartGrid}>
          <div className={chartCol}>
            <div style={{ padding: 20 }}>
              <ContributorBreakdown
                contributors={contributors}
                loading={this.props.loadingContributorBreakdown}
              />
            </div>
            <div style={{ padding: 20 }}>
              <SpendingBreakdown
                spending={spending}
                loading={this.props.loadingSpendingBreakdown}
              />
            </div>
          </div>
          <div className={chartCol}>
            <div style={{ padding: 20 }}>
              <ContributorBreakdown
                contributors={contributors}
                loading={this.props.loadingContributorBreakdown}
              />
            </div>
          </div>
        </div>
      </CivicStoryCard>
    );
  }
}

RealTimeInformationOnPoliticalCampaigns.displayName = 'RealTimeInformationOnPoliticalCampaigns';
RealTimeInformationOnPoliticalCampaigns.propTypes = propTypes;
RealTimeInformationOnPoliticalCampaigns.defaultProps = defaultProps;

// Connect this to the redux store when necessary
export default connect(
  state => ({
    loading: isPoliticalCampaignsLoading(state),
    loadingContributorBreakdown: isContributorBreakdownLoading(state),
    loadingSpendingBreakdown: isSpendingBreakdownLoading(state),
    contributorBreakdown: getContributorBreakdownData(state),
    spendingBreakdown: getSpendingBreakdownData(state),
    campaign: getCampaign(state),
    committees: getCommittees(state),
    electionCycle: getElectionCycle(state),
    electionCycles: getElectionCycles(state),
  }),
  dispatch => ({
    fetchContributorBreakdown: (committeeID, electionCycleID) => {
      dispatch(fetchContributorBreakdown(committeeID, electionCycleID));
      dispatch(fetchSpendingBreakdown(committeeID, electionCycleID));
    },
    fetchElectionCycles: dispatch(fetchElectionCycles({ limit: 30 })),
    query: () => dispatch(fetchCommittees({ limit: 3000 })),
    setElectionCycle: c => dispatch(setElectionCycle(c)),
    setCampaign: c => dispatch(setCampaign(c)),
  }),
)(RealTimeInformationOnPoliticalCampaigns);
