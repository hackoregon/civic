/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import { wallOfText } from "@hackoregon/utils";
import { CivicCardStack } from "../src/components";

const Container = ({ children }) => (
  <div style={{ padding: "30px" }}>{children}</div>
);

export default () =>
  storiesOf("Projects/civicplatform•org/CIVIC Card Stack", module)
    .addDecorator(checkA11y)
    .addDecorator(withKnobs)
    .add(
      "Simple usage",
      // 'This is some basic usage with the CivicCardStack with just a title and descriptions')(
      () => {
        const cards = number("Number of cards", 3);
        return (
          <Container>
            <CivicCardStack cards={cards}>
              <p className="Description">{wallOfText}</p>
            </CivicCardStack>
          </Container>
        );
      }
    );
