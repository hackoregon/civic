import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { storybookStyles } from "@hackoregon/ui-docs";
// import { Form } from "../src";
import notes from "./form.notes.md";

export default () =>
  storiesOf("Component Lib|Lab/Form", module)
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
        return <h2>TODO: Write Form Story</h2>;
      },
      { notes }
    );
