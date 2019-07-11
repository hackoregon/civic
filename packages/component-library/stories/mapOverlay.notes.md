# MapOverlay Component

## Standard

The Standard story shows the basic usage of the MapOverlay component for the CIVIC platform.

These props can be set in the Standard story:

- **data:** this prop expects a valid [GeoJSON object](https://tools.ietf.org/html/rfc7946#section-3) or an [array of feature objects](https://tools.ietf.org/html/rfc7946#section-3.2)
- **getFillColor:** the color of each feature
  - This prop expects an array in `[r, g, b, [a]]` format or a function
  - Each value in the array should be between 0 and 255
  - The fourth value in the array is optional and represents opacity
  - If an array is provided, the color is applied to all features
  - If a function is provided, it is called on each feature to set the fill color
- **getLineColor:** the color of the stroke for each feature
  - This prop expects an array in `[r, g, b, [a]]` format or a function
  - Each value in the array should be between 0 and 255
  - The fourth value in the array is optional and represents opacity
  - If an array is provided, the color is applied to all features
  - If a function is provided, it is called on each feature to set the fill color
- **getLineWidth:** the width of the stroke for each feature
  - This prop expects a number or a function
  - If a number is provided, it is used as the stroke width for all features
  - If a function is provided, it is called on each feature to set the stroke width
- **opacity:** the opacity of each feature
  - This prop expects a decimal between 0 and 1

## Custom

The Custom story shows additional props that can be passed to the MapOverlay component.

These props can be set in the Custom story:

- **filled:** whether features are filled with a color
  - This prop expects a boolean value
- **stroked:** whether features are outlined with a color
  - This prop expects a boolean value
- **autoHighlight:** whether current feature when hovered over is highlighted
  - This prop expects a boolean value
- **highlightColor:** the color used to highlight a feature
  - This prop expects an array in the `[r, g, b, [a]]` format
  - Each value in the array should be between 0 and 255
  - The fourth value in the array is optional and represents opacity
- **onLayerClick:** this function will be called when a feature is clicked
  - This prop expects a function

## Example: Choropleth Map

This story shows MapOverlay used to create a choropleth map.

## Example: With Tooltip

This story shows MapOverlay used with the MapTooltip component.
