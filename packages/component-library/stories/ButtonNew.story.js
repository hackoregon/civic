import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { ButtonNew } from "../src";
import { storybookStyles } from "./storyStyles";
import notes from "./buttonNew.notes.md";

const GROUP_IDS = {
  LABELS: "Labels"
};

export default () =>
  storiesOf("Component Lib/Basic Inputs/ButtonNew", module)
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
        const label = text("Label", "Submit", GROUP_IDS.LABELS);
        return <ButtonNew onClick={action("clicked")} label={label} />;
      },
      { notes }
    )
    .add(
      "Custom",
      () => {
        const label = text("Label", "Submit", GROUP_IDS.LABELS);
        const type = select(
          "Type",
          ["primary", "secondary"],
          "secondary",
          GROUP_IDS.LABELS
        );
        return (
          <ButtonNew onClick={action("clicked")} label={label} type={type} />
        );
      },
      { notes }
    );
