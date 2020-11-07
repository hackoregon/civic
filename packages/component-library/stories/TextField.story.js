import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, text } from "@storybook/addon-knobs";
import { TextField } from "../src";
import { storybookStyles } from "./storyStyles";
import notes from "./textField.notes.md";

export default () =>
  storiesOf("Component Lib/Basic Inputs/TextField", module)
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
        const message = text("Message");
        return <TextField message={message} />;
      },
      { notes }
    );
