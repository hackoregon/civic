import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { css } from 'emotion';

class SelectMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }
  render() {
    const { selectedOption } = this.state;
    const { options } = this.props;
    const baseStyles = css(`
      max-width: 250px;

      .Select-control, &.is-open > .Select-control, .Select-menu-outer {
        border-color: rgb(151, 151, 151)
      }
      .Select-arrow {
        border-color: rgb(237, 73, 91) transparent transparent;

      }
    `);

    return (
      <Select
        name="form-field-name"
        value={selectedOption}
        onChange={this.handleChange}
        className={baseStyles}
        multi
        options={options}
      />
    );
  }
}

SelectMenu.propTypes = {
  options: React.PropTypes.array,
};

export default SelectMenu;
