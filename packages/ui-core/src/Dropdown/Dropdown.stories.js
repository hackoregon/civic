import React from "react";
// import { StatefulWrapper } from "@hackoregon/utils";

import { Dropdown } from "./Dropdown";

const dropdownOptions = [
  { value: "0", label: "Murphy Carter" },
  { value: "1", label: "Murphy Bebe" },
  { value: "2", label: "Bebe" },
  { value: "3", label: "Cissi" }
];

export default {
  title: "Component Lib/Basic Inputs/Dropdown",
  parameters: {
    component: Dropdown,
    componentSubtitle: "A dropdown built with ReactSelect 1.3 under the hood"
  },
  args: {
    options: dropdownOptions
  }
};

const Template = args => <Dropdown {...args} />;

export const Standard = Template.bind({});
export const Multi = Template.bind({});
Multi.args = { multi: true, value: ["0", "1"] };
export const NotSearchable = Template.bind({});
NotSearchable.args = { searchable: false };
export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
export const Clearable = Template.bind({});
Clearable.args = { clearable: true, value: "0" };
export const MultiClearable = Template.bind({});
MultiClearable.args = { multi: true, value: ["0", "1"], clearable: true };
