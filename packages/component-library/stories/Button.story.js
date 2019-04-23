import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import {
  withKnobs,
  text,
  color,
  boolean,
  select
} from "@storybook/addon-knobs";
import notes from "./button.markdown.md";
import { Button } from "../src";
import { storybookStyles } from "./storyStyles";

const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

export default () =>
  storiesOf("Component Lib|Basic Inputs/Button", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add("Simple usage", () => {
      return (
        <Button
          onClick={action("clicked")}
          //disabled={boolean("Disabled", false)}
        >
          Hello CIVIC
        </Button>
      );
    })
    .add("Basic usage", () => {
      const accentColor = color("Text & border color", "#DC4556");
      const bkgndColor = color("Background color", "#FFFFFF");
      const label = text("Label", "Hello CIVIC");
      const transitionOptions = {
        Common: "all .2s ease-in-out",
        Slower: "all 2s ease-in-out"
      };
      const commonTransition = select(
        "Transition",
        transitionOptions,
        "all .2s ease-in-out"
      );
      //const commonTransition = text("Transition", "all .2s ease-in-out");
      const disabled = boolean("Disabled", false);
      return (
        <Button
          onClick={action("clicked")}
          accentColor={accentColor}
          bkgndColor={bkgndColor}
          commonTransition={commonTransition}
          disabled={disabled}
        >
          {label}
        </Button>
      );
    })
    .add(
      "With some emoji",
      () => {
        const accentColor = color("Border color", "#DC4556");
        const bkgndColor = color("Background color", "#FFFFFF");
        return (
          <Button
            onClick={action("clicked")}
            accentColor={accentColor}
            bkgndColor={bkgndColor}
          >
            <span role="img" aria-label="So cool">
              😀 😎 👍 💯
            </span>
          </Button>
        );
      },
      { notes }
    );
