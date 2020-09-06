import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import { Placeholder } from "../src";

const sampleIssue = 56;

export default () =>
  storiesOf("Component Lib/Common UI/Placeholder Story", module)
    .addDecorator(checkA11y)
    .addDecorator(withKnobs)
    .add("Default", () => <Placeholder />)
    .add("With an issue", () => {
      const issue = number("Issue", sampleIssue);

      return <Placeholder issue={issue} />;
    })
    .add("With a custom message", () => {
      return (
        <Placeholder>
          <h1>Why is this still here?</h1>
          <p>Shouldn&apos;t someone have done something by now?</p>
        </Placeholder>
      );
    });
