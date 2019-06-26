# CIVIC Design System Story Pattern

Storybook is used to document [CIVIC's Design System](https://hackoregon.github.io/civic/). Each component in the library has a story.

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

### Custom Story

The Custom story provides knobs for all the props that are available for this component. This gives you the ability to design any possible configuration of the component.

### Example Story(s)

If there is a configuration of the component that has been used in a project, and may be useful again, create an example story.

## Knobs

The Knobs addon lets you set and change the props values of that component. Knobs are provided for each prop that can be modified in a story. See the example stories above.

This helps during both development and design; the developer can test the props for results and the designer can configure the component for a particular use.

Knobs references:

- [Storybook's stories for Knobs](https://storybooks-official.netlify.com/?path=/story/addons-knobs-withknobs--tweaks-static-values)
- [Knobs Github repository](https://github.com/storybookjs/storybook/tree/master/addons/knobs)

### Organize knobs into tabs

Choose tab labels that are consistent with other stories; create a new one only if needed. Current knob tabs:

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

## Story Development Code

When you select "Story" in the Addon panel, the code for the current story (inside the .add function) is shown and highlighted. Including all the values and props for that story inside the .add function, and highlighted, makes it easier for the developer to use that component.

Use realistic data. Data in the story is often from a past project. Use a subset of that data if there is so much that it overwhelms the usability of the story.

## Notes

A Notes file is written for each story. It describes the story and the knobs/props for that story. Use markdown format.

Notes files are in the stories folder. The notes files are named by the componentName followed by .story.md.
Examples:

- [horizontalBarChart.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-charts-horizontal-bar-chart--standard)
- [lineChart.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-charts-line-chart--standard)
- [scatterplot.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-charts-scatterplot--standard)
- [ScatterPlotMap.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-maps-scatterplot-map--standard)
