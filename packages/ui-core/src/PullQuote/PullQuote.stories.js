import React from "react";
import { wallOfText } from "@hackoregon/utils";

import { PullQuote } from "./PullQuote";

export default {
  title: "Component Lib/CIVIC Platform/PullQuote",
  parameters: {
    component: PullQuote,
    componentSubtitle: "Highlight a quote, and let people Tweet it"
  },
  args: {
    quoteText: "Hack Oregon is fun. A super super super super super long quote",
    quoteAttribution: "Susannah"
  }
};

const Template = args => <PullQuote {...args} />;

export const Standard = Template.bind({});
export const NoAttribution = Template.bind({});
NoAttribution.args = { quoteAttribution: null };
export const CustomUrl = Template.bind({});
CustomUrl.args = { url: "https://www.hackoregon.org" };
export const LongQuote = Template.bind({});
LongQuote.args = { quoteText: wallOfText };
