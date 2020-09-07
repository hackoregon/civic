import React, { useState } from "react";

import { Checkbox } from "./Checkbox";

export default {
  title: "Component Lib/Basic Inputs/Checkbox",
  parameters: {
    component: Checkbox,
    componentSubtitle: "A Checkbox"
  }
};

const Template = args => <Checkbox {...args} />;

const StatefulTemplate = args => {
  const [value, setValue] = useState(false);
  return (
    <Checkbox
      {...args}
      onChange={event => {
        setValue(event.target.checked);
      }}
      value={value}
    />
  );
};

export const Standard = StatefulTemplate.bind({});
Standard.argTypes = {
  value: { control: { disable: true } }
};

export const Unchecked = Template.bind({});

export const Checked = Template.bind({});
Checked.args = { value: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const DisabledChecked = Template.bind({});
DisabledChecked.args = { disabled: true, value: true };

export const LabelTop = StatefulTemplate.bind({});
LabelTop.args = { labelPlacement: "top" };
LabelTop.argTypes = { ...Standard.argTypes };

export const LabelBottom = StatefulTemplate.bind({});
LabelBottom.args = { labelPlacement: "bottom" };
LabelBottom.argTypes = { ...Standard.argTypes };

export const LabelStart = StatefulTemplate.bind({});
LabelStart.args = { labelPlacement: "start" };
LabelStart.argTypes = { ...Standard.argTypes };

export const LabelLong = StatefulTemplate.bind({});
LabelLong.args = {
  label:
    "This is a really long label for a checkbox. Like, it's a really long label for a checkbox. A long label for a checkbox. This is a really long label for a checkbox. Like, it's a really long label for a checkbox. A long label for a checkbox."
};
LabelLong.argTypes = { ...Standard.argTypes };
