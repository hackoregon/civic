import React from 'react';
import PropTypes from 'prop-types';

import '@hackoregon/component-library/assets/vendor/react-select.min.css';

import { Dropdown } from '@hackoregon/component-library';

const propTypes = {
  campaign: PropTypes.object,
  campaigns: PropTypes.array,
  setCampaign: PropTypes.func,
};

const defaultProps = {
  campaign: {},
  committees: [],
};

class Controls extends React.Component {
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

    return (
      <div>
        <div>Select campaign: {campaignDropdown}</div>
      </div>
    );
  }
}

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;
