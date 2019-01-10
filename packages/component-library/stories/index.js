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
import Welcome from './Welcome';
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
import landingPage from './LandingPage.story';
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

//Legacy components used in 2017 package. Not supported for ongoing development.
//import storycardStory from './StoryCard.story';
//import storyLinkStory from './StoryLink.story';
//import storyFooterStory from './StoryFooter.story';
//import editableStory from './Editable.story';
//import sankeyStory from './Sankey.story';

import '../assets/global.styles.css';

// stories can be added directly here
storiesOf('Welcome', module)
  .addDecorator(checkA11y)
  .add('To Storybook', () => (
    <Welcome showApp={linkTo('Button')} />
  ));

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

storiesOf('UI Components', module)
  .addDecorator(checkA11y)
  .add('UI Components Style Guide', () => (
    <UIComponentsStyle />
  ));

storiesOf('Charts', module)
  .addDecorator(checkA11y)
  .add('Charts Style Guide', () => (
    <ChartsStyle />
  ));

storiesOf('Maps', module)
  .addDecorator(checkA11y)
  .add('Maps Style Guide', () => (
    <MapsStyle />
  ));

storiesOf('CIVIC Platform Components', module)
  .addDecorator(checkA11y)
  .add('Platform Components Style Guide', () => (
    <CivicPlatformStyle />
  ));

// or imported as functions from files then composed in the order you invoke them
// common UI components
buttonStory();
dropdownStory();
sliderStory();

// Civic platform components and page layout
civicCardStackStory();
civicSandboxDashboardStory();
civicStorycardStory();
gradientScaleStory();
headerStory();
landingPage();
packageSelectorBox();
pageLayoutStory();
pdfStory();
pullQuoteStory();

// charts
BarChartStory();
dataTable();
horizontalBarChartStory();
lineChartStory();
pieStory();
ScatterplotStory();
stackedAreaChart();

// maps
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

// which section should this be in?
sandboxStory();

// placeholder story
placeholderStory();

//Legacy components used in 2017 package. Not supported for ongoing development.
//editableStory();
//storyLinkStory();
//storyFooterStory();
//storycardStory();
//sankeyStory();
