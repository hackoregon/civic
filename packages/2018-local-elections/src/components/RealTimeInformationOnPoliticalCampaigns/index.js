import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CivicStoryCard } from '@hackoregon/component-library';

import {
  fetchContributorBreakdown,
  fetchSpendingBreakdown,
  fetchElectionCycles,
  fetchCommittees,
  setElectionCycle,
  setCampaign,
} from '../../state/political-campaigns/actions';
import {
  isPoliticalCampaignsLoading,
  getContributorBreakdownData,
  getSpendingBreakdownData,
  getElectionCycles,
  getElectionCycle,
  getCommittees,
  getCampaign,
} from '../../state/political-campaigns/selectors';

import { campaign, electionCycle } from './defaults';
import ContributorBreakdown from './ContributorBreakdown';
import Controls from './Controls';

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
  fetchSpendingBreakdown: PropTypes.func,
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

    return (
      <CivicStoryCard
        title="Real-Time Information on Political Campaigns"
        slug="real-time-information-on-political-campaigns"
        loading={this.props.loading}
      >
        <Controls
          campaign={this.props.campaign}
          campaigns={committees}
          setCampaign={this.props.setCampaign}
          electionCycle={this.props.electionCycle}
          electionCycles={electionCycles}
          setElectionCycle={this.props.setElectionCycle}
        />
        <ContributorBreakdown contributors={contributors} />
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
