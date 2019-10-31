# Vector Tiles Map Component

## Standard

The Standard story shows the basic usage of the Vector Tiles Map component for the CIVIC platform.

These props can be passed to the Vector Tiles Map component in the Standard implementation:

- **vectorTilesID:** unique id for the vector tiles data source

  - This prop requires a string

- **vectorTilesURL:** URL for a Mapbox tileset

  - This prop requires a string
  - For example: `mapbox://mapbox.mapbox-streets-v8`

- **layerID:** unique id for the layer

  - This prop requires a string

- **layerType:** type of map layer

  - This prop requires a string
  - For example: `fill`, `circle`, `line`

- **sourceLayer:** layer to use from a vector tile source

  - This prop requires a string
  - For example: `water`, `poi_label`

- **paint:** paint properties for the layer
  - This prop requires an object
  - Addition information can be found in the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers) for each layer type:
  - For example:

```json
{
  "fill-color": "#DC4556",
  "fill-opacity": 0.75
}
```

- **layerPosition:** id of an existing layer to insert the new layer before
  - This prop requires a string
  - For example: `waterway-label`, `bridge-path`
