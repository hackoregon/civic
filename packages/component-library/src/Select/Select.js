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
    this.props.onChangeCallback(selectedOption);
  }
  render() {
    const { selectedOption } = this.state;
    const { options, multi, value } = this.props;
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
        value={selectedOption || value}
        onChange={this.handleChange}
        className={baseStyles}
        multi={multi}
        options={options}
        simpleValue
      />
    );
  }
}

SelectMenu.propTypes = {
  options: React.PropTypes.array,
  multi: React.PropTypes.bool,
  value: React.PropTypes.string,
  onChangeCallback: React.PropTypes.func,
};

export default SelectMenu;
