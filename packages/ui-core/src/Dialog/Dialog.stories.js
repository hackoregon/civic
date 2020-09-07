import React, { useState } from "react";

import { Dialog } from "./Dialog";

export default {
  title: "Component Lib/Basic Inputs/Dialog",
  parameters: {
    component: Dialog,
    componentSubtitle: "A modal dialog"
  },
  args: {
    title: "Dialog Title",
    open: false
  }
};

const Template = args => (
  <Dialog {...args}>
    <img src="https://cataas.com/cat" alt="Random cat" />
  </Dialog>
);

const StatefulTemplate = args => {
  const [open, setOpen] = useState(true);
  return (
    <Dialog
      {...args}
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <img src="https://cataas.com/cat" alt="Random cat" />
    </Dialog>
  );
};

export const Controls = Template.bind({});

export const Open = StatefulTemplate.bind({});
Open.argTypes = { open: { control: { disabled: true } } };
Open.parameters = { controls: { disabled: true } };
