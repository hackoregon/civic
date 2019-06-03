# LineChart Component

## Standard

The Standard story shows the standard usage of the LineChart for the CIVIC platform. LineChart includes standard styling.

These properties can be set in the Standard story:

- Title
- Subtitle
- X-axis label
- X-axis value format
- Y-axis label
- Y-axis value format
- Data key
- Data value
- Data series
- Data series labels
- Data

## Custom

The Custom story shows all possible properties that can be passed to the LineChart component for customization. Three additional properties are added to the properties listed in the Standard story.

- domain: The domain property describes the range of data the component will include. This prop is given as an object that specifies separate arrays for the dependent and independent variables. If this prop is not provided, as in the Standard story, a domain will be calculated from data, or other available information. In line charts, the x value corresponds to the independent variable, shown on the x-axis, and the dependent variable corresponds to the y value, shown on the y-axis.
- Data key label
- Data value label

The Custom story also shows the use of a custom legend, which is a separate component.

## Simple

The example Simple story shows the minimal properties needed for the LineChart.

- X-axis label
- Y-axis label
- Data

## Many Data Points

The example Many Data Points story shows how the LineChart behaves when there is a large number of data points.

- Number of data points
