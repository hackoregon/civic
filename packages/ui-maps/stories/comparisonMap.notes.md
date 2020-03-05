# Comparison Map Component

## Standard

The Standard story shows the basic usage of the Comparison Map component for the CIVIC platform.

These props can be set in the Standard story:

- **leftMap:** the map that will appear on the left side
  - This prop expects a map component
- **rightMap:** the map that will appear on the right side
  - This prop expects a map component
- **height:** the height of the map components
  - This prop expects a number
- **sliderStartPosition:** the initial position of the comparison slider
  - This prop expects a number between 0 and 100
- **initialViewport:** the initial position of the map
  - The initialViewport prop expects an object and may include the following properties:
  - **"latitude":** the initial latitude of the map components
    - This prop expects a decimal between -90 and 90
  - **"longitude":** the initial longitude of the map components
    - This prop expects a decimal between -120 and 120
  - **"zoom":** the initial zoom level of the map components
    - This prop expects a number between 0 and 24
