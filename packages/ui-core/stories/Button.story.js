import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, color, select } from "@storybook/addon-knobs";
import notes from "./button.notes.md";
import { Button } from "../src";
import { storybookStyles } from "./storyStyles";

export default () =>
  storiesOf("Component Lib/Basic Inputs/Button", module)
    .addDecorator(withKnobs)
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
        const transitionOptions = {
          Standard: "all .2s ease-in-out",
          Slow: "all .6s ease-in-out",
          Fast: "all .1s ease-in-out"
        };
        const label = text("Label", "Hello CIVIC");
        const accentColor = color("Text & border color", "#DC4556");
        const bkgndColor = color("Background color", "#FFFFFF");
        const transition = select(
          "Transition",
          transitionOptions,
          "all .2s ease-in-out"
        );
        return (
          <Button
            onClick={action("clicked")}
            accentColor={accentColor}
            bkgndColor={bkgndColor}
            transition={transition}
          >
            {label}
          </Button>
        );
      },
      { notes }
    )
    .add(
      "Example: Non-text label",
      () => {
        const label = text("Emoji label", "😀 😎 👍 💯");
        const ariaLabel = text("aria-label", "So cool");
        return (
          <Button onClick={action("clicked")}>
            {label}
            <span role="img" aria-label={ariaLabel} />
          </Button>
        );
      },
      { notes }
    );
