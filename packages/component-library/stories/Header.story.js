import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { Header } from "../src";
import Hero from "../src/Hero/Hero";

const title = "Simple usage";

const demoCode = () => <Header title="Civic" />;

const altTitle = "With Hero section";

const altDemo = () => (
  <div>
    <Header title="Civic" />
    <Hero />
  </div>
);

const overlayDemo = () => (
  <div>
    <Header title="Civic" overlay />
    <div
      style={{
        background: "#7CD",
        height: "50vh",
        display: "flex",
        alignItems: "center"
      }}
    >
      <h1 style={{ padding: "3em" }}>Impressive words here</h1>
    </div>
  </div>
);

// const propDocs = { inline: true, propTables: [Header] };

export default () =>
  storiesOf("Component Lib/CIVIC Platform/Header", module)
    .addDecorator(checkA11y)
    .add(title, demoCode)
    .add(altTitle, altDemo)
    .add("In overlay mode", overlayDemo);
