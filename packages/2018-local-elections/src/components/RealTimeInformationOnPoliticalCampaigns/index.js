import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

import { fetchContributorBreakdown, setCampaign } from '../../state/political-campaigns/actions';
import {
  isContributorBreakdownPending,
  isContributorBreakdownErrors,
  getContributorBreakdownData,
  getCampaign,
} from '../../state/political-campaigns/selectors';

import Controls from './Controls';

const propTypes = {
  query: PropTypes.func,
  campaign: PropTypes.string,
  setCampaign: PropTypes.func,
};

class RealTimeInformationOnPoliticalCampaigns extends React.Component {
  componentDidMount() {
    this.props.query()
  }

  render() {
    return (
      <CivicStoryCard
        title="Real-Time Information on Political Campaigns"
        slug="real-time-information-on-political-campaigns"
      >
        <Controls
          campaign={this.props.campaign}
          setCampaign={this.props.setCampaign}
        />
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

RealTimeInformationOnPoliticalCampaigns.displayName = 'RealTimeInformationOnPoliticalCampaigns';
RealTimeInformationOnPoliticalCampaigns.propTypes = propTypes;

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isContributorBreakdownPending(state),
    error: isContributorBreakdownErrors(state),
    ridershipOverTime: getContributorBreakdownData(state),
    campaign: getCampaign(state),
  }),
  dispatch => ({
    query: () => dispatch(fetchContributorBreakdown()),
    setCampaign: campaign => dispatch(setCampaign(campaign)),
  }),
)(RealTimeInformationOnPoliticalCampaigns);
