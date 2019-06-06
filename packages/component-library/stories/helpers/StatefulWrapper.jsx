import React, { Component } from "react";
import { func, shape } from "prop-types";

class StatefulWrapper extends Component {
  static propTypes = {
    children: func.isRequired,
    initialState: shape().isRequired
  };

  constructor(props) {
    super(props);
    /* eslint-disable react/destructuring-assignment */
    this.state = {
      ...this.props.initialState
    };
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  }

  // Getter for any value in state
  get = stateKey => this.state[stateKey];

  // Setter for any value in state
  set = newStateObject => this.setState(newStateObject);

  render() {
    const { children } = this.props;
    return <span>{children({ get: this.get, set: this.set })}</span>;
  }
}

export default StatefulWrapper;
