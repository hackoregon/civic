import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import {
  withKnobs,
  text,
  color,
  optionsKnob as options,
  select
} from "@storybook/addon-knobs";
import notes from "./button.markdown.md";
import { Button } from "../src";
import { storybookStyles } from "./storyStyles";

export default () =>
  storiesOf("Component Lib|Basic Inputs/Button", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add(
      "Standard",
      () => {
        const label = text("Label", "Hello CIVIC");
        return <Button onClick={action("clicked")}>{label}</Button>;
      },
      { notes }
    )
    .add(
      "Custom",
      () => {
        const accentColor = color("Text & border color", "#DC4556");
        const bkgndColor = color("Background color", "#FFFFFF");
        const label = text("Label", "Hello CIVIC");
        const transitionOptions = {
          Standard: "all .2s ease-in-out",
          Slow: "all .6s ease-in-out",
          Fast: "all .1s ease-in-out"
        };
        const transition = select(
          "Transition",
          transitionOptions,
          "all .2s ease-in-out"
        );
        //const disabled = boolean("Disabled", false);
        const valuesObj = {
          Enabled: "",
          Disabled: "disabled"
        };
        const optionsObj = {
          display: "inline-radio"
        };
        const disabled = options("State", valuesObj, "", optionsObj);
        //console.log(disabled);
        return (
          <Button
            onClick={action("clicked")}
            accentColor={accentColor}
            bkgndColor={bkgndColor}
            transition={transition}
            disabled={disabled}
          >
            {label}
          </Button>
        );
      },
      { notes }
    )
    .add(
      "Custom non-text label",
      () => {
        const accentColor = color("Border color", "#DC4556");
        const bkgndColor = color("Background color", "#FFFFFF");
        const transitionOptions = {
          Standard: "all .2s ease-in-out",
          Slow: "all .6s ease-in-out",
          Fast: "all .1s ease-in-out"
        };
        const transition = select(
          "Transition",
          transitionOptions,
          "all .2s ease-in-out"
        );
        const ariaLabel = text("aria-label", "So cool");
        return (
          <Button
            onClick={action("clicked")}
            accentColor={accentColor}
            bkgndColor={bkgndColor}
            transition={transition}
          >
            {" "}
            <span role="img" aria-label={ariaLabel}>
              😀 😎 👍 💯
            </span>
          </Button>
        );
      },
      { notes }
    );
