import React, { useState } from "react";

import { wallOfText } from "@hackoregon/utils";
import { Select } from "./Select";

export default {
  title: "Component Lib/Basic Inputs/Select",
  parameters: {
    component: Select,
    componentSubtitle: "Radio Button Group"
  },
  argTypes: {
    value: { control: { disable: true } }
  }
};

const InteractiveTemplate = args => {
  const [value, setValue] = useState(args.value);
  return (
    <Select
      {...args}
      onChange={event => setValue(event.target.value)}
      value={value}
    />
  );
};

export const Standard = InteractiveTemplate.bind({});

export const Disabled = InteractiveTemplate.bind({});
Disabled.args = { disabled: true };

export const HelperText = InteractiveTemplate.bind({});
HelperText.args = { formHelperText: "Helper text about how to use the form" };

export const AutoWidth = InteractiveTemplate.bind({});
AutoWidth.args = { autoWidth: false };

export const LongLabels = InteractiveTemplate.bind({});
LongLabels.args = { formLabel: wallOfText, formHelperText: wallOfText };

export const LongOptions = InteractiveTemplate.bind({});
LongOptions.args = {
  value: wallOfText,
  options: [wallOfText, `Other ${wallOfText}`]
};
