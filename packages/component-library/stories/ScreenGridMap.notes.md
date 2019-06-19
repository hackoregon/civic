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

The Custom story shows all the possible properties that can be passed to the ScreenGrid Map Component for customization.

- `data` : expects an array of objects.
- `getPosition` : expects a function that returns the coordinates of each object in data array.
- `opacity` : expects a number between 0 and 1.
- `autoHighlight` : expects a boolean value.
- `cellSizePixels` : expects a number.
- `colorRange` : expects an array of six colors, where each color is in `[r, g, b, [a]]` format. `a` is a number between 0 and 255.
- `onLayerClick` : expects a function.
