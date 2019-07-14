# HorizontalBarChart Component

## Standard

The Standard story shows uses the standard usage of the HorizontalBarChart for the CIVIC platform. HorizontalBarChart includes standard styling.

These properties can be set in the Standard story:

- Title
- Subtitle
- X-axis label
- X-axis value format
- Y-axis label
- Sort order
- Data value
- Data label
- Data

## Custom

The Custom story shows all possible properties that can be passed to the BarChart component for customization.

- domain: The domain prop describes the range of data the component will include. This prop is given as an object that specifies separate arrays for the dependent and independent variables. If this prop is not provided, a domain will be calculated from data, or other available information. In horizontal charts, the x value corresponds to the dependent variable, shown on the x-axis, and the independent variable corresponds to the y value, shown on the y-axis.
- minimalist

## Example: Default Sort Order

## Example: Minimalist

## Example: With Negative Values

## Example: Stacked Bar Chart

The Stacked Bar Chart shows all the possible properties for the stacked option of the Horizontal Bar Chart.

The Stacked Bar Chart requires the `stacked` and `groupByValue` props. The `groupByValue` is the value that you would like to data to be grouped by. This is the value that is represented by the color of the bar, not the value of the x or y axis. This value is needed because the chart requires an array of arrays of objects, and the standard data structure for CIVIC is an array of objects.

If you would like the data to be formatted into percentages, pass the `hundredPercentData` prop.

The colors are sourced from the `CivicVictoryTheme.civic.group.colorScale` and are assigned by the arrays index in the larger array.
