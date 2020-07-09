import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, text } from "@storybook/addon-knobs";
import { FooterNew as Footer } from "../src/components";
import notes from "./footerNew.notes.md";

export default () =>
  storiesOf("Projects|civicplatform•org/Footer New", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .addDecorator(story => story())
    .add(
      "Standard",
      () => {
        const message = text("Message");
        return <Footer message={message} />;
      },
      { notes }
    );
