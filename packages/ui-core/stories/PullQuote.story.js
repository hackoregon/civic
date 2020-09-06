import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";

import { PullQuote } from "../src";

const title = "Simple usage";

const quoteText =
  "Hack Oregon is fun. A super super super super super long quote";
const quoteAttribution = "Susannah";

const demoCode = () => (
  <PullQuote quoteText={quoteText} quoteAttribution={quoteAttribution} />
);

const altDemo = () => <PullQuote quoteText={quoteText} />;

const urlDemo = () => (
  <PullQuote quoteText={quoteText} url="https://www.hackoregon.org" />
);

const altTitle = "Without attribution";
const urlTitle = "With custom URL";

export default () =>
  storiesOf("Component Lib/Common UI/Pull Quote", module)
    .add(title, demoCode)
    .add(altTitle, altDemo)
    .add(urlTitle, urlDemo);
