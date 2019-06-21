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

Simply pass `stacked` as a prop to the `HorizontalBarChart` component. The data should be formatted as an array of arrays of objects. The colors are sourced from the `CivicVictoryTheme.civic.group.colorScale` and are assigned by the arrays index in the larger array.
