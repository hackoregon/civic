import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { Slider } from "../src";
import { storybookStyles } from "./storyStyles";

const title = "Simple usage";

const demoCode = () => {
  class CustomSlider extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0
      };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
      this.setState({ value });
    }

    render() {
      const { value } = this.state;
      return (
        <div className="slider-container">
          <Slider
            min={0}
            max={100}
            value={value}
            onChange={this.handleChange}
          />
        </div>
      );
    }
  }

  // NOTE - ONLY return block will be documented as src - find out how to show above code
  return <CustomSlider />;
};

// const propDocs = { inline: true, propTables: [Slider] };

export default () =>
  storiesOf("Component Lib|Basic Inputs/Slider", module)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add(title, demoCode);
