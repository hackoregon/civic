/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
import dialogStory from "./Dialog.story"; // TODO: Move this to the appropriate location
import buttonNewStory from "./ButtonNew.story";
import badgeStory from "./Badge.story";
import BarChartStory from "./BarChart.story";
import baseMapStory from "./BaseMap.story";
import boundaryMapStory from "./BoundaryMap.story";
import buttonStory from "./Button.story";
import checkboxStory from "./Checkbox.story";
import collapsableStory from "./Collapsable.story";
import civicCardStory from "./CivicCard.story";
import civicCardStackStory from "./CivicCardStack.story";
import civicSandboxDashboardStory from "./CivicSandboxDashboard.story";
import multiLayerMapStory from "./MultiLayerMap.story";
import comparisonMapStory from "./ComparisonMap.story";
import civicStorycardStory from "./CivicStoryCard.story";
import dataTable from "./DataTable.story";
import gradientScaleStory from "./GradientScale.story";
import headerStory from "./Header.story";
import headerNewStory from "./HeaderNew.story";
import footerNewStory from "./FooterNew.story";
import heatMapStory from "./HeatMap.story";
import horizontalBarChartStory from "./HorizontalBarChart.story";
import iconMapStory from "./IconMap.story";
import lineChartStory from "./LineChart.story";
import mapOverlayStory from "./MapOverlay.story";
import notebookPreviewStory from "./NotebookPreview.story";
import packageSelectorBox from "./PackageSelectorBox.story";
import pageLayoutStory from "./PageLayout.story";
import pathMapStory from "./PathMap.story";
import pdfStory from "./PDF.story";
import pieStory from "./PieChart.story";
import placeholderStory from "./Placeholder.story";
import pullQuoteStory from "./PullQuote.story";
import radioButtonGroupStory from "./RadioButtonGroup.story";
import sandboxStory from "./Sandbox.story";
import scatterPlotMapStory from "./ScatterPlotMap.story";
import ScatterplotStory from "./Scatterplot.story";
import screenGridMapStory from "./ScreenGridMap.story";
import selectStory from "./Select.story";
import sliderStory from "./Slider.story";
import stackedAreaChart from "./StackedAreaChart.story";
import chipcomponentstory from "./ChipComponent.story";
import cardListStory from "./CardList.story";
import exploreRelatedStory from "./ExploreRelated.story";
import vectorTilesMapStory from "./VectorTilesMap.story";

import AccessibilityGuidelinesStyle from "./styleGuideStories/AccessibilityGuidelinesStyle.story";
import CardsStyle from "./styleGuideStories/CardsStyle.story";
import ChartsStyle from "./styleGuideStories/ChartsStyle.story";
import CivicPlatformStyle from "./styleGuideStories/CivicPlatformStyle.story";
import ColorThemeStyle from "./styleGuideStories/ColorThemeStyle.story";
import DataVisualizationStyle from "./styleGuideStories/DataVisualizationStyle.story";
import FormsStyle from "./styleGuideStories/FormsStyle.story";
import IconographyStyle from "./styleGuideStories/IconographyStyle.story";
import Introduction from "./styleGuideStories/Introduction.story";
import LogosStyle from "./styleGuideStories/LogosStyle.story";
import MapsStyle from "./styleGuideStories/MapsStyle.story";
import MotionStyle from "./styleGuideStories/MotionStyle.story";
import NavigationStyle from "./styleGuideStories/NavigationStyle.story";
import ResponsiveDesignStyle from "./styleGuideStories/ResponsiveDesignStyle.story";
import TerminologyStyle from "./styleGuideStories/TerminologyStyle.story";
import TheBrandStyle from "./styleGuideStories/TheBrandStyle.story";
import ThePlatformStyle from "./styleGuideStories/ThePlatformStyle.story";
import TypographyStyleCommonSample from "./styleGuideStories/TypographyStyleCommonSample.story";
import TypographyStyleQuickUsage from "./styleGuideStories/TypographyStyleQuickUsage.story";
import TypographyStyleHeadings from "./styleGuideStories/TypographyStyleHeadings.story";
import TypographyStyleParagraphs from "./styleGuideStories/TypographyStyleParagraphs.story";
import UIComponentsStyle from "./styleGuideStories/UIComponentsStyle.story";
// Legacy components used in 2017 package. Not supported for ongoing development.
// import editableStory from './Editable.story';
// import landingPage from './LandingPage.story';
// import dropdownStory from "./DropdownMenu.story";

storiesOf("Welcome|About Us", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y)
  .add("Introduction", () => <Introduction />)
  .add("The CIVIC Brand", () => <TheBrandStyle />)
  .add("The CIVIC Platform", () => <ThePlatformStyle />);

// Branding
storiesOf("Design|Brand", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y)
  .add("Logos", () => <LogosStyle />)
  .add("Color Theme", () => <ColorThemeStyle />)
  .add("Typography", () => (
    <>
      <TypographyStyleQuickUsage />
      <TypographyStyleCommonSample />
      <TypographyStyleHeadings />
      <TypographyStyleParagraphs />
    </>
  ));

// UX Style Guide
storiesOf("Design|UX Style Guide", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y)
  .add("Accessibility", () => <AccessibilityGuidelinesStyle />)
  .add("Story Cards", () => <CardsStyle />)
  .add("Data Visualization", () => <DataVisualizationStyle />)
  .add("Forms", () => <FormsStyle />)
  .add("Iconography", () => <IconographyStyle />)
  .add("Motion", () => <MotionStyle />)
  .add("Navigation", () => <NavigationStyle />)
  .add("Responsive Design", () => <ResponsiveDesignStyle />)
  .add("Terminology", () => <TerminologyStyle />);

// Basic UI components
storiesOf("Component Lib|Basic Inputs", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y)
  .add("UI Components Style Guide", () => <UIComponentsStyle />);
buttonStory();
buttonNewStory();
checkboxStory();
radioButtonGroupStory();
selectStory();
sliderStory();
notebookPreviewStory(); // TODO: Move this to the appropriate location
dialogStory(); // TODO: Move this to the appropriate location
// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator story injection

// charts
storiesOf("Component Lib|Charts", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y)
  .add("Charts Style Guide", () => <ChartsStyle />);
BarChartStory();
dataTable();
gradientScaleStory();
horizontalBarChartStory();
lineChartStory();
pieStory();
ScatterplotStory();
stackedAreaChart();

// maps
storiesOf("Component Lib|Maps", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y)
  .add("Maps Style Guide", () => <MapsStyle />);
baseMapStory();
boundaryMapStory();
heatMapStory();
iconMapStory();
mapOverlayStory();
pathMapStory();
scatterPlotMapStory();
screenGridMapStory();
multiLayerMapStory();
comparisonMapStory();
vectorTilesMapStory();

// Civic story cards
storiesOf("Component Lib|Story Cards", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y);
civicCardStory();

// Civic platform components and page layout
storiesOf("Component Lib|CIVIC Platform", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y)
  .add("Platform Components Style Guide", () => <CivicPlatformStyle />);
civicCardStackStory();
badgeStory();
civicSandboxDashboardStory();
civicStorycardStory();
collapsableStory();
headerNewStory();
headerStory();
footerNewStory();
packageSelectorBox();
pageLayoutStory();
pdfStory();
exploreRelatedStory();
placeholderStory();
pullQuoteStory();
sandboxStory();
chipcomponentstory();
cardListStory();

// Legacy components used in 2017 package. Not supported for ongoing development.
// editableStory();
// sankeyStory();
// dropdownStory();
