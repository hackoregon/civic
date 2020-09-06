/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
import AccessibilityGuidelinesStyle from "./styleGuideStories/AccessibilityGuidelinesStyle.story";
import CardsStyle from "./styleGuideStories/CardsStyle.story";
import DataVisualizationStyle from "./styleGuideStories/DataVisualizationStyle.story";
import FormsStyle from "./styleGuideStories/FormsStyle.story";
import IconographyStyle from "./styleGuideStories/IconographyStyle.story";
import Introduction from "./styleGuideStories/Introduction.story";
import MotionStyle from "./styleGuideStories/MotionStyle.story";
import NavigationStyle from "./styleGuideStories/NavigationStyle.story";
import ResponsiveDesignStyle from "./styleGuideStories/ResponsiveDesignStyle.story";
import TerminologyStyle from "./styleGuideStories/TerminologyStyle.story";
import TheBrandStyle from "./styleGuideStories/TheBrandStyle.story";
import ThePlatformStyle from "./styleGuideStories/ThePlatformStyle.story";

storiesOf("Welcome/About Us", module)
  .addParameters({ options: { showPanel: false } })
  .add("Introduction", () => <Introduction />)
  .add("The CIVIC Brand", () => <TheBrandStyle />)
  .add("The CIVIC Platform", () => <ThePlatformStyle />);

// UX Style Guide
storiesOf("Design/UX Style Guide", module)
  .addParameters({ options: { showPanel: false } })
  .add("Accessibility", () => <AccessibilityGuidelinesStyle />)
  .add("Story Cards", () => <CardsStyle />)
  .add("Data Visualization", () => <DataVisualizationStyle />)
  .add("Forms", () => <FormsStyle />)
  .add("Iconography", () => <IconographyStyle />)
  .add("Motion", () => <MotionStyle />)
  .add("Navigation", () => <NavigationStyle />)
  .add("Responsive Design", () => <ResponsiveDesignStyle />)
  .add("Terminology", () => <TerminologyStyle />);
// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator story injection
