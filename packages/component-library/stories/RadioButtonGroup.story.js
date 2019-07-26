import React, { Fragment } from "react";
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
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
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
  storiesOf("Component Lib|Basic Inputs/Radio Button Group", module)
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
        // const radioLabels = ["2016", "2017", "2018"];
        // const labels = array("Labels", radioLabels, ", ", GROUP_IDS.LABELS);
        const labels = array(
          "Labels",
          ["2016", "2017", "2018"],
          ", ",
          GROUP_IDS.LABELS
        );
        const disabled = boolean("Disabled", false, GROUP_IDS.STATE);
        return (
          // what is value (a string?) and starting value
          // set it to the value (label) of the first btn
          <StatefulWrapper initialState={{ value: false }}>
            {({ get, set }) => {
              return (
                <RadioButtonGroup
                  labels={labels}
                  onChange={event => {
                    set({ value: event.target.value });
                    action("onChange")(event);
                  }}
                  value={get("value")}
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
          "Label placement",
          options,
          "end",
          GROUP_IDS.CUSTOM
        );
        return (
          <StatefulWrapper initialState={{ value: false }}>
            {({ get, set }) => {
              return (
                <RadioButtonGroup
                  label={label}
                  onChange={event => {
                    set({ value: event.target.checked });
                    action("onChange")(event);
                  }}
                  value={get("value")}
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
          <StatefulWrapper
            initialState={{
              checkboxOne: false,
              checkboxTwo: false,
              checkboxThree: false,
              checkboxFour: false
            }}
          >
            {({ get, set }) => {
              return (
                <FormControl>
                  <FormLabel>{formLabel}</FormLabel>
                  <FormGroup row={row}>
                    <Fragment>
                      <RadioButtonGroup
                        label={labelOne}
                        onChange={event => {
                          set({ checkboxOne: event.target.checked });
                          action("onChange")(event);
                        }}
                        value={get("checkboxOne")}
                        disabled={disableGroup || disableOne}
                      />
                      <RadioButtonGroup
                        label={labelTwo}
                        onChange={event => {
                          set({ checkboxTwo: event.target.checked });
                          action("onChange")(event);
                        }}
                        value={get("checkboxTwo")}
                        disabled={disableGroup || disableTwo}
                      />
                      <RadioButtonGroup
                        label={labelThree}
                        onChange={event => {
                          set({ checkboxThree: event.target.checked });
                          action("onChange")(event);
                        }}
                        value={get("checkboxThree")}
                        disabled={disableGroup || disableThree}
                      />
                      <RadioButtonGroup
                        label={labelFour}
                        onChange={event => {
                          set({ checkboxFour: event.target.checked });
                          action("onChange")(event);
                        }}
                        value={get("checkboxFour")}
                        disabled={disableGroup || disableFour}
                      />
                    </Fragment>
                  </FormGroup>
                  <FormHelperText>{formHelperText}</FormHelperText>
                </FormControl>
              );
            }}
          </StatefulWrapper>
        );
      },
      { notes }
    );
