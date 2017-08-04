import React, { Component, PropTypes } from 'react';
import { SimpleSelect } from 'react-selectize';

class DropdownMenu extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })),
    dispatch: PropTypes.func,
    reduxAction: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      label: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(option) {
    if (option) {
      if (this.props.dispatch) {
        this.props.dispatch(this.props.reduxAction(option.value));
      }
      this.setState({ value: option.value, label: option.label });
    }
  }

  render() {
    require('react-selectize/dist/index.css');
    return (
      <SimpleSelect
        {...this.props}
        onValueChange={this.handleChange}
        theme="default"
        transitionEnter
        transitionLeave
        options={this.props.options}
      />
    );
  }
}

export default DropdownMenu;
