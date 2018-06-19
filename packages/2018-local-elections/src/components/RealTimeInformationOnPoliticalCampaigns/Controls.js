import React from 'react';
import PropTypes from 'prop-types';

import '@hackoregon/component-library/assets/vendor/react-select.min.css';

import { Dropdown } from '@hackoregon/component-library';

const propTypes = {
  campaign: PropTypes.object,
  campaigns: PropTypes.array,
  setCampaign: PropTypes.func,
  electionCycles: PropTypes.array,
  electionCycle: PropTypes.object,
  setElectionCycle: PropTypes.func,
};

const defaultProps = {
  campaign: {},
  committees: [],
  electionCycle: {},
  electionCycles: [],
};

class Controls extends React.Component {
  renderElectionCycleDropdown() {
    const options = this.props.electionCycles.map(cycle => ({
      value: cycle.name, label: cycle.name,
    }));
    const value = options.find(o => o.value === this.props.electionCycle.name);

    const onChange = (option) => {
      const cycle = this.props.electionCycles.find(c => c.name === option.value);

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
      value: campaign.filer_name, label: campaign.filer_name,
    }));
    const value = options.find(o => o.value === this.props.campaign.filer_name);

    const onChange = (option) => {
      const committee = this.props.campaigns.find(c => c.filer_name === option.value);

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
        <div>Select campaign: {campaignDropdown}</div>
        <div>Select election cycle: {electionCycleDropdown}</div>
      </div>
    );
  }
}

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;
