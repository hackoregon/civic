import React from "react";

import { Button } from "./Button";

export default {
  title: "Component Lib/Basic Inputs/Button",
  parameters: { component: Button, componentSubtitle: "Deprecated" },
  args: { children: "Hello" },
  argTypes: {
    accentColor: { control: "color" },
    bkgndColor: { control: "color" },
    transition: {
      control: {
        type: "inline-radio",
        options: [
          "all .1s ease-in-out",
          "all .2s ease-in-out",
          "all .6s ease-in-out"
        ]
      }
    }
  }
};

export const Standard = args => <Button {...args} />;

export const Custom = args => <Button {...args} />;

Custom.args = {
  accentColor: "#DC4556",
  bkgndColor: "#FFFFFF",
  transition: "all .2s ease-in-out"
};
