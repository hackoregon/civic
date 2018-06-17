import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

import { fetchContributorBreakdown } from '../../state/political-campaigns/actions';
import {
  isContributorBreakdownPending,
  isContributorBreakdownErrors,
  getContributorBreakdownData,
} from '../../state/political-campaigns/selectors';

const propTypes = {
  query: PropTypes.func,
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
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

RealTimeInformationOnPoliticalCampaigns.displayName = 'RealTimeInformationOnPoliticalCampaigns';
RealTimeInformationOnPoliticalCampaigns.propTypes = propTypes;

// Connect this to the redux store when necessary
export default connect(
  state => {
    console.warn('state', state);
    return {
    isLoading: isContributorBreakdownPending(state),
    error: isContributorBreakdownErrors(state),
    ridershipOverTime: getContributorBreakdownData(state),
    }
  },
  dispatch => ({
    query: () => dispatch(fetchContributorBreakdown()),
  }),
)(RealTimeInformationOnPoliticalCampaigns);
