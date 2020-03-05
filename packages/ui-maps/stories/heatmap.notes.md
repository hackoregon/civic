# Heat Map Implementation

## Standard

The Standard story shows the basic implementation of a heat map for the CIVIC platform.

**NOTE:** Creating a heat map differs from other maps because the heat map is not a separate component.
Instead to create a heat map, you access the `Map` instance from Mapbox GL's API directly through the Base Map component.

These props can be passed to the Base Map component for the Standard implementation of a heat map:

- **mapboxData:** point data to be visualized

  - This prop expects a valid [GeoJSON object](https://tools.ietf.org/html/rfc7946#section-3)

- **mapboxDataId:** unique data source name

  - This prop expects a string

- **mapboxLayerType:** type of Mapbox layer

  - This prop expects the string `"heatmap"`

- **mapboxLayerId:** unique layer name

  - This prop expects a string

- **mapboxLayerOptions:** paint properties for the heat map layer
  - The mapboxLayerOptions prop expects an object with the following properties:
  - **"heatmap-radius":** radius of influence of one heat map point in pixels
    - This property expects a number or a [Mapbox expression](https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions)
  - **"heatmap-opacity":** opacity of the heat map layer
    - This property expects a number between 0 and 1 or a [Mapbox expression](https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions)
  - **"heatmap-intensity":** controls the intensity of the heat map
    - This property expects a number or a [Mapbox expression](https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions)
  - **"heatmap-color":** the color of each pixel based on its density value
    - This property expects a [Mapbox expression](https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions)
  - **"heatmap-weight"**: how much an individual point contributes to the heat map
    - This property expects a number or [Mapbox expression](https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions)

The **mapboxLayerOptions** object could look something like this:

```json
{
  "heatmap-radius": 25,
  "heatmap-opacity": 0.9,
  "heatmap-intensity": 1,
  "heatmap-color": [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0, // lowest density value
    "rgba(0,0,0,0)", // lowest color value for the heat map
    0.2,
    "#420a68",
    0.4,
    "#932667",
    0.6,
    "#dd513a",
    0.8,
    "#fca50a",
    1, // highest density value
    "#fcffa4" // highest color value for the heat map
  ],
  "heatmap-weight": [
    "interpolate",
    ["linear"],
    ["get", "time_diff"], // field from properties object from GeoJSON
    7, // minimum value for visualized property
    0,
    907, // maximum value for visualized property
    1
  ]
}
```
