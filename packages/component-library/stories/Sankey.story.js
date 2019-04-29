import React from "react";
import { take } from "ramda";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { Sankey } from "../src";

const displayName = Sankey.displayName || "Sankey";
const title = "Simple usage";

const data = require("./btc-data.json");

const transactionslinks = take(500, data.links.transactions);
const spendingLinks = take(500, data.links.spending);

const demoCode = () => (
  <div>
    <Sankey
      width={375}
      height={300}
      nodes={data.nodes}
      links={transactionslinks}
    />
    <Sankey width={375} height={300} nodes={data.nodes} links={spendingLinks} />
  </div>
);

// const propDocs = { inline: true, propTables: [Sankey] };

export default () =>
  storiesOf(displayName, module)
    .addDecorator(checkA11y)
    .add(title, demoCode);
