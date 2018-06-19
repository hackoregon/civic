import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CivicStoryCard } from '@hackoregon/component-library';

import {
  fetchContributorBreakdown,
  fetchCommittees,
  setCampaign,
} from '../../state/political-campaigns/actions';
import {
  isContributorBreakdownPending,
  isContributorBreakdownErrors,
  getContributorBreakdownData,
  getCommittees,
  getCampaign,
} from '../../state/political-campaigns/selectors';

import { campaign } from './defaults';
import ContributorBreakdown from './ContributorBreakdown';
import Controls from './Controls';

const propTypes = {
  query: PropTypes.func,
  campaign: PropTypes.object,
  committees: PropTypes.object,
  setCampaign: PropTypes.func,
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
    this.props.query()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.campaign.id !== this.props.campaign.id) {
      this.props.fetchContributorBreakdown(newProps.campaign.id);
    }
  }

  render() {
    let committees = [];
    let contributors = [];

    if (this.props.committees && this.props.committees.results) {
      committees = this.props.committees.results;
    }

    if (this.props.contributorBreakdown && this.props.contributorBreakdown.results) {
      contributors = this.props.contributorBreakdown.results;
    }

    return (
      <CivicStoryCard
        title="Real-Time Information on Political Campaigns"
        slug="real-time-information-on-political-campaigns"
      >
        <Controls
          campaign={this.props.campaign}
          campaigns={committees}
          setCampaign={this.props.setCampaign}
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
    isLoading: isContributorBreakdownPending(state),
    error: isContributorBreakdownErrors(state),
    contributorBreakdown: getContributorBreakdownData(state),
    campaign: getCampaign(state),
    committees: getCommittees(state),
  }),
  dispatch => ({
    fetchContributorBreakdown: committeeID => dispatch(fetchContributorBreakdown(committeeID)),
    query: () => dispatch(fetchCommittees({ limit: 3000 })),
    setCampaign: c => dispatch(setCampaign(c)),
  }),
)(RealTimeInformationOnPoliticalCampaigns);
