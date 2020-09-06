import { storiesOf } from "@storybook/react";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
import civicCardStory from "./CivicCard.story";

// Civic story cards
storiesOf("Component Lib/Story Cards", module).addParameters({
  options: { showPanel: false }
});
civicCardStory();
