import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { checkA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Checkbox } from "../src";
import { storybookStyles } from "./storyStyles";
import StatefulWrapper from "../src/utils/StatefulWrapper";
import notes from "./checkbox.notes.md";

const GROUP_IDS = {
  LABELS: "Labels",
  STATE: "State",
  DESIGN: "Design",
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
        const value = text("Value", "checkboxValue", GROUP_IDS.DATA);
        const options = {
          Top: "top",
          Start: "start",
          Bottom: "bottom",
          End: "end"
        };
        const labelPlacement = select(
          "Label placement",
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
                  value={value}
                  disabled={disabled}
                  labelPlacement={labelPlacement}
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
        const formLabel = text(
          "Form label",
          "Show results for the following years",
          GROUP_IDS.LABELS
        );
        const labelOne = text("Label One", "2015", GROUP_IDS.LABELS);
        const labelTwo = text("Label Two", "2016", GROUP_IDS.LABELS);
        const labelThree = text("Label Three", "2017", GROUP_IDS.LABELS);
        const labelFour = text("Label Four", "2018", GROUP_IDS.LABELS);
        const formHelperText = text(
          "Form helper text",
          "* Select at least one year",
          GROUP_IDS.LABELS
        );
        const row = boolean("Display in a row", false, GROUP_IDS.DESIGN);
        const disableGroup = boolean("Disable group", false, GROUP_IDS.STATE);
        const disableOne = boolean("Disable 2015", false, GROUP_IDS.STATE);
        const disableTwo = boolean("Disable 2016", false, GROUP_IDS.STATE);
        const disableThree = boolean("Disable 2017", false, GROUP_IDS.STATE);
        const disableFour = boolean("Disable 2018", false, GROUP_IDS.STATE);
        return (
          <div>
            <FormControl>
              <FormLabel>{formLabel}</FormLabel>
              <FormGroup row={row}>
                <StatefulWrapper initialState={{ checked: false }}>
                  {({ get, set }) => {
                    return (
                      <Checkbox
                        label={labelOne}
                        onChange={event => {
                          set({ checked: event.target.checked });
                          action("onChange")(event);
                        }}
                        checked={get("checked")}
                        disabled={disableGroup || disableOne}
                      />
                    );
                  }}
                </StatefulWrapper>
                <StatefulWrapper initialState={{ checked: false }}>
                  {({ get, set }) => {
                    return (
                      <Checkbox
                        label={labelTwo}
                        onChange={event => {
                          set({ checked: event.target.checked });
                          action("onChange")(event);
                        }}
                        checked={get("checked")}
                        disabled={disableGroup || disableTwo}
                      />
                    );
                  }}
                </StatefulWrapper>
                <StatefulWrapper initialState={{ checked: false }}>
                  {({ get, set }) => {
                    return (
                      <Checkbox
                        label={labelThree}
                        onChange={event => {
                          set({ checked: event.target.checked });
                          action("onChange")(event);
                        }}
                        checked={get("checked")}
                        disabled={disableGroup || disableThree}
                      />
                    );
                  }}
                </StatefulWrapper>
                <StatefulWrapper initialState={{ checked: false }}>
                  {({ get, set }) => {
                    return (
                      <Checkbox
                        label={labelFour}
                        onChange={event => {
                          set({ checked: event.target.checked });
                          action("onChange")(event);
                        }}
                        checked={get("checked")}
                        disabled={disableGroup || disableFour}
                      />
                    );
                  }}
                </StatefulWrapper>
              </FormGroup>
              <FormHelperText>{formHelperText}</FormHelperText>
            </FormControl>
          </div>
        );
      },
      { notes }
    );
