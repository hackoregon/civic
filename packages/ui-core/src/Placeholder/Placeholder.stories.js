import React from "react";
import { WallOfRichText } from "@hackoregon/utils";

import { Placeholder } from "./Placeholder";

export default {
  title: "Component Lib/CIVIC Platform/Placeholder",
  parameters: {
    component: Placeholder,
    componentSubtitle: "Something to bide the time"
  },
  argTypes: { children: { control: { disabled: true } } }
};

const Template = args => <Placeholder {...args} />;

export const Standard = Template.bind({});
export const WithGithubIssue = Template.bind({});
WithGithubIssue.args = { issue: 1000 };
export const CustomText = Template.bind({});
CustomText.args = { children: WallOfRichText() };
