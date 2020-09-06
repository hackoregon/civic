import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
import civicCardStory from "./CivicCard.story";

// Civic story cards
storiesOf("Component Lib/Story Cards", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y);
civicCardStory();
