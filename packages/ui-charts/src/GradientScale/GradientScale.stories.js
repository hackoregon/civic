import React from "react";

import { GradientScale } from "./GradientScale";

export default {
  title: "Component Lib/Charts/Gradient Scale",
  parameters: {
    component: GradientScale,
    componentSubtitle: "A scale to to graphically display on a gradient"
  },
  args: {
    domain: [100, 600],
    primary: 200
  },
  argsTypes: {
    domain: { control: "array" }
  }
};

const Template = args => <GradientScale {...args} />;

export const Standard = Template.bind({});
export const WithSecondaryValues = Template.bind({});
WithSecondaryValues.args = { secondary: [150, 400] };
export const WithManySecondaryValues = Template.bind({});
WithManySecondaryValues.args = {
  secondary: [150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400]
};
export const ColorScaleThermal = Template.bind({});
ColorScaleThermal.args = {
  colorScale: "thermal"
};
export const ColorScaleSpace = Template.bind({});
ColorScaleSpace.args = {
  colorScale: "space"
};
export const ColorScaleOcean = Template.bind({});
ColorScaleOcean.args = {
  colorScale: "ocean"
};
export const ColorScalePlanet = Template.bind({});
ColorScalePlanet.args = {
  colorScale: "planet"
};
export const ColorScaleEarth = Template.bind({});
ColorScaleEarth.args = {
  colorScale: "earth"
};
