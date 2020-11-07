import React from "react";

import { ButtonNew } from "./ButtonNew";

export default {
  title: "Component Lib/Basic Inputs/ButtonNew",
  parameters: {
    component: ButtonNew,
    componentSubtitle: "A Simple ButtonNew"
  },
  args: { children: "Children" }
};

export const Primary = args => <ButtonNew {...args} />;

export const PrimaryDisabled = args => <ButtonNew {...args} />;
PrimaryDisabled.args = { disabled: true };

export const Secondary = args => <ButtonNew {...args} />;
Secondary.args = { type: "secondary" };

export const SecondaryDisabled = args => <ButtonNew {...args} />;
SecondaryDisabled.args = { type: "secondary", disabled: true };
