/* eslint-disable */
const createMapTypeProp = mapType => `
- **mapType:** the type of map layer to create
  - This property requires the string \`"${mapType}"\`
`;

const idProp = `
- **id:** a unique identifier for the map layer
  - This property requires a string
`;

const createDataProp = (vizType, geoType) => `
- **data:** the geospatial data to be visualized as ${vizType}
  - This property requires an array of [feature objects](https://tools.ietf.org/html/rfc7946#section-3.2) with a geometry type of \`${geoType}\`
`;

const createOpacityProp = geometryType => `
- **opacity:** the opacity of the ${geometryType}
  - This property requires a decimal greater than  0 and less than or equal to 1
`;

const createSizeProp = (geometryType, type) => `
- **${geometryType}${type}:** the width of the ${geometryType}s
  - This property requires a number greater than 1
`;

const civicCategoricalColorOptions = `
    - civicBlue
    - civicGreen
    - civicPurple
    - civicPink
    - civicYellow
`;

const civicSequentialColorOptions = `
    - thermal
    - planet
    - space
    - earth
    - ocean
`;

const createColorProp = (geometryType, colorType) => `
- **civicColor:** the color of the ${geometryType}
  - This property will make all ${geometryType} the same color
  - This property expects one of the following strings:
    ${colorType}
`;

const createScaleTypeProp = ({
  threshold = false,
  equal = false,
  ordinal = false
}) => `
- **scaleType:** indicates how the data should be grouped into classes/bins
  - This property expects an object with a key set to \`"color"\` and one of the following strings as its value:
    ${
      threshold
        ? "- threshold: divides the data into classes/bins for diverging data"
        : "."
    }
    ${
      equal ? "- equal: divides the data into equally spaced classes/bins" : "."
    }
    ${
      ordinal
        ? "- ordinal: divides the data into classes/bins for categorical data"
        : "."
    }

  - For example: \`{"color": "ordinal"}\`
`;

const createCustomColorProp = (
  geometryType,
  { threshold = false, equal = false, ordinal = false }
) => `
- **civicColor:** the color scheme used to color the ${geometryType}
  ${
    threshold
      ? `- This property requires one of these diverging color schemes as a string if the \`scaleType\` is set to \`threshold\`:
        - purpleGreen
        - purpleOrange`
      : ""
  }
  ${
    equal
      ? `- This property requires one of these sequential color schemes as a string if the \`scaleType\` is set to \`equal\`:
        - thermal
        - planet
        - space
        - earth
        - ocean`
      : ""
  }
  ${
    ordinal
      ? `- This property requires no value if \`scaleType\` is set to \`ordinal\``
      : ""
  }
`;

const fieldNameProp = `
- **fieldName:** the name of the property to be visualized 
  - This property requires an object with a key set to \`"color"\` and the value set to a string of the name of a data property if a \`scaleType\` is selected
  - The value name will usually come from one of the properties found in each feature object in the data array 
  - For example: \`{"color": "pct_college_grad"}\`
`;

const createOnClickProp = geometryType => `
- **onLayerClick:** this function will be called when ${geometryType} is clicked
  - This property expects a function
`;

const baseNotes = `
# MultiLayer Map Component

The MultiLayer Map component is a more convenient way to display multiple map layers on the same Base Map.

These props can be passed to the MultiLayer Map component:

- **mapLayers:** the different map layers to be displayed
  - This prop expects an array of objects
  - Each object has a collection of properties made up of the values described below each map type.

----

`;

const pathNotes = `
${baseNotes}

## Path Map

The Standard tab shows the basic implementation of a Path Map for the MultiLayer Map component.

These properties can be used to create a standard path map layer object:
${createMapTypeProp("PathMap")}
${idProp}
${createDataProp("lines", "LineString")}
${createSizeProp("line", "Width")}
${createOpacityProp("lines")}
${createColorProp("lines", civicCategoricalColorOptions)}

----

The Custom tab shows additional properties that can be used to create a custom path map layer object:
${createScaleTypeProp({ threshold: true, equal: true, ordinal: true })}
${createCustomColorProp("lines", {
  threshold: true,
  equal: true,
  ordinal: true
})}
${fieldNameProp}

- **dataRange:** an array of possible values for the data property selected in \`fieldName\`
  - This property requires an array of numbers in ascending order if the \`scaleType\` is set to \`threshold\`
    - The \`dataRange\` values serve as the breakpoints for the threshold scale
    - The \`dataRange\` array must have 8 numbers if you are using a \`civicColor\` diverging color scheme
      - For example: \`[-100, -75, -50, -25, 25, 50, 75, 100]\`
    - The \`dataRange\` array must have 1 number fewer than its \`colorRange\` if you are using a custom color scheme 
      - For example:
        - \`dataRange\`: \`[0.25, 0.5, 0.75]\`
        - \`colorRange\`: \`[[255,0,0], [255,165,0], [255,255,0], [0,128,0]]\`
  - This property is optional if the \`scaleType\` is set to \`equal\`
    - The \`dataRange\` values signifies the minimum and maximum values for the data property set in \`fieldName\`
    - The \`dataRange\` is automatically calculated if the array is left empty
    - The \`dataRange\` accepts an array of 2 numbers 
      - For example: \`[0, 45876]\`
  - This property requires an array of strings if the \`scaleType\` is set to \`ordinal\`
    - The \`dataRange\` represents all possible unique values of the data property set in \`fieldName\`
      - For example: \`["Democrat", "Republican", "Independent"]\` or \`["None", "Low", "Medium", "High"]\`

- **colorRange:** an array of custom color values that overrides \`civicColor\`
  - This property expects an array of arrays
    - Each array in the array should represent an RGB color code in the following format: \`[r, g, b, [a]]\`
    - The fourth value in the array is optional and represents the color's opacity
    - Each number in the array should be between 0 and 255
      - For example: \`[[216,179,101,128], [245,245,245,128], [90,180,172,128]]\`
  - This property is optional if the \`scaleType\` is set to \`threshold\`
    - The \`colorRange\` array must have 1 value more than the its \`dataRange\`
      - For example:
        - \`dataRange\`: \`[0.25, 0.5, 0.75]\`
        - \`colorRange\`: \`[[255,0,0], [255,165,0], [255,255,0], [0,128,0]]\`
    - Data values less than the number at index 0 of the \`dataRange\` will have the color at index 0 of the \`colorRange\`
      - Data values less than the number at index 1 but greater or equal to the number at index 0 of the \`dataRange\` will have the color at index 1 of the \`colorRange\`
      - And so on...
  - This property is optional if the \`scaleType\` is set to \`equal\`
  - This property is required if the \`scaleType\` is set to \`ordinal\`
    - The \`colorRange\` array must have then same number of values as its \`dataRange\`
      - For example:
        - \`dataRange\`: \`["Democrat", "Republican", "Green"]\`
        - \`colorRange\`: \`[[0,0,255], [255,165,0], [0,255,0]]\`
    - The index of each value in \`dataRange\` will determine which color from the \`colorRange\` it's assigned
      - Thus the value at index 0 in the \`dataRange\` will have the color at index 0 of the \`colorRange\`

${createOnClickProp("a line")}
`;

const scatterPlotNotes = `
${baseNotes}

## ScatterPlot Map

The Standard tab shows the basic implementation of a ScatterPlot Map for the MultiLayer Map component.

These properties can be used to create a standard scatter plot map layer object:
${createMapTypeProp("ScatterPlotMap")}
${idProp}
${createDataProp("circles", "Point")}

- **radius:** the width of the circles
  - This property requires a number greater than 1

${createOpacityProp("circles")}
${createColorProp("circles", civicCategoricalColorOptions)}

----

The Custom tab shows additional properties that can be used to create a custom scatter plot map layer object:

- **scaleType (color):** indicates how the data should be grouped into classes/bins
  - This property expects an object with a key set to \`"color"\` and one of the following strings as its value:
    - ordinal: divides the data into classes/bins for categorical data
  - For example: \`{"color": "ordinal"}\`

${createCustomColorProp("lines", {
  threshold: false,
  equal: false,
  ordinal: true
})}

- **fieldName (color):** the name of the property to be visualized 
  - This property requires an object with a key set to \`"color"\` and the value set to a string of the name of a data property if a \`scaleType\` is selected
  - The value name will usually come from one of the properties found in each feature object in the data array 
  - For example: \`{"color": "pct_college_grad"}\`

- **dataRange:** an array of possible values for the data property selected in \`fieldName\`
  - This property requires an array of strings if the \`scaleType\` is set to \`ordinal\`
    - The \`dataRange\` represents all possible unique values of the data property set in \`fieldName\`
      - For example: \`["Democrat", "Republican", "Independent"]\` or \`["None", "Low", "Medium", "High"]\`

- **colorRange:** an array of custom color values that overrides \`civicColor\`
  - This property expects an array of arrays
    - Each array in the array should represent an RGB color code in the following format: \`[r, g, b, [a]]\`
    - The fourth value in the array is optional and represents the color's opacity
    - Each number in the array should be between 0 and 255
      - For example: \`[[216,179,101,128], [245,245,245,128], [90,180,172,128]]\`
  - This property is required if the \`scaleType\` is set to \`ordinal\`
    - The \`colorRange\` array must have then same number of values as its \`dataRange\`
      - For example:
        - \`dataRange\`: \`["Democrat", "Republican", "Green"]\`
        - \`colorRange\`: \`[[0,0,255], [255,165,0], [0,255,0]]\`
    - The index of each value in \`dataRange\` will determine which color from the \`colorRange\` it's assigned
      - Thus the value at index 0 in the \`dataRange\` will have the color at index 0 of the \`colorRange\`

- **scaleType (area):** indicates how circles should be sized 
  - This property expects an object with a key set to \`"area"\` and one of the following strings as its value:
    - circle area: sizes the circles by its area according to the value set in \`fieldName\` area
  - For example: \`{"area": "circle area"}\`

- **fieldName (area):** the name of the property to be visualized 
  - This property requires an object with a key set to \`"area"\` and the value set to a string of the name of a data property if a \`scaleType\` area is selected
  - The value name will usually come from one of the properties found in each feature object in the data array 
  - For example: \`{"area": "bike_count"}\`

- **radiusScale:** a radius multiplier for all circles
  - This property requires a number greater than 1

${createOnClickProp("a line")}
`;

const screenGridNotes = `
${baseNotes}

## Screen Grid Map

The Standard tab shows the basic implementation of a Screen Grid Map for the MultiLayer Map component.

These properties can be used to create a standard screen grid map layer object:

${createMapTypeProp("ScreenGridMap")}
${idProp}
${createDataProp("squares", "Point")}
${createSizeProp("square", "Size")}
${createOpacityProp("squares")}
${createColorProp("squares", civicSequentialColorOptions)}
`;

const iconNotes = `
${baseNotes}

## Icon Map

The Standard tab shows the basic implementation of an Icon Map for the MultiLayer Map component.

These properties can be used to create a standard icon map layer object:

${createMapTypeProp("IconMap")}
${idProp}
${createDataProp("icons", "Point")}
${createSizeProp("icon", "Size")}
${createOpacityProp("icons")}

- **iconAtlas:** a sprite of icons
  - This property requires a URL as a string
  - For example: \`"https://i.imgur.com/xgTAROe.png"\`

- **iconMapping:** an object describing the position and attributes of the icons in the iconAtlas
  - This property requires an object with the following keys:
    - **x:** the x position of the icon in the iconAtlas
      - This property expects a number
    - **y:** the y position of the icon in the iconAtlas
      - This property expects a number
    - **width:** width of the icon in the iconAtlas
      - This property expects a number
    - **height:** height of the icon in the iconAtlas
      - This property expects a number
    - **mask:** whether a color is applied to the icon
      - This property expects a boolean
  - For example:

~~~json
{
  "School": {
    "x": 0,
    "y": 0,
    "width": 250,
    "height": 250,
    "mask": true
  },
  "Hospital": {
    "x": 250,
    "y": 0,
    "width": 250,
    "height": 250,
    "mask": true
  },
  "BEECN": {
    "x": 500,
    "y": 0,
    "width": 250,
    "height": 250,
    "mask": true
  },
  "Fire Station": {
    "x": 0,
    "y": 250,
    "width": 250,
    "height": 250,
    "mask": true
  },
  "Pin": {
    "x": 250,
    "y": 250,
    "width": 250,
    "height": 250,
    "mask": true
  },
  "COMMCTR": {
    "x": 500,
    "y": 250,
    "width": 250,
    "height": 250,
    "mask": true
  }
}
~~~

- **scaleType:** indicates how the data should be grouped into classes/bins
  - This property requires an object with a key set to \`"color"\` and the string \`"ordinal"\`as its value
  - For example: \`{"color": "ordinal"}\`

- **fieldName:** the name of the property that assigns an icon type to a point 
  - This property requires an object with a key set to \`"color"\` and the value set to a string of the name of a data property
  - The value name will usually come from one of the properties found in each feature object in the data array 
  - For example: \`{"color": "icon_type"}\`

- **dataRange:** an array of possible icons for the data property selected in \`fieldName\`
  - This property requires an array of strings
  - The \`dataRange\` represents all possible unique values of the data property set in \`fieldName\`
  - For example: \`["BEECN", "COMMCTR", "Fire Station", "School", "Hospital"]\`

- **colorRange:** an array of custom color values
  - This property requires an array of arrays
    - Each array in the array should represent an RGB color code in the following format: \`[r, g, b, [a]]\`
    - The fourth value in the array is optional and represents the color's opacity
    - Each number in the array should be between 0 and 255
  - The \`colorRange\` array must have then same number of values as its \`dataRange\`
    - For example:
      - \`dataRange\`: \`["BEECN", "COMMCTR", "Fire Station", "School", "Hospital"]\`
      - \`colorRange\`: \`[[0,0,0], [114,29,124], [220,69,86], [255,178,38], [30,98,189]]\`
  - The index of each icon name in the \`dataRange\` will determine which color from the \`colorRange\` it is assigned
    - Thus the icon name at index 0 in the \`dataRange\` will have the color at index 0 of the \`colorRange\`
    - And so on...

${createOnClickProp("an icon")}
`;

const smallPolygonNotes = `
${baseNotes}

## Small Polygon Map

The Standard tab shows the basic implementation of a Small Polygon Map for the MultiLayer Map component.

These properties can be used to create a standard small polygon map layer object:

${createMapTypeProp("SmallPolygonMap")}
${idProp}
${createDataProp("polygons", "Polygon")}
${createOpacityProp("polygons")}
${createColorProp("polygons", civicCategoricalColorOptions)}

----

The Custom tab shows additional properties that can be used to create a custom small polygon map layer object:

${createScaleTypeProp({ threshold: true, equal: false, ordinal: true })}
${createCustomColorProp("polygons", {
  threshold: true,
  equal: false,
  ordinal: true
})}
${fieldNameProp}

- **dataRange:** an array of possible values for the data property selected in \`fieldName\`
  - This property requires an array of numbers in ascending order if the \`scaleType\` is set to \`threshold\`
    - The \`dataRange\` values serve as the breakpoints for the threshold scale
    - The \`dataRange\` array must have 8 numbers if you are using a \`civicColor\` diverging color scheme
      - For example: \`[-100, -75, -50, -25, 25, 50, 75, 100]\`
    - The \`dataRange\` array must have 1 number fewer than its \`colorRange\` if you are using a custom color scheme 
      - For example:
        - \`dataRange\`: \`[0.25, 0.5, 0.75]\`
        - \`colorRange\`: \`[[255,0,0], [255,165,0], [255,255,0], [0,128,0]]\`
  - This property requires an array of strings if the \`scaleType\` is set to \`ordinal\`
    - The \`dataRange\` represents all possible unique values of the data property set in \`fieldName\`
      - For example: \`["Democrat", "Republican", "Independent"]\` or \`["None", "Low", "Medium", "High"]\`

- **colorRange:** an array of custom color values that overrides \`civicColor\`
  - This property expects an array of arrays
    - Each array in the array should represent an RGB color code in the following format: \`[r, g, b, [a]]\`
    - The fourth value in the array is optional and represents the color's opacity
    - Each number in the array should be between 0 and 255
      - For example: \`[[216,179,101,128], [245,245,245,128], [90,180,172,128]]\`
  - This property is optional if the \`scaleType\` is set to \`threshold\`
    - The \`colorRange\` array must have 1 value more than the its \`dataRange\`
      - For example:
        - \`dataRange\`: \`[0.25, 0.5, 0.75]\`
        - \`colorRange\`: \`[[255,0,0], [255,165,0], [255,255,0], [0,128,0]]\`
    - Data values less than the number at index 0 of the \`dataRange\` will have the color at index 0 of the \`colorRange\`
      - Data values less than the number at index 1 but greater or equal to the number at index 0 of the \`dataRange\` will have the color at index 1 of the \`colorRange\`
      - And so on...
  - This property is required if the \`scaleType\` is set to \`ordinal\`
    - The \`colorRange\` array must have then same number of values as its \`dataRange\`
      - For example:
        - \`dataRange\`: \`["Democrat", "Republican", "Green"]\`
        - \`colorRange\`: \`[[0,0,255], [255,165,0], [0,255,0]]\`
    - The index of each value in \`dataRange\` will determine which color from the \`colorRange\` it's assigned
      - Thus the value at index 0 in the \`dataRange\` will have the color at index 0 of the \`colorRange\`
`;

const choroplethNotes = `
${baseNotes}

## Choropleth Map

The Standard tab shows the basic implementation of a Choropleth Map for the MultiLayer Map component.

These properties can be used to create a standard choropleth map layer object:

${createMapTypeProp("ChoroplethMap")}
${idProp}
${createDataProp("polygons", "Polygon")}
${createOpacityProp("polygons")}
${createScaleTypeProp({ threshold: true, equal: true, ordinal: true })}
${createCustomColorProp("polygons", {
  threshold: true,
  equal: true,
  ordinal: true
})}
${fieldNameProp}

- **dataRange:** an array of possible values for the data property selected in \`fieldName\`
  - This property requires an array of numbers in ascending order if the \`scaleType\` is set to \`threshold\`
    - The \`dataRange\` values serve as the breakpoints for the threshold scale
    - The \`dataRange\` array must have 8 numbers if you are using a \`civicColor\` diverging color scheme
      - For example: \`[-100, -75, -50, -25, 25, 50, 75, 100]\`
    - The \`dataRange\` array must have 1 number fewer than its \`colorRange\` if you are using a custom color scheme 
      - For example:
        - \`dataRange\`: \`[0.25, 0.5, 0.75]\`
        - \`colorRange\`: \`[[255,0,0], [255,165,0], [255,255,0], [0,128,0]]\`
  - This property is optional if the \`scaleType\` is set to \`equal\`
    - The \`dataRange\` values signifies the minimum and maximum values for the data property set in \`fieldName\`
    - The \`dataRange\` is automatically calculated if the array is left empty
    - The \`dataRange\` accepts an array of 2 numbers 
      - For example: \`[0, 45876]\`
  - This property requires an array of strings if the \`scaleType\` is set to \`ordinal\`
    - The \`dataRange\` represents all possible unique values of the data property set in \`fieldName\`
      - For example: \`["Democrat", "Republican", "Independent"]\` or \`["None", "Low", "Medium", "High"]\`

- **colorRange:** an array of custom color values that overrides \`civicColor\`
  - This property expects an array of arrays
    - Each array in the array should represent an RGB color code in the following format: \`[r, g, b, [a]]\`
    - The fourth value in the array is optional and represents the color's opacity
    - Each number in the array should be between 0 and 255
      - For example: \`[[216,179,101,128], [245,245,245,128], [90,180,172,128]]\`
  - This property is optional if the \`scaleType\` is set to \`threshold\`
    - The \`colorRange\` array must have 1 value more than the its \`dataRange\`
      - For example:
        - \`dataRange\`: \`[0.25, 0.5, 0.75]\`
        - \`colorRange\`: \`[[255,0,0], [255,165,0], [255,255,0], [0,128,0]]\`
    - Data values less than the number at index 0 of the \`dataRange\` will have the color at index 0 of the \`colorRange\`
      - Data values less than the number at index 1 but greater or equal to the number at index 0 of the \`dataRange\` will have the color at index 1 of the \`colorRange\`
      - And so on...
  - This property is optional if the \`scaleType\` is set to \`equal\`
  - This property is required if the \`scaleType\` is set to \`ordinal\`
    - The \`colorRange\` array must have then same number of values as its \`dataRange\`
      - For example:
        - \`dataRange\`: \`["Democrat", "Republican", "Green"]\`
        - \`colorRange\`: \`[[0,0,255], [255,165,0], [0,255,0]]\`
    - The index of each value in \`dataRange\` will determine which color from the \`colorRange\` it's assigned
      - Thus the value at index 0 in the \`dataRange\` will have the color at index 0 of the \`colorRange\`

${createOnClickProp("a line")}


`;

const notes = {
  pathNotes,
  scatterPlotNotes,
  screenGridNotes,
  iconNotes,
  smallPolygonNotes,
  choroplethNotes
};

export default notes;
