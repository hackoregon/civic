import React, { useState } from "react";

import { RadioButtonGroup } from "./RadioButtonGroup";

export default {
  title: "Component Lib/Basic Inputs/RadioButtonGroup",
  parameters: {
    component: RadioButtonGroup,
    componentSubtitle: "Radio Button Group"
  },
  argTypes: {
    value: { control: { disable: true } }
  }
};

const InteractiveTemplate = args => {
  const [value, setValue] = useState("Label 1");
  return (
    <RadioButtonGroup
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

export const LabelTop = InteractiveTemplate.bind({});
LabelTop.args = { labelPlacement: "top" };

export const LabelBottom = InteractiveTemplate.bind({});
LabelBottom.args = { labelPlacement: "bottom" };

export const LabelStart = InteractiveTemplate.bind({});
LabelStart.args = { labelPlacement: "start" };

export const Row = InteractiveTemplate.bind({});
Row.args = { row: true };

export const RowLabelTop = InteractiveTemplate.bind({});
RowLabelTop.args = { ...Row.args, ...LabelTop.args };

export const RowLabelBottom = InteractiveTemplate.bind({});
RowLabelBottom.args = { ...Row.args, ...LabelBottom.args };

export const RowLabelStart = InteractiveTemplate.bind({});
RowLabelStart.args = { ...Row.args, ...LabelStart.args };
