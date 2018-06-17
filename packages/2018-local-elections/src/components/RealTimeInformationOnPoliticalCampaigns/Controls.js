import React from 'react';
import PropTypes from 'prop-types';

import '@hackoregon/component-library/assets/vendor/react-select.min.css';

import { Dropdown } from '@hackoregon/component-library';

const propTypes = {
  campaign: PropTypes.object,
  setCampaign: PropTypes.func,
};

const defaultProps = {
  campaign: {},
};

class Controls extends React.Component {
  renderCampaignDropdown() {
    const options = [
      { value: 'Campaign 1', label: 'Campaign 1' },
      { value: 'Campaign 2', label: 'Campaign 2' },
      { value: 'Campaign 3', label: 'Campaign 3' },
    ];
    const value = options.find(o => o.value === this.props.campaign.value);

    return (
      <Dropdown
        options={options}
        value={value}
        onChange={option => this.props.setCampaign(option)}
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
