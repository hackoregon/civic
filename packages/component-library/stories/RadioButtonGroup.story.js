import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { checkA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  withKnobs,
  text,
  boolean,
  select,
  array
} from "@storybook/addon-knobs";
import { RadioButtonGroup } from "../src";
import { storybookStyles } from "./storyStyles";
import StatefulWrapper from "../src/utils/StatefulWrapper";
import notes from "./radioButtonGroup.notes.md";

const GROUP_IDS = {
  LABELS: "Labels",
  STATE: "State",
  DESIGN: "Design",
  DATA: "Data",
  CUSTOM: "Custom"
};

export default () =>
  storiesOf("Component Lib/Basic Inputs/Radio Button Group", module)
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
        const grpLabel = text("Group label", "Year", GROUP_IDS.LABELS);
        const radioLabels = ["2016", "2017", "2018"];
        const labels = array("Labels", radioLabels, ", ", GROUP_IDS.LABELS);
        const disabled = boolean("Disabled", false, GROUP_IDS.STATE);
        return (
          <StatefulWrapper initialState={{ value: radioLabels[0] }}>
            {({ get, set }) => {
              return (
                <RadioButtonGroup
                  grpLabel={grpLabel}
                  labels={labels}
                  onChange={event => {
                    set({ value: event.target.value });
                    action("onChange")(event);
                  }}
                  value={get("value")}
                  disabled={disabled}
                  formHelperText=""
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
        const grpLabel = text("Group label", "Year", GROUP_IDS.LABELS);
        const radioLabels = ["2016", "2017", "2018"];
        const labels = array("Labels", radioLabels, ", ", GROUP_IDS.LABELS);
        const formHelperText = text(
          "Helper text",
          "* Show results for this year",
          GROUP_IDS.LABELS
        );
        const disabled = boolean("Disabled", false, GROUP_IDS.STATE);
        const options = {
          Top: "top",
          Start: "start",
          Bottom: "bottom",
          End: "end"
        };
        const row = boolean("Display in a row", false, GROUP_IDS.CUSTOM);
        const labelPlacement = select(
          "Label placement",
          options,
          "end",
          GROUP_IDS.CUSTOM
        );
        return (
          <StatefulWrapper initialState={{ value: radioLabels[0] }}>
            {({ get, set }) => {
              return (
                <RadioButtonGroup
                  grpLabel={grpLabel}
                  labels={labels}
                  onChange={event => {
                    set({ value: event.target.value });
                    action("onChange")(event);
                  }}
                  value={get("value")}
                  disabled={disabled}
                  labelPlacement={labelPlacement}
                  row={row}
                  formHelperText={formHelperText}
                />
              );
            }}
          </StatefulWrapper>
        );
      },
      { notes }
    )
    .add(
      "Example: Form group",
      () => {
        const grpLabel = text("Group label", "Year", GROUP_IDS.LABELS);
        const radioLabels = ["2016", "2017", "2018"];
        const labels = array("Labels", radioLabels, ", ", GROUP_IDS.LABELS);
        const formHelperText = text(
          "Helper text",
          "* Show results for this year",
          GROUP_IDS.LABELS
        );
        const row = boolean("Display in a row", false, GROUP_IDS.DESIGN);
        const disabled = boolean("Disabled", false, GROUP_IDS.STATE);

        return (
          <StatefulWrapper initialState={{ value: radioLabels[0] }}>
            {({ get, set }) => {
              return (
                <RadioButtonGroup
                  grpLabel={grpLabel}
                  labels={labels}
                  onChange={event => {
                    set({ value: event.target.value });
                    action("onChange")(event);
                  }}
                  value={get("value")}
                  disabled={disabled}
                  row={row}
                  formHelperText={formHelperText}
                />
              );
            }}
          </StatefulWrapper>
        );
      },
      { notes }
    );
