import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { checkA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
// import { FormGroup } from "@material-ui/core/FormGroup";
import notes from "./checkbox.notes.md";
import { Checkbox } from "../src";
import { storybookStyles } from "./storyStyles";
import StatefulWrapper from "../src/utils/StatefulWrapper";

const GROUP_IDS = {
  LABELS: "Labels",
  STATE: "State",
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
        const disabled = boolean("Disabled", false, GROUP_IDS.STATE);
        return (
          <StatefulWrapper initialState={{ checked: false }}>
            {({ get, set }) => {
              return (
                <Checkbox
                  label={label}
                  onChange={event => {
                    set({ checked: event.target.checked });
                    action("onChange")(event);
                  }}
                  checked={get("checked")}
                  disabled={disabled}
                />
              );
            }}
          </StatefulWrapper>
        );
      },
      { notes }
    )
    .add(
      "Custom",
      () => {
        const label = text("Label", "Label", GROUP_IDS.LABELS);
        const disabled = boolean("Disabled", false, GROUP_IDS.STATE);
        const options = {
          Top: "top",
          Start: "start",
          Bottom: "bottom",
          End: "end"
        };
        const labelPlacement = select(
          "Placement",
          options,
          "end",
          GROUP_IDS.CUSTOM
        );
        return (
          <StatefulWrapper initialState={{ checked: false }}>
            {({ get, set }) => {
              return (
                <Checkbox
                  label={label}
                  onChange={event => {
                    set({ checked: event.target.checked });
                    action("onChange")(event);
                  }}
                  checked={get("checked")}
                  disabled={disabled}
                  labelPlacement={labelPlacement}
                />
              );
            }}
          </StatefulWrapper>
        );
      },
      { notes }
    );
