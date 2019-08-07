import React, { Fragment } from "react";
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
import { Select } from "@material-ui/core";
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
  storiesOf("Component Lib|Basic Inputs/Select", module)
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
          <StatefulWrapper initialState={{ value: false }}>
            {({ get, set }) => {
              return (
                <Select
                  label={label}
                  onChange={event => {
                    set({ value: event.target.checked });
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
    );
