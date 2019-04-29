import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { Button } from "../src";
import { storybookStyles } from "./storyStyles";

const title = "Simple usage";

const demoCode = () => <Button onClick={action("clicked")}>Click Me</Button>;

export default () =>
  storiesOf("UI Components/Button", module)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add(title, demoCode);
