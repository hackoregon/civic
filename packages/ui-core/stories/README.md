# CIVIC Design System Story Pattern

Storybook is used to document [CIVIC's Design System](https://hackoregon.github.io/civic/); each component in the library has a story. Stories are used by UX, UI, and Data Visualization users to try out the components early in the design process. They can set properties, add sample data, and determine the design they want.

Developers use Storybook when they are developing the component. Then they write the stories for that component making them easy for designers to use. When the developer wants to use the component in a project, the Story code is a good reference.

This document is for the developers to use when they write the stories for a component.

As you read through this document, refer to these stories to see the design pattern in use:

- [Horizontal Bar Chart](https://hackoregon.github.io/civic/?path=/story/component-lib-charts-horizontal-bar-chart--standard)
- [Line Chart](https://hackoregon.github.io/civic/?path=/story/component-lib-charts-line-chart--standard)
- [Scatterplot](https://hackoregon.github.io/civic/?path=/story/component-lib-charts-scatterplot--standard)
- [Scatterplot Map](https://hackoregon.github.io/civic/?path=/story/component-lib-maps-scatterplot-map--standard)

Note: To bring up the Addons Panel, select it from the dropdown list in the upper left corner of the screen, next to the CIVIC logo.

## Stories

There are three types of stories:

- Standard
- Custom
- Example(s)

### Standard Story

The Standard story is the default configuration of the component. For consistency, this is the configuration that is used unless it doesn't meet the needs of your project.

Note: If the default configuration isn't specified, begin by looking at the current stories, compare use of that component in past and current projects to find the most common use, and ask for feedback. Use a similar strategy for determining the custom and example stories.

### Custom Story

The Custom story provides knobs for all the props that are available for this component. This gives you the ability to design any possible configuration of the component.

### Example Story(s)

If there is a configuration of the component that has been used in a project, and may be useful again, create an Example story.

## Knobs

The Knobs addon lets you set data and change its values for that component. Knobs are provided for each prop that can be modified in a story. See the example stories above.

This helps during both development and design; the developer can test the props for results and the designer can configure the component for a particular use.

At this time, there are Knobs for these data types and inputs:

- text
- boolean
- number
- number bound by range
- color
- object
- array
- select
- radio buttons
- options
- files
- date
- button
- withKnobs options

Knobs references:

- [Storybook's stories for Knobs](https://storybooks-official.netlify.com/?path=/story/addons-knobs-withknobs--tweaks-static-values)
- [Knobs Github repository](https://github.com/storybookjs/storybook/tree/master/addons/knobs)

### Organize knobs into tabs

Knobs can be organized in tabs, in the Addons panel. Choose tab labels that are consistent with other stories; create a new one only if needed. Current knob tabs:

- Labels
- Design
- Data
- Marker
- Custom (for the Custom story; knobs/props that are in addition to those in the Standard story)

### Knob labels

Labels are descriptive; don't use the prop name. Use sentence case for labels. Choose knob labels that are consistent with other stories; create a new one only if needed. Some labels:

- Title
- Subtitle
- X-axis label
- X-axis value format
- Y-axis label
- Y-axis value format
- Data key
- Data values
- Data

## Utility Functions

### `getKeyNames` in packages/component-library/stories/shared.js

Some components let you set the value format for the axes. Currently those formats are defined in civicFormat.js: numeric, year, percentage, dollars, titleCase, unformatted, monthYear, numericShort, and decimalToPercent. Add a knob to allow the user to choose the format.

Components expect a function prop to provide the format, but there is no knob function type. Use `getKeyNames` to pass the item selected in the options knob as a function to the component. See [Line Chart](https://hackoregon.github.io/civic/?path=/story/component-lib-charts-line-chart--standard) story for an example. See `optionSelectX` and `optionSelectY`.

### `StatefulWrapper` in packages/component-library/src/utils/StatefulWrapper.js

- StatefulWrapper is a helper function to set up dynamic state in controlled form components, such as the slider, for Storybook stories
- Takes in an `initialState` object with any number of properties
- Returns a function as a child component and provides `get` and `set` helpers
- to update the controlled state.

See the [Slider](https://hackoregon.github.io/civic/?path=/story/component-lib-basic-inputs-slider--basic-slider) story for an example of using the `StatefulWrapper`.

## Story Development Code

When you select "Story" in the Addon panel, the code for the current story (inside the .add function) is shown and highlighted. Including all the values and props for that story inside the .add function so they are highlighted, makes it easier for the developer to use that component.

Use realistic data. Data in the story is often from a past project. Use a subset of that data if there is so much that it overwhelms the usability of the story.

## Actions

Actions display data received by the event handlers in a component when it is in Storybook. Actions aren't required in stories, but they are helpful when developing and debugging a component. For example:

`<Button onClick={action('button-click')}>Hello World!</Button>`

When the button is clicked all the data from the event is shown in the Actions tab in the Addons Panel.

Actions references:

- [Actions](https://github.com/storybookjs/storybook/tree/master/addons/actions)

## Notes

A Notes file is written for each story. It describes the story and the knobs/props for that story. Use markdown format.

Notes files are in the stories folder. The notes files are named by the componentName followed by .story.md.

Examples:

- [horizontalBarChart.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-charts-horizontal-bar-chart--standard)
- [lineChart.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-charts-line-chart--standard)
- [scatterplot.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-charts-scatterplot--standard)
- [ScatterPlotMap.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-maps-scatterplot-map--standard)
