import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { number, withKnobs, color } from "@storybook/addon-knobs";
import { Badge } from "../src";
import { storybookStyles } from "./storyStyles";
import notes from "./badge.notes.md";

export default () =>
  storiesOf("Component Lib/Common UI/Badge", module)
    .addDecorator(withKnobs)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add("Default", () => <Badge />)
    .add(
      "With Children",
      () => (
        <Badge>
          <h1>Hello World</h1>
        </Badge>
      ),
      { notes }
    )
    .add(
      "Custom",
      () => (
        <Badge value={number("value", 1)} color={color("color", "red")}>
          <h1>Hello World</h1>
        </Badge>
      ),
      { notes }
    );
