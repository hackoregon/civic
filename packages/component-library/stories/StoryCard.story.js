/* eslint-disable no-console */
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { checkA11y } from "@storybook/addon-a11y";
import { StoryCard, Chart, ChartData, PieChart } from "../src";
import {
  getRandomValuesArray,
  colors,
  objectRandomizer,
  wallOfRichText
} from "./shared";

const labels = ["A", "B", "C", "D", "E", "F"];
const width = 300;
const height = 300;
const tdDemo = () => (
  <StoryCard title="A title goes here">
    <p className="Description">{wallOfRichText}</p>
  </StoryCard>
);
const tdvDemo = () => (
  <StoryCard title="A title goes here">
    <p className="Description">{wallOfRichText}</p>
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <PieChart
        data={getRandomValuesArray(5, objectRandomizer)}
        innerRadius={100}
        colors={colors}
        height={200}
        width={200}
      />
      <PieChart
        data={getRandomValuesArray(5, objectRandomizer)}
        innerRadius={100}
        colors={colors}
        height={200}
        width={200}
      />
    </div>
  </StoryCard>
);

export default () =>
  storiesOf("StoryCard", module)
    .addDecorator(checkA11y)
    .add(
      "Simple usage",
      // 'This is some basic usage with the StoryCard with just a title and descriptions')(
      () => (
        <StoryCard title="Some title">
          <p className="Description">some descriptions go here</p>
        </StoryCard>
      )
    )
    .add("with title & description", tdDemo)
    .add("with title, description & visualization", tdvDemo);
