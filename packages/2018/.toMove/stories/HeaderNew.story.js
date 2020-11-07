import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { HeaderNew as Header } from "../src/components";
import notes from "./headerNew.notes.md";

export default () =>
  storiesOf("Projects/civicplatform•org/HeaderNew", module)
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
