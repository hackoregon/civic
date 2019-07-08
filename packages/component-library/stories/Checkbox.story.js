import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, text } from "@storybook/addon-knobs";
import notes from "./checkbox.notes.md";
import { CivicCheckbox } from "../src";
import { storybookStyles } from "./storyStyles";
import StatefulWrapper from "../src/utils/StatefulWrapper";

const GROUP_IDS = {
  LABELS: "Labels",
  DATA: "Data",
  CUSTOM: "Custom"
};

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
        const label = text("Label", "Label", GROUP_IDS.LABELS);
        return (
          <StatefulWrapper initialState={{ checked: false }}>
            {({ get, set }) => {
              return (
                <CivicCheckbox
                  label={label}
                  onChange={event => {
                    set({ checked: event.target.checked });
                    action("onChange")(event);
                  }}
                  checked={get("checked")}
                />
              );
            }}
          </StatefulWrapper>
        );
      },
      { notes }
    );
