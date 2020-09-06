import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, text } from "@storybook/addon-knobs";
import { NotebookPreview } from "../src";
import { storybookStyles } from "./storyStyles";
import notes from "./notebookPreview.notes.md";

export default () =>
  storiesOf("Component Lib/Common UI/NotebookPreview", module)
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
        return <NotebookPreview message={message} />;
      },
      { notes }
    );
