import React from 'react';
import { storiesOf, linkTo } from '@storybook/react'; // eslint-disable-line
import { checkA11y } from '@storybook/addon-a11y';
import buttonStory from './Button.story';
import storycardStory from './StoryCard.story';
import civicStorycardStory from './CivicStoryCard.story';
import pageLayoutStory from './PageLayout.story';
import storyLinkStory from './StoryLink.story';
import storyFooterStory from './StoryFooter.story';
import editableStory from './Editable.story';
import pieStory from './PieChart.story';
import sliderStory from './Slider.story';
import ScatterplotStory from './Scatterplot.story';
import horizontalBarChartStory from './HorizontalBarChart.story';
import BarChartStory from './BarChart.story';
import lineChartStory from './LineChart.story';
import sankeyStory from './Sankey.story';
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
import { checkA11y } from '@storybook/addon-a11y';
import '../assets/global.styles.css';

// stories can be added directly here
storiesOf('Welcome', module)
  .addDecorator(checkA11y)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')} />
  ));

// or imported as functions from files then composed in the order you invoke them
editableStory();
headerStory();
buttonStory();
storyLinkStory();
storyFooterStory();
storycardStory();
civicStorycardStory();
pageLayoutStory();
pieStory();
horizontalBarChartStory();
ScatterplotStory();
BarChartStory();
lineChartStory();
placeholderStory();
sankeyStory();
sliderStory();
dropdownStory();
baseMapStory();
scatterPlotMapStory();
dataTable();
pullQuoteStory();
screenGridMapStory();
pathMapStory();
iconMapStory();
mapOverlayStory();
hexOverlayStory();
boundaryMapStory();
civicSandboxMapStory();
