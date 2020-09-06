import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";

import { PDF } from "../src/components";

const title = "Simple usage";

const sampleURL =
  "https://www.oregonmetro.gov/sites/default/files/2018/04/19/Equitable-Housing-Initiative-Factsheet-Affordability-201804.pdf";

const demoCode = () => {
  const url = text("url", sampleURL);
  return <PDF url={url} />;
};

export default () =>
  storiesOf("Projects/civicplatform•org/PDF", module)
    .addDecorator(withKnobs)
    .add(title, demoCode);
