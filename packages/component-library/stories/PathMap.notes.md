# Path Map Component

## Standard

The Standard story shows the standard usage of the Path Map Component for the CIVIC platform. Path Map includes the standard styling.

These properties can be set in the standard story:

- `getColor`
- `getWidth`
- `opacity`
- `data`
- `getPath`

## Custom

The Custom story shows all the possible properties that can be passed to the Path Map Component for customization.

- `data` : expects an array of objects.
- `getPath` : expects a function that returns an array of coordinates for each path. It is compatible with GeoJSON LineStrings.
- `getColor` : expects a function or an array in `[r, g, b, [a]]` format, where `a` is a number between 0 and 255. If an array is provided, the color is applied to all objects. If a function is provided, it is called on each object to set the fill color.
- `getWidth` : expects a function or a number. If a number is provided it is used as the width for all objects. If a function is provided, it is called on each object to set the width.
- `opacity` : expects a number between 0 and 1.
- `widthScale` : expects a number.
- `rounded` : expects a boolean value.
- `autoHighlight` : expects a boolean value.
- `highlightColor` : expects an array in the `[r, g, b, [a]]` format.
- `onLayerClick` : expects a function.

In this example we are styling the `getColor` prop based on a data attribute. We have a preset color scheme and use D3's `scaleThreshold()` to calculate a scale based on the provided data.

## Example: With Tooltip

The Example: With Tooltip story shows an example of using the MapTooltip component with the Path Map component.
