import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Slider } from '../src';
import { checkA11y } from '@storybook/addon-a11y';

const displayName = Slider.displayName || 'Slider';
const title = 'Simple usage';
const description = `
  This is some basic usage with the slider component as built for Raise Effect, updated with changes for latest rc-slider. Due to the nature of the component, a higher order component is required to contain local state.
  Sliding should trigger changes that affect the local state.`;

const demoCode = () => {
  class CustomSlider extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0,
      };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value) {
      this.setState({ value });
    }
    render() {
      return (
        <div className="slider-container">
          <Slider
            min={0}
            max={100}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
      );
    }
  }

  // NOTE - ONLY return block will be documented as src - find out how to show above code
  return (<CustomSlider />);
};

// const propDocs = { inline: true, propTables: [Slider] };

export default () => storiesOf("UI Components/Slider", module)
  .addDecorator(checkA11y)
  .add(title, demoCode);
