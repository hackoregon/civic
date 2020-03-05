import React, { Component, Fragment } from "react";
import { func, shape } from "prop-types";

/**
 * Helper function set up dynamic state in controlled form components for Storybook stories
 * Takes in an `initialState` object with any number of properties
 * Returns a function as a child component and provides `get` and `set` helpers
 * to update the controlled state.
 *
 * EXAMPLE:
 * <StatefulWrapper initialState={{ value: 0 }}>
 *    {({ get, set }) => {
 *      return (
 *        <ControlledFormComponent
 *          onChange={newValue => set({ value: newValue }) }
 *          value={get("value")}
 *        />
 *      );
 *    }}
 *  </StatefulWrapper>
 *
 * ⚠️ Do not set `value` as a knob when using this wrapper, it causes issues with
 * Civic's deployed version of Storybook that you will not see locally ⚠️
 */
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
    return <Fragment>{children({ get: this.get, set: this.set })}</Fragment>;
  }
}

export default StatefulWrapper;
