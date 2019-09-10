# Base Map Component

## Standard

The Standard story shows the basic usage of the Base Map component for the CIVIC platform.

This prop can be set in the Standard story:

- **civicMapStyle:** the Base Map style
  - This prop expects either the string `"dark"` or `"light"`

## Custom

The Custom story shows additional props that can be passed to the Base Map component.

These props can be set in the Custom story:

- **initialLongitude:** the initial longitude of the Base Map
  - This prop expects a decimal between -120 and 120
- **initialLatitude:** the initial latitude of the Base Map
  - This prop expects a decimal between -90 and 90
- **initialZoom:** the initial zoom level of the Base Map
  - This prop expects a number between 0 and 24
- **initialPitch:** the initial pitch (tilt) of the Base Map
  - This prop expects a number between 0 and 60
- **height:** the height of the Base Map
  - This prop expects a number
- **navigation:** whether the Base Map should include zoom and compass buttons
  - This property expects a boolean
- **useScrollZoom**: whether to enable scroll to zoom
  - This property expects a boolean
- **onBaseMapClick:** this function will be called when the Base Map is clicked
  - This prop expects a function

## Example: Animate to Coordinates

This story shows how the `animate` prop impacts changing map coordinates, including updating `initialLongitude` and `initialLatitude`.

These props can be set in this story:

- **animationDuration**: Controls how long the "fly to" effect takes. Measured in milliseconds.

These actions can be taken from this story:

- **OMSI**: Sets the BaseMap `initialLongitude` and `initialLatitude` to OMSI's coordinates.
- **Rocky Butte**: Sets the BaseMap `initialLongitude` and `initialLatitude` to Rocky Butte's coordinates.

## Example: With Geocoder

This story shows how to use a geocoder with the Base Map.

These props can be set in this story:

- **geocoder:** whether the Base Map should include the geocoder
  - This prop expects a boolean
- **geocoderOptions:** options for the geocoder search input
  - The geocoderOptions prop expects an object and may include the following properties:
  - **placeholder:** the text that appears in the geocoder search input
    - This property expects a string
  - **zoom:** the zoom level the geocoder search result will transition to
    - This property expects a number
  - **bbox:** bounding box the search results will be limited to
    - This property expects an array in the format:
      `[minLongitude, minLatitude, maxLongitude, maxLatitude]`
  - [Additional geocoder options can be found here.](https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md)
- **geocoderOnChange:** a function that updates the coordinates of the location marker
  - This prop expects a function
- **locationMarker:** whether to include an ❌ marker at the location of the geocoder results
  - This prop expects a boolean
- **locationMarkerCoord:** the coordinates of the location marker
  - The locationMarkerCoord prop expects an object and must include the following properties:
  - **latitude:** the latitude of the location marker
    - This prop expects a decimal between -90 and 90
  - **longitude:** the longitude of the location marker
    - This prop expects a decimal between -120 and 120
- **mapGLOptions:** interaction properties for the Base Map
  - Please refer to the "Example: No Interactivity" story for more information

## Example: No Interactivity

This story shows how to make the Base Map static.

These props can be set in this story:

- **mapGLOptions:** interaction properties for the Base Map
  - The mapGLOptions prop expects an object and may include the following properties:
  - **scrollZoom:** enable scroll to zoom
    - This property expects a boolean
  - **dragPan:** enable drag to pan
    - This property expects a boolean
  - **dragRotate:** enable drag to rotate
    - This property expects a boolean
  - **doubleClickZoom:** enable double click to zoom
    - This property expects a boolean
  - **touchZoom:** enable multitouch zoom
    - This property expects a boolean
  - **touchRotate:** enable multitouch rotate
    - This property expects a boolean
  - **keyboard:** enable keyboard shortcuts
    - This property expects a boolean
  - [Additional mapGLOptions options can be found here.](https://github.com/uber/react-map-gl/blob/master/docs/components/interactive-map.md)

## Example: Use Container Height

This story shows how to make the Base Map's height responsive.

The Base Map component must be wrapped in a `div` for this to work correctly and its CSS `height` property set to `100vh`. You can also set a `min-height` property to prevent the Base Map's height from becoming too short.

This prop can be set in this story:

- **useContainerHeight:** whether the Base Map should adjust according to the height of its parent container
  - This prop expects a boolean

## Example: With Scale Bar

This story shows how to include a scale bar on the Base Map.

- **scaleBar:** whether the Base Map should include a scale bar
  - This prop expects a boolean
- **scaleBarOptions:** options for the scale bar
  - The scaleBarOptions prop expects an object and must include the following properties:
  - **maxWidth:** the maximum length of the scale bar
    - This property expects a number
  - **units:** distance units displayed by the scale bar
    - This property expects 1 of the following strings:
      - `"imperial"`
      - `"metric"`
      - `"nautical"`
