import React from "react";
import { wallOfText } from "@hackoregon/utils";

import { NotebookPreview } from "./NotebookPreview";

export default {
  title: "Component Lib/CIVIC Platform/NotebookPreview",
  parameters: {
    component: NotebookPreview,
    componentSubtitle: "A nice looking way to link to data sources "
  }
};

const Template = args => <NotebookPreview {...args} />;

export const Standard = Template.bind({});
export const LongMessage = Template.bind({});
LongMessage.args = { message: wallOfText };
