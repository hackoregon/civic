import React from "react";
import { storiesOf } from "@storybook/react";
import { wallOfText } from "./shared";
import notes from "./button.notes.md";
import { Collapsable } from "../src";

export default () =>
  storiesOf("Component Lib|Civic Platform/Collapsable", module)
    .add(
      "Standard",
      () => {
        return (
          <>
            <p>{wallOfText}</p>
            <Collapsable>
              <Collapsable.Section hidden>
                <p>{wallOfText}</p>
              </Collapsable.Section>
            </Collapsable>
          </>
        );
      },
      { notes }
    )
    .add(
      "Custom",
      () => {
        return (
          <Collapsable>
            <Collapsable.Section>
              <p>{wallOfText}</p>
            </Collapsable.Section>
            <Collapsable.Section hidden>
              <p>{wallOfText}</p>
            </Collapsable.Section>
          </Collapsable>
        );
      },
      { notes }
    )
    .add(
      "Example: Non-text label",
      () => {
        return (
          <Collapsable>
            <Collapsable.Section>{wallOfText}</Collapsable.Section>
            <Collapsable.Section hidden>{wallOfText}</Collapsable.Section>
          </Collapsable>
        );
      },
      { notes }
    );
