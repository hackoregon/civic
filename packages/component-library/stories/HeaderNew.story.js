import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { HeaderNew as Header } from "../src";
import notes from "./headerNew.notes.md";

export default () =>
  storiesOf("Component Lib/CIVIC Platform/HeaderNew", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .addDecorator(story => story())
    .add(
      "Standard",
      () => {
        return <Header />;
      },
      { notes }
    );
