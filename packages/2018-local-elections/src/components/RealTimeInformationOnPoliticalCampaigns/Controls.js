/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";

import { Dropdown } from "@hackoregon/component-library";

const propTypes = {
  campaign: PropTypes.shape({ filer_name: PropTypes.string }),
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({ filer_name: PropTypes.string })
  ),
  setCampaign: PropTypes.func,
  electionCycles: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string })
  ),
  electionCycle: PropTypes.shape({ name: PropTypes.string }),
  setElectionCycle: PropTypes.func
};

const defaultProps = {
  campaign: {},
  electionCycle: {},
  electionCycles: []
};

class Controls extends React.Component {
  renderElectionCycleDropdown() {
    const options = this.props.electionCycles.map(cycle => ({
      value: cycle.name,
      label: cycle.name
    }));
    const value = options.find(o => o.value === this.props.electionCycle.name);

    const onChange = option => {
      const cycle = this.props.electionCycles.find(
        c => c.name === option.value
      );

      this.props.setElectionCycle(cycle);
    };

    return (
      <Dropdown
        options={options}
        value={value}
        onChange={onChange}
        searchable
      />
    );
  }

  renderCampaignDropdown() {
    const options = this.props.campaigns.map(campaign => ({
      value: campaign.filer_name,
      label: campaign.filer_name
    }));
    const value = options.find(o => o.value === this.props.campaign.filer_name);

    const onChange = option => {
      const committee = this.props.campaigns.find(
        c => c.filer_name === option.value
      );

      this.props.setCampaign(committee);
    };

    return (
      <Dropdown
        options={options}
        value={value}
        onChange={onChange}
        searchable
      />
    );
  }

  render() {
    const campaignDropdown = this.renderCampaignDropdown();
    const electionCycleDropdown = this.renderElectionCycleDropdown();

    return (
      <div>
        <div style={{ float: "left", width: "50%" }}>{campaignDropdown}</div>
        <div style={{ float: "right", width: "50%" }}>
          {electionCycleDropdown}
        </div>
      </div>
    );
  }
}

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;
