import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  text,
  boolean,
  number,
  object
} from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";

export default () =>
  storiesOf("Editable UI components", module)
    .addDecorator(checkA11y)
    .addDecorator(withKnobs)
    .add("with a button", () => {
      const style = {
        backgroundColor: "#FFF",
        border: "1px solid #DDD",
        borderRadius: 2,
        outline: 0,
        fontSize: 15,
        cursor: "pointer"
      };

      return (
        <button
          type="button"
          disabled={boolean("Disabled", true)}
          style={object("Style", style)}
        >
          {text("Label", "Hello Button")}
        </button>
      );
    })
    .add("with some text", () => {
      let content = text("Content", "This is the content");
      content = content.replace(/\n/g, "<br />");

      // eslint-disable-next-line react/no-danger
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    })
    .add("as dynamic variables", () => {
      const name = text("Name", "David Daniel");
      const age = number("Age", 33);

      const content = `I am ${name} and I'm ${age} years old.`;
      return <div>{content}</div>;
    });
