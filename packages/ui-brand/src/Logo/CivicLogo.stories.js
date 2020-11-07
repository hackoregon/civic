import React from "react";
import { Logo } from "./Logo";

export default {
  title: "Design/Brand/Logos",
  parameters: {
    component: Logo,
    componentSubtitle: "Civic Logos"
  }
};

const Template = args => <Logo {...args} />;

export const Standard = Template.bind({});
Standard.parameters = {
  docs: { storyDescription: "Standard go-to Logo. Animates on initial load." }
};
export const SquareLogo = Template.bind({});
SquareLogo.args = { type: "squareLogo" };
SquareLogo.parameters = {
  docs: {
    storyDescription:
      "Use only when standard “CIVIC” logo has already been used or in some primary brand content where “CIVIC” is already understood by the audience."
  }
};
export const StandardLogo = Template.bind({});
StandardLogo.args = { type: "standardLogo" };
StandardLogo.parameters = {
  docs: {
    storyDescription:
      "Standard go-to Logo. Use on light solid-color backgrounds. Does not animate."
  }
};
export const StandardLogoInverted = Template.bind({});
StandardLogoInverted.args = { type: "standardLogoInverted" };
StandardLogoInverted.parameters = {
  backgrounds: { default: "dark" },
  docs: {
    storyDescription:
      "Standard go-to Logo. Use on dark solid-color backgrounds. Does not animate."
  }
};
export const SquareLogoInverted = Template.bind({});
SquareLogoInverted.args = { type: "squareLogoInverted" };
SquareLogoInverted.parameters = {
  backgrounds: { default: "dark" },
  docs: {
    storyDescription:
      "Use on a dark, solid-color background. Use only when standard “CIVIC” logo has already been used or in some primary brand content where “CIVIC” is already understood by the audience."
  }
};
export const SandboxLogoInverted = Template.bind({});
SandboxLogoInverted.args = { type: "sandboxLogoInverted" };
SandboxLogoInverted.parameters = {
  backgrounds: { default: "dark" },
  docs: { storyDescription: "Use on a dark, solid-color background." }
};
export const HackOregon = Template.bind({});
HackOregon.args = { type: "hackOregon" };
HackOregon.parameters = {
  docs: { storyDescription: "Used for Hack Oregon." }
};
export const MasterBuilders = Template.bind({});
MasterBuilders.args = { type: "masterBuilders" };
MasterBuilders.parameters = {
  docs: { storyDescription: "Used for CIVIC Master Builders program." }
};
