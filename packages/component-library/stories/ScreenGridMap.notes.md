# ScreenGrid Map Component

## Standard

The Standard story shows the standard usage of the ScreenGrid Map Component for the CIVIC platform. ScreenGrid Map includes the standard styling.

These properties can be set in the standard story:

- `colorRange`
- `cellSizePixels`
- `opacity`
- `data`
- `getPosition`

## Custom

The Custom story shows all the possible properties that can be passed to the ScatterPlot Map Component for customization.

- `data` : expects an array of objects.
- `getPosition` : expects a function that returns the coordinates of each object in data array.
- `opacity` : expects a number between 0 and 1.
- `autoHighlight` : expects a boolean value.
- `highlightColor` : expects an array in the `[r, g, b, [a]]` format.
- `onLayerClick` : expects a function.

## Example: With Tooltip

The Example: With Tooltip story shows an example of using the MapTooltip component with the ScatterPlot Map component.

## Example: Data Driven Styling

The Example: Data Driven Styling story shows an example of styling the fill color based on a data attribute. We perform a ternary operation to check if a property is over a certain value and style based on that operation.

We also style the `getRadius` based on a numerical property of each object to create graduated circles.
