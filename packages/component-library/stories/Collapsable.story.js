import React from "react";
import { storiesOf } from "@storybook/react";
import { wallOfText } from "./shared";
import notes from "./collapsable.notes.md";
import { Collapsable } from "../src";

export default () =>
  storiesOf("Component Lib/Civic Platform/Collapsable", module)
    .add(
      "Standard",
      () => {
        return (
          <>
            <p>{wallOfText}</p>
            <a href="https://www.example.com">Example link</a>
            <Collapsable description="Lorem ipsum">
              <Collapsable.Section hidden>
                <p>{wallOfText}</p>
                <a href="https://www.example.com">Example link</a>
              </Collapsable.Section>
            </Collapsable>
          </>
        );
      },
      { notes }
    )
    .add(
      "Example: Alternate Usage",
      () => {
        return (
          <Collapsable description="Lorem ipsum">
            <Collapsable.Section>
              <p>{wallOfText}</p>
              <a href="https://www.example.com">Example link</a>
            </Collapsable.Section>
            <Collapsable.Section hidden>
              <p>{wallOfText}</p>
              <a href="https://www.example.com">Example link</a>
            </Collapsable.Section>
          </Collapsable>
        );
      },
      { notes }
    );
