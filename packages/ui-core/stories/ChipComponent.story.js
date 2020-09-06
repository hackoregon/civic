import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, text } from "@storybook/addon-knobs";
import notes from "./chip.notes.md";
import { Chip } from "../src";
import { storybookStyles } from "./storyStyles";

export default () => {
  storiesOf("Component Lib/Common UI/Chip", module)
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
        const tag = text("Tag", "Hello CIVIC");
        const color = text("Color", "red");
        return <Chip tag={tag} clickable color={color} />;
      },
      { notes }
    );
};
