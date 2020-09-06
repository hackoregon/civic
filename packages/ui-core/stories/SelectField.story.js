import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
// import { SelectField } from "../src";
import { storybookStyles } from "./storyStyles";
import notes from "./selectField.notes.md";

export default () =>
  storiesOf("Component Lib/Basic Inputs/SelectField", module)
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
        return (
          <div>
            <h2>TODO: Write Select Field Story</h2>
          </div>
        );
      },
      { notes }
    );
