import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";
import { StatefulWrapper } from "@hackoregon/utils";
import { storybookStyles } from "./storyStyles";
import notes from "./select.notes.md";
import Select from "../src/Select/Select";

const GROUP_IDS = {
  LABELS: "Labels",
  STATE: "State",
  DESIGN: "Design",
  DATA: "Data",
  CUSTOM: "Custom"
};

export default () =>
  storiesOf("Component Lib/Basic Inputs/Select", module)
    .addDecorator(withKnobs)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add(
      "Standard One",
      () => {
        const formLabel = text(
          "Form label",
          "TriMet Bus Lines",
          GROUP_IDS.LABELS
        );
        const disabled = boolean("Disabled", false, GROUP_IDS.STATE);
        const optionsOne = [
          "All",
          "2 - Division",
          "4 - Fessenden",
          "6 - Martin Luther King Jr. Blvd",
          "8 - Jackson Park/NE 15th",
          "9 - Powell Blvd",
          "10 - Harold St"
        ];
        const options = object("List items", optionsOne, GROUP_IDS.DATA);
        return (
          <StatefulWrapper initialState={{ value: "All" }}>
            {({ get, set }) => {
              return (
                <Select
                  formLabel={formLabel}
                  onChange={event => {
                    set({ value: event.target.value });
                    action("onChange")(event);
                  }}
                  value={get("value")}
                  disabled={disabled}
                  options={options}
                />
              );
            }}
          </StatefulWrapper>
        );
      },
      { notes }
    )
    .add(
      "Standard Two",
      () => {
        const formLabel = text(
          "Form label",
          "TriMet Bus Lines",
          GROUP_IDS.LABELS
        );
        const disabled = boolean("Disabled", false, GROUP_IDS.STATE);
        const optionsOne = [
          { value: 1, label: "All" },
          { value: 2, label: "2 - Division" },
          { value: 4, label: "4 - Fessenden" },
          { value: 5, label: "6 - Martin Luther King Jr. Blvd" },
          { value: 8, label: "8 - Jackson Park/NE 15th" },
          { value: 9, label: "9 - Powell Blvd" },
          { value: 10, label: "10 - Harold St" }
        ];
        const options = object("List items", optionsOne, GROUP_IDS.DATA);
        return (
          <StatefulWrapper initialState={{ value: 1 }}>
            {({ get, set }) => {
              return (
                <Select
                  formLabel={formLabel}
                  onChange={event => {
                    set({ value: event.target.value });
                    action("onChange")(event);
                  }}
                  value={get("value")}
                  disabled={disabled}
                  options={options}
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
        const formLabel = text(
          "Form label",
          "TriMet Bus Lines",
          GROUP_IDS.LABELS
        );
        const formHelperText = text(
          "Form helper text",
          "* Select a bus line",
          GROUP_IDS.LABELS
        );
        const disabled = boolean("Disabled", false, GROUP_IDS.STATE);
        const optionsOne = [
          "All",
          "2 - Division",
          "4 - Fessenden",
          "6 - Martin Luther King Jr. Blvd",
          "8 - Jackson Park/NE 15th",
          "9 - Powell Blvd",
          "10 - Harold St"
        ];
        const options = object("List items", optionsOne, GROUP_IDS.DATA);
        return (
          <StatefulWrapper initialState={{ value: "All" }}>
            {({ get, set }) => {
              return (
                <Select
                  formLabel={formLabel}
                  formHelperText={formHelperText}
                  onChange={event => {
                    set({ value: event.target.value });
                    action("onChange")(event);
                  }}
                  value={get("value")}
                  disabled={disabled}
                  options={options}
                />
              );
            }}
          </StatefulWrapper>
        );
      },
      { notes }
    );
