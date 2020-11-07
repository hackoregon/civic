import React from "react";

import { Badge } from "./Badge";

export default {
  title: "Component Lib/CIVIC Platform/Badge",
  parameters: {
    component: Badge,
    componentSubtitle: "A Simple Badge"
  },
  args: { children: "Notifications" },
  argTypes: {
    color: { control: "color" },
    value: { control: "number" }
  }
};

export const Standard = args => <Badge {...args} />;

export const Zero = args => <Badge {...args} />;
Zero.args = { value: 0 };

export const Lots = args => <Badge {...args} />;
Lots.args = { value: 999 };
