/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { connect } from "react-redux";
import { uniqBy } from "lodash";

import { CivicStoryCard } from "@hackoregon/component-library";

import {
  fetchContributorBreakdown,
  fetchSpendingBreakdown,
  fetchElectionCycles,
  fetchCommittees,
  setElectionCycle,
  setCampaign
} from "../../state/political-campaigns/actions";
import {
  isContributorBreakdownLoading,
  getContributorBreakdownData,
  isSpendingBreakdownLoading,
  getSpendingBreakdownData,
  isPoliticalCampaignsLoading,
  getElectionCycles,
  getElectionCycle,
  getCommittees,
  getCampaign
} from "../../state/political-campaigns/selectors";

import { campaign, electionCycle } from "./defaults";
import ContributorBreakdown from "./ContributorBreakdown";
import SpendingBreakdown from "./SpendingBreakdown";
import Controls from "./Controls";

const descriptionClass = css``;

const missionClass = css``;

const chartGrid = css`
  display: flex;
  width: 100%;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const chartCol = css`
  flex: 1;
`;

const chartStyle = css`
  padding: 20px;
  @media (min-width: 641px) {
    height: 350px;
  }
`;

const propTypes = {
  query: PropTypes.func,
  campaign: PropTypes.shape({}),
  committees: PropTypes.shape({}),
  setCampaign: PropTypes.func,
  electionCycle: PropTypes.shape({}),
  electionCycles: PropTypes.func,
  spendingBreakdown: PropTypes.shape({}),
  setElectionCycle: PropTypes.func,
  contributorBreakdown: PropTypes.shape({}),
  loadingContributorBreakdown: PropTypes.bool
};

const defaultProps = {
  campaign: {},
  committees: {
    results: []
  }
};

class RealTimeInformationOnPoliticalCampaigns extends React.Component {
  componentDidMount() {
    this.props.setCampaign(campaign);
    this.props.setElectionCycle(electionCycle);
    this.props.query();
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.electionCycle &&
      newProps.campaign &&
      (newProps.campaign.id !== this.props.campaign.id ||
        newProps.electionCycle.id !== this.props.electionCycle.id)
    ) {
      this.props.fetchChartData(newProps.campaign.id, newProps.electionCycle);
      this.props.fetchElectionCycles(newProps.campaign.id);
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

    if (
      this.props.contributorBreakdown &&
      this.props.contributorBreakdown.results
    ) {
      contributors = uniqBy(
        this.props.contributorBreakdown.results,
        "donor_category"
      );
    }

    if (this.props.electionCycles && this.props.electionCycles.results) {
      electionCycles = this.props.electionCycles.results;
    }

    if (this.props.spendingBreakdown && this.props.spendingBreakdown.results) {
      spending = uniqBy(
        this.props.spendingBreakdown.results,
        "spending_category"
      );
    }

    return (
      <CivicStoryCard
        title="Real-Time Information on Political Campaigns"
        slug="real-time-information-on-political-campaigns"
        loading={this.props.loadingControls}
      >
        <h2 className={descriptionClass}>
          Data on contributions and spending from ORESTAR
        </h2>
        <Controls
          campaign={this.props.campaign}
          campaigns={committees}
          setCampaign={this.props.setCampaign}
          electionCycle={this.props.electionCycle}
          electionCycles={electionCycles}
          setElectionCycle={this.props.setElectionCycle}
        />
        <p className={missionClass} />
        <div className={chartGrid}>
          <div className={chartCol}>
            <div className={chartStyle}>
              <SpendingBreakdown
                spending={spending}
                loading={this.props.loadingSpendingBreakdown}
              />
            </div>
          </div>
          <div className={chartCol}>
            <div className={chartStyle}>
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

RealTimeInformationOnPoliticalCampaigns.displayName =
  "RealTimeInformationOnPoliticalCampaigns";
RealTimeInformationOnPoliticalCampaigns.propTypes = propTypes;
RealTimeInformationOnPoliticalCampaigns.defaultProps = defaultProps;

// Connect this to the redux store when necessary
export default connect(
  state => ({
    loadingContributorBreakdown: isContributorBreakdownLoading(state),
    loadingSpendingBreakdown: isSpendingBreakdownLoading(state),
    loadingControls: isPoliticalCampaignsLoading(state),
    contributorBreakdown: getContributorBreakdownData(state),
    spendingBreakdown: getSpendingBreakdownData(state),
    campaign: getCampaign(state),
    committees: getCommittees(state),
    electionCycle: getElectionCycle(state),
    electionCycles: getElectionCycles(state)
  }),
  dispatch => ({
    // eslint-disable-next-line no-shadow
    fetchChartData: (committeeID, electionCycle) => {
      dispatch(
        fetchContributorBreakdown(committeeID, electionCycle.id, {
          ordering: "sum"
        })
      );
      dispatch(
        fetchSpendingBreakdown(committeeID, electionCycle.name, {
          ordering: "sum",
          limit: 8
        })
      );
    },
    fetchElectionCycles: committeeID =>
      dispatch(fetchElectionCycles(committeeID, { limit: 30 })),
    query: () => dispatch(fetchCommittees({ limit: 3000 })),
    setElectionCycle: c => dispatch(setElectionCycle(c)),
    setCampaign: c => dispatch(setCampaign(c))
  })
)(RealTimeInformationOnPoliticalCampaigns);
