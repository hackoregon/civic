---
to: packages/component-library/stories/<%=component%>.story.js
---
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, text } from "@storybook/addon-knobs";
import notes from "./<%=camelComponent%>.notes.md";
import { <%=component%> } from "../src";
import { storybookStyles } from "./storyStyles";

export default () =>
  storiesOf("Component Lib|Basic Inputs/<%=component%>", module)
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
        return <<%=component%> message={message} />
      },
      { notes }
    );
