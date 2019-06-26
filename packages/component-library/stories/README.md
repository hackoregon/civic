# CIVIC Design System Story Pattern

Storybook is used to document [CIVIC's Design System](https://hackoregon.github.io/civic/). Each component in the library has a story. The Knobs addon is used to allow the props values to be changed while working with that component.

As you read through this document, refer to these stories to see the design pattern in use:

- [Horizontal Bar Chart](https://hackoregon.github.io/civic/?path=/story/component-lib-charts-horizontal-bar-chart--standard)
- [Line Chart](https://hackoregon.github.io/civic/?path=/story/component-lib-charts-line-chart--standard)
- [Scatterplot](https://hackoregon.github.io/civic/?path=/story/component-lib-charts-scatterplot--standard)
- [Scatterplot Map](https://hackoregon.github.io/civic/?path=/story/component-lib-maps-scatterplot-map--standard)

## Stories

There are three types of stories:

- Standard
- Custom
- Example(s)

### Standard Story

The Standard story is the default configuration of the component. For consistency, this is the configuration that is used unless it doesn't meet the needs of the project.

### Custom Story

The Custom story provides knobs for all the props that are available for this component. This gives you the ability to design any possible configuration of the component.

### Example Story(s)

If there is a configuration of the component that has been used in a project, and may be useful again, create an example story.

## Knobs EXPLAIN KNOBS!!

There is a Knob for each prop in that story. These let the user design the component for their particular use.

Story knobs are provided for each prop that is modified, for example Title.

### Organize knobs into tabs

Choose tab labels that are consistent with other stories; create a new one only if needed. Current knob tabs:

- Labels
- Data
- Marker
- Custom (for the Custom story; knobs/props in addition to those in the Standard story)

### Knob labels

Use sentence case for labels. Choose knob labels that are consistent with other stories; create a new one only if needed. Some labels:

- Title
- Subtitle
- X-axis label
- X-axis value format
- Y-axis label
- Y-axis value format
- Data key
- Data values
- Data

## Story Development Code !FINISH!

When you select "Story" in the Addon panel, the code for the current story is shown and highlighted. The goal is to include all the values and props for that story in the highlighted code.

Use realistic data. Data in the story is often from a past project.

## Notes

A Notes file is written for each story. It describes the story and the knobs/props. Use markdown format.

Notes files are in the stories folder. The notes files are named by the componentName followed by .story.md.
Examples:

- [horizontalBarChart.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-charts-horizontal-bar-chart--standard)
- [lineChart.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-charts-line-chart--standard)
- [scatterplot.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-charts-scatterplot--standard)
- [ScatterPlotMap.notes.md](https://hackoregon.github.io/civic/?path=/info/component-lib-maps-scatterplot-map--standard)
