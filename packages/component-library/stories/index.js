import React from 'react';
import { storiesOf, linkTo } from '@storybook/react'; // eslint-disable-line
import { checkA11y } from '@storybook/addon-a11y';
import buttonStory from './Button.story';
import civicStorycardStory from './CivicStoryCard.story';
import pageLayoutStory from './PageLayout.story';
import pieStory from './PieChart.story';
import ScatterplotStory from './Scatterplot.story';
import horizontalBarChartStory from './HorizontalBarChart.story';
import BarChartStory from './BarChart.story';
import lineChartStory from './LineChart.story';
import placeholderStory from './Placeholder.story';
import dropdownStory from './DropdownMenu.story';
import headerStory from './Header.story';
import dataTable from './DataTable.story';
import baseMapStory from './BaseMap.story';
import mapOverlayStory from './MapOverlay.story';
import hexOverlayStory from './HexOverlay.story';
import scatterPlotMapStory from './ScatterPlotMap.story';
import pullQuoteStory from './PullQuote.story';
import screenGridMapStory from './ScreenGridMap.story';
import pathMapStory from './PathMap.story';
import iconMapStory from './IconMap.story';
import boundaryMapStory from './BoundaryMap.story';
import civicSandboxMapStory from './CivicSandboxMap.story';
import gradientScaleStory from './GradientScale.story';
import sandboxStory from './Sandbox.story';
import packageSelectorBox from './PackageSelectorBox.story';
import civicSandboxDashboardStory from './CivicSandboxDashboard.story';
import stackedAreaChart from './StackedAreaChart.story';
import pdfStory from './PDF.story';
import heatMapStory from './HeatMap.story';
import civicCardStackStory from './CivicCardStack.story';
import sliderStory from './Slider.story';
import UIComponentsStyle from './UIComponentsStyle'; 
import ChartsStyle from './ChartsStyle';
import MapsStyle from './MapsStyle';
import CivicPlatformStyle from './CivicPlatformStyle';
import AccessibilityGuidelinesStyle from './AccessibilityGuidelinesStyle';
import CardsStyle from './CardsStyle';
import DataVisualizationStyle from './DataVisualizationStyle';
import MotionStyle from './MotionStyle.js';
import NavigationStyle from './NavigationStyle.js';
import ResponsiveDesignStyle from './ResponsiveDesignStyle.js';
import TerminologyStyle from './TerminologyStyle.js';
import IconographyStyle from './IconographyStyle';
import LogosStyle from './LogosStyle';
import ColorThemeStyle from './ColorThemeStyle';
//import TypographyStyle from '/TypographyStyle';
import TypographyStyleCommonSample from './TypographyStyleCommonSample';
import TypographyStyleQuickUsage from './TypographyStyleQuickUsage';
import TypographyStyleHeadings from './TypographyStyleHeadings';
import TypographyStyleParagraphs from './TypographyStyleParagraphs';
import TheBrandStyle from './TheBrandStyle';
import ThePlatformStyle from './ThePlatformStyle';
import Introduction from './Introduction';

//Legacy components used in 2017 package. Not supported for ongoing development.
//import storycardStory from './StoryCard.story';
//import storyLinkStory from './StoryLink.story';
//import storyFooterStory from './StoryFooter.story';
//import editableStory from './Editable.story';
//import sankeyStory from './Sankey.story';
//import landingPage from './LandingPage.story';

import '../assets/global.styles.css';

// Welcome to Storybook
storiesOf('Welcome', module)
  .addDecorator(checkA11y)
  .add('Introduction', () => (
    <Introduction />
  ))
  .add('The CIVIC Brand', () => (
    <TheBrandStyle />
  ))
  .add('The CIVIC Platform', () => (
    <ThePlatformStyle showApp={linkTo('Button')} />
  ));

// Branding
storiesOf('Branding', module)
  .addDecorator(checkA11y)
  .add('Logos', () => (
    <LogosStyle />
  ))
  .add('Color Theme', () => (
    <ColorThemeStyle />
  ))
  .add('Typography', () => (
    <div>
      <TypographyStyleQuickUsage />
      <TypographyStyleCommonSample />
      <TypographyStyleHeadings />
      <TypographyStyleParagraphs />
    </div>
  ));

  // UX Style Guide
storiesOf('UX Style Guide', module)
  .addDecorator(checkA11y)
  .add('Accessibility', () => (
    <AccessibilityGuidelinesStyle />
  ))
  .add('Cards', () => (
    <CardsStyle />
  ))
  .add('Data Visualization', () => (
    <DataVisualizationStyle />
  ))
  .add('Iconography', () => (
    <IconographyStyle />
  ))
  .add('Motion', () => (
    <MotionStyle />
  ))
  .add('Navigation', () => (
    <NavigationStyle />
  ))
  .add('Responsive Design', () => (
    <ResponsiveDesignStyle />
  ))
  .add('Terminology', () => (
    <TerminologyStyle />
  ));

// common UI components
storiesOf('UI Components', module)
  .addDecorator(checkA11y)
  .add('UI Components Style Guide', () => (
    <UIComponentsStyle />
  ));
buttonStory();
dropdownStory();
sliderStory();

// charts
storiesOf('Charts', module)
  .addDecorator(checkA11y)
  .add('Charts Style Guide', () => (
    <ChartsStyle />
  ));
BarChartStory();
dataTable();
gradientScaleStory();
horizontalBarChartStory();
lineChartStory();
pieStory();
ScatterplotStory();
stackedAreaChart();

// maps
storiesOf('Maps', module)
  .addDecorator(checkA11y)
  .add('Maps Style Guide', () => (
    <MapsStyle />
  ));
baseMapStory();
boundaryMapStory();
civicSandboxMapStory();
heatMapStory();
hexOverlayStory();
iconMapStory();
mapOverlayStory();
pathMapStory();
scatterPlotMapStory();
screenGridMapStory();

// Civic platform components and page layout
storiesOf('CIVIC Platform Components', module)
  .addDecorator(checkA11y)
  .add('Platform Components Style Guide', () => (
    <CivicPlatformStyle />
  ));
civicCardStackStory();
civicSandboxDashboardStory();
civicStorycardStory();
headerStory();
packageSelectorBox();
pageLayoutStory();
pdfStory();
placeholderStory();
pullQuoteStory();
sandboxStory();

//Legacy components used in 2017 package. Not supported for ongoing development.
//editableStory();
//landingPage();
//storyLinkStory();
//storyFooterStory();
//storycardStory();
//sankeyStory();
