import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, boolean } from "@storybook/addon-knobs";
// import notes from "./checkbox.notes.md";
import { CivicCheckbox } from "../src";
import { storybookStyles } from "./storyStyles";

export default () =>
  storiesOf("Component Lib|Basic Inputs/Checkbox", module)
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
        const checked = boolean("Checked", "true");
        return (
          <CivicCheckbox
            onClick={action("clicked")}
            onChange={action("changed")}
            checked={checked}
          />
        );
      }
      // { notes }
    );
