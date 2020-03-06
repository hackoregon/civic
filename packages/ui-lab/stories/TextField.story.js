import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { storybookStyles } from "@hackoregon/ui-docs";
// import { TextField } from "../src";
import notes from "./textField.notes.md";

export default () =>
  storiesOf("Component Lib|Lab/TextField", module)
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
        return <h2>TODO: Write TextField Story</h2>;
      },
      { notes }
    );
