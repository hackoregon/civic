/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
import cardListStory from "./CardList.story";
import civicCardStackStory from "./CivicCardStack.story";
import civicStorycardStory from "./CivicStoryCard.story";
import exploreRelatedStory from "./ExploreRelated.story";
import footerNewStory from "./FooterNew.story";
import headerNewStory from "./HeaderNew.story";
import pageLayoutStory from "./PageLayout.story";
import PDFStory from "./PDF.story";

// Civic platform components and page layout
storiesOf("Component Lib/CIVIC Platform", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y);
cardListStory();
civicCardStackStory();
civicStorycardStory();
exploreRelatedStory();
footerNewStory();
headerNewStory();
pageLayoutStory();
PDFStory();
// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator story injection
