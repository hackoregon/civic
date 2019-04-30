import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Button } from "../src";
import { storybookStyles } from "./storyStyles";

const displayName = Button.displayName || "Button";

const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

const simpleButtonLabel = "Hello button";

export default () =>
  storiesOf("Component Lib|Basic UI Components/Button", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add("Simple usage", () => (
      <Button onClick={action("clicked")}>{simpleButtonLabel}</Button>
    ))
    .add("With some emoji", () => (
      <Button onClick={action("clicked")}>
        <span role="img" aria-label="So cool">
          😀 😎 👍 💯
        </span>
      </Button>
    ));