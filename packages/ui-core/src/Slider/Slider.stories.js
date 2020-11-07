import React, { useState } from "react";

import { Slider } from "./Slider";

export default {
  title: "Component Lib/Basic Inputs/Slider",
  parameters: {
    component: Slider,
    componentSubtitle: "Slide, Slide, Slippity Slide"
  },
  args: {
    min: 0,
    max: 50
  },
  argTypes: {
    value: { control: { disable: true } },
    firstValue: { control: { disable: true } },
    secondValue: { control: { disable: true } },
    SliderComponent: { control: { disable: true } }
  }
};

const InteractiveTemplate = args => {
  const [value, setValue] = useState(10);
  return (
    <Slider {...args} onChange={newValue => setValue(newValue)} value={value} />
  );
};

const InteractiveTemplateWithTooltip = args => {
  const [value, setValue] = useState(10);
  return (
    <Slider.SliderWithTooltip
      {...args}
      onChange={newValue => setValue(newValue)}
      value={value}
    />
  );
};

const InteractiveTemplateWithRange = args => {
  const [firstValue, setFirstValue] = useState(10);
  const [secondValue, setSecondValue] = useState(20);
  return (
    <Slider.SliderWithRange
      {...args}
      onChange={(newFirstValue, newSecondValue) => {
        setFirstValue(newFirstValue);
        setSecondValue(newSecondValue);
      }}
      firstValue={firstValue}
      secondValue={secondValue}
    />
  );
};

export const WithTooltip = InteractiveTemplateWithTooltip.bind({});

export const WithRange = InteractiveTemplateWithRange.bind({});

export const Standard = InteractiveTemplate.bind({});
