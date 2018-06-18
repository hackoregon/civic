import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

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

import Controls from './Controls';

const propTypes = {
  query: PropTypes.func,
  campaign: PropTypes.object,
  committees: PropTypes.object,
  setCampaign: PropTypes.func,
};

const defaultProps = {
  committees: {
    results: [],
  },
};

class RealTimeInformationOnPoliticalCampaigns extends React.Component {
  componentDidMount() {
    this.props.setCampaign(campaign);
    this.props.query()
  }

  render() {
    let committees = [];

    if (this.props.committees && this.props.committees.results) {
      committees = this.props.committees.results;
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
        <Placeholder />
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
    query: () => {
      dispatch(fetchCommittees({ limit: 3000 }));
      //dispatch(fetchContributorBreakdown())
    },
    setCampaign: campaign => dispatch(setCampaign(campaign)),
  }),
)(RealTimeInformationOnPoliticalCampaigns);
