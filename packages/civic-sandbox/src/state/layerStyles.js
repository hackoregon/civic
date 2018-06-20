/* COLOR SCHEME OPTIONS */
const thermal = [[255, 255, 204, 255], [255, 237, 160, 255], [254, 217, 118, 255], [254, 178, 76, 255], [253, 141, 60, 255], [252, 78, 42, 255], [227, 26, 28, 255], [189, 0, 38, 255], [128, 0, 38, 255]];
const planet = [[247, 244, 249, 255], [231, 225, 239, 255], [212, 185, 218, 255], [201, 148, 199, 255], [223, 101, 176, 255], [231, 41, 138, 255], [206, 18, 86, 255], [152, 0, 67, 255], [103, 0, 31, 255]];
const space = [[247, 252, 253, 255], [224, 236, 244, 255], [191, 211, 230, 255], [158, 188, 218, 255], [140, 150, 198, 255], [140, 107, 177, 255], [136, 65, 157, 255], [129, 15, 124, 255], [77, 0, 75, 255]];
const earth = [[255, 247, 251, 255], [236, 226, 240, 255], [208, 209, 230, 255], [166, 189, 219, 255], [103, 169, 207, 255], [54, 144, 192, 255], [2, 129, 138, 255], [1, 108, 89, 255], [1, 70, 54, 255]];
const ocean = [[255, 255, 217, 255], [237, 248, 177, 255], [199, 233, 180, 255], [127, 205, 187, 255], [65, 182, 196, 255], [29, 145, 192, 255], [34, 94, 168, 255], [37, 52, 148, 255], [8, 29, 88, 255]];

// Slide 015 - Change in Ridership by Route

// Slide 016 - points of interest (icon map)
const poiIconMapping = {
  School: {
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    mask: true,
  },
  Hospital: {
    x: 250,
    y: 0,
    width: 250,
    height: 250,
    mask: true,
  },
  BEECN: {
    x: 500,
    y: 0,
    width: 250,
    height: 250,
    mask: true,
  },
  'Fire Station': {
    x: 0,
    y: 250,
    width: 250,
    height: 250,
    mask: true,
  },
  Pin: {
    x: 250,
    y: 250,
    width: 250,
    height: 250,
    mask: true,
  },
  COMMCTR: {
    x: 500,
    y: 250,
    width: 250,
    height: 250,
    mask: true,
  },
};

const poiIconZoomScale = zoom => zoom > 11.5 ? 10 :
  zoom > 10.5 ? 8 :
  zoom > 9.5 ? 6 :
  zoom > 8.5 ? 4 :
  zoom > 7.5 ? 2 :
  1;

const poiGetIconColor = f => f.properties.type === 'BEECN' ? [0, 0, 0, 255] :
  f.properties.type === 'COMMCTR' ? [114, 29, 124, 255] :
  f.properties.type === 'Fire Station' ? [220, 69, 86, 255] :
  f.properties.type === 'School' ? [255, 178, 38, 255] :
  f.properties.type === 'Hospital' ? [30, 98, 189, 255] :
  [0, 0, 0, 255];

// Slide 035 - Bike Counts

// Slide 036 - Bike Estimates

export const slides = data => ({
  'bike parking': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-001-bike-parking',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [220, 69, 86, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'ScatterPlotMap',
      id: 'scatterplot-layer-slide-001-bike-parking',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: f => [220, 69, 86, 255],
      getRadius: f => 50,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100],
      parameters: { depthTest: false },
    },
  },
  'bike lanes': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-002-bike-lanes',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [220, 69, 86, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'PathMap',
      id: 'path-layer-slide-002-bike-lanes',
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: f => [220, 69, 86, 255],
      getPath: f => f.geometry.coordinates,
      getWidth: f => 40,
      rounded: false,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 255],
    },
  },
  parks: {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-003-parks',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [25, 183, 170, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'SmallPolygonMap',
      id: 'polygon-layer-slide-003-parks',
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: f => [25, 183, 170, 255],
      getLineWidth: f => 50,
      stroked: true,
      getFillColor: f => [25, 183, 170, 255],
      filled: true,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 255],
    },
  },
  'multi-use trails': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-004-multi-use-trails',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [220, 69, 86, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'PathMap',
      id: 'path-layer-slide-004-multi-use-trails',
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: f => [220, 69, 86, 255],
      getPath: f => f.geometry.coordinates,
      getWidth: f => 40,
      rounded: false,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 255],
    },
  },
  'community gardens': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-005-community-gardens',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [25, 183, 170, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'SmallPolygonMap',
      id: 'polygon-layer-slide-005-community-gardens',
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: f => [25, 183, 170, 255],
      getLineWidth: f => 50,
      stroked: true,
      getFillColor: f => [25, 183, 170, 255],
      filled: true,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 255],
    },
  },
  'bike greenways': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-008-bike-greenways',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [25, 183, 170, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'PathMap',
      id: 'path-layer-slide-008-bike-greenways',
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: f => [25, 183, 170, 255],
      getPath: f => f.geometry.coordinates,
      getWidth: f => 40,
      rounded: false,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 255],
    },
  },
  'rail stops': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-009-rail-stops',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [255, 178, 38, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'ScatterPlotMap',
      id: 'scatterplot-layer-slide-009-rail-stops',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: f => [255, 178, 38, 255],
      getRadius: f => 50,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100],
      parameters: { depthTest: false },
    },
  },
  'grocery stores': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-010-grocery-stores',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [138, 43, 226, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'ScatterPlotMap',
      id: 'scatterplot-layer-slide-010-grocery-stores',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: f => [138, 43, 226, 255],
      getRadius: f => 50,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100],
      parameters: { depthTest: false },
    },
  },
  demolitions: {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-011-demolitions',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [114, 29, 124, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'ScatterPlotMap',
      id: 'scatterplot-layer-slide-011-demolitions',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: f => [114, 29, 124, 255],
      getRadius: f => 50,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100],
      parameters: { depthTest: false },
    },
  },
  'camp sweeps': {
    map: {
      mapType: 'ScreenGridMap',
      id: 'screengrid-layer-slide-012-camps-sweeps',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.75,
      colorRange: thermal,
      cellSizePixels: 40,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 255],
    },
  },
  'camp reports': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-013-camp-reports',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [220, 69, 86, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'ScatterPlotMap',
      id: 'scatterplot-layer-slide-013-camp-reports',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: f => [220, 69, 86, 255],
      getRadius: f => 50,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100],
      parameters: { depthTest: false },
    },
  },
  'bus stops': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-014-bus-stops',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [220, 69, 86, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'ScatterPlotMap',
      id: 'scatterplot-layer-slide-014-bus-stops',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: f => [220, 69, 86, 255],
      getRadius: f => 50,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100],
      parameters: { depthTest: false },
    },
  },
  'points of interest': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-016-poi',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [0, 0, 0, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'IconMap',
      id: 'icon-layer-slide-016-poi',
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      iconAtlas: 'http://i.imgur.com/xgTAROe.png',
      iconMapping: poiIconMapping,
      sizeScale: 1,
      getPosition: f => f.geometry.coordinates,
      getIcon: f => f.properties.type,
      getSize: f => 12.5,
      getColor: poiGetIconColor,
      autoHighlight: false,
    },
  },
  'Building Permits': {
    map: {
      mapType: 'ScreenGridMap',
      id: 'screengrid-layer-slide-017-building-permits',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.75,
      colorRange: thermal,
      cellSizePixels: 40,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 255],
    },
  },
  'Safety Hotline': {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-031-safety-hotline',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [255, 178, 38, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'ScatterPlotMap',
      id: 'scatterplot-layer-slide-031-safety-hotline',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.25,
      getColor: f => [255, 178, 38, 255],
      getRadius: f => 40,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100],
      parameters: { depthTest: false },
    },
  },
  Crashes: {
    boundary: {
      mapType: 'PolygonPlotMap',
      id: 'boundary-layer-slide-032-crashes',
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [220, 69, 86, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
    map: {
      mapType: 'ScatterPlotMap',
      id: 'scatterplot-layer-slide-032-crashes',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.25,
      getColor: f => [220, 69, 86, 255],
      getRadius: f => 40,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100],
      parameters: { depthTest: false },
    },
  },
});


/* FOUNDATIONS COLOR SCALES */
// FOUNDATION 006 - Property Value
const foundation006GetColor = (f) => {
  const value = parseFloat(f.properties.prop_value);
  return value >= 2000000 ? thermal[8] :
    value >= 1750000 ? thermal[7] :
    value >= 1500000 ? thermal[6] :
    value >= 1250000 ? thermal[5] :
    value >= 1000000 ? thermal[4] :
    value >= 750000 ? thermal[3] :
    value >= 500000 ? thermal[2] :
    value >= 250000 ? thermal[1] :
    value >= 0 ? thermal[0] :
    [0, 0, 0, 100];
};

// FOUNDATION 007 - Total Population
const foundation007GetColor = (f) => {
  const value = f.properties.total_population;
  return value >= 27000 ? thermal[8] :
    value >= 24000 ? thermal[7] :
    value >= 21000 ? thermal[6] :
    value >= 18000 ? thermal[5] :
    value >= 15000 ? thermal[4] :
    value >= 12000 ? thermal[3] :
    value >= 8000 ? thermal[2] :
    value >= 4000 ? thermal[1] :
    value >= 0 ? thermal[0] :
    [0, 0, 0, 100];
};

// FOUNDATION 015 - Housholds with Children
// SAME AS FOUNDATUON 024?

// FOUNDATION 018 - Median Houshold Income
const foundation018GetColor = (f) => {
  const value = f.properties.median_household_income;
  return value >= 200000 ? thermal[8] :
    value >= 175000 ? thermal[7] :
    value >= 150000 ? thermal[6] :
    value >= 125000 ? thermal[5] :
    value >= 100000 ? thermal[4] :
    value >= 75000 ? thermal[3] :
    value >= 50000 ? thermal[2] :
    value >= 25000 ? thermal[1] :
    value >= 0 ? thermal[0] :
    [0, 0, 0, 100];
};

// FOUNDATION 019 - Median Gross Rent
const foundation019GetColor = (f) => {
  const value = f.properties.Median_gross_rent;
  return value >= 2700 ? thermal[8] :
    value >= 2400 ? thermal[7] :
    value >= 2100 ? thermal[6] :
    value >= 1800 ? thermal[5] :
    value >= 1500 ? thermal[4] :
    value >= 1200 ? thermal[3] :
    value >= 900 ? thermal[2] :
    value >= 600 ? thermal[1] :
    value >= 300 ? thermal[0] :
    [0, 0, 0, 100];
};

// FOUNDATION 020 - Evictions
const foundation020GetColor = (f) => {
  const value = f.properties.evictions;
  return value <= 8 ? thermal[0] :
    value <= 16 ? thermal[1] :
    value <= 24 ? thermal[2] :
    value <= 32 ? thermal[3] :
    value <= 40 ? thermal[4] :
    value <= 48 ? thermal[5] :
    value <= 56 ? thermal[6] :
    value <= 64 ? thermal[7] :
    value <= 72 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 021 - Renter Occupied Households
const foundation021GetColor = (f) => {
  const value = f.properties.renter_occupied_households;
  return value <= 225 ? thermal[0] :
    value <= 450 ? thermal[1] :
    value <= 675 ? thermal[2] :
    value <= 900 ? thermal[3] :
    value <= 1125 ? thermal[4] :
    value <= 1350 ? thermal[5] :
    value <= 1575 ? thermal[6] :
    value <= 1800 ? thermal[7] :
    value <= 2025 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 022 - Rent Burden
const foundation022GetColor = (f) => {
  const value = f.properties.rent_burden;
  return value >= 50 ? thermal[0] :
    value >= 45 ? thermal[1] :
    value >= 40 ? thermal[2] :
    value >= 35 ? thermal[3] :
    value >= 30 ? thermal[4] :
    value >= 25 ? thermal[5] :
    value >= 20 ? thermal[6] :
    value >= 15 ? thermal[7] :
    value >= 10 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 024 - Households with Children
const foundation024GetColor = (f) => {
  const value = f.properties.pc_household_with_children_under_18;
  return value <= 0.07 ? thermal[0] :
    value <= 0.14 ? thermal[1] :
    value <= 0.21 ? thermal[2] :
    value <= 0.28 ? thermal[3] :
    value <= 0.35 ? thermal[4] :
    value <= 0.42 ? thermal[5] :
    value <= 0.49 ? thermal[6] :
    value <= 0.56 ? thermal[7] :
    value <= 0.63 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 025 - Households with Seniors
const foundation025GetColor = (f) => {
  const value = f.properties.pc_household_with_individuals_65_ovr;
  return value <= 0.05 ? thermal[0] :
    value <= 0.1 ? thermal[1] :
    value <= 0.15 ? thermal[2] :
    value <= 0.2 ? thermal[3] :
    value <= 0.25 ? thermal[4] :
    value <= 0.3 ? thermal[5] :
    value <= 0.35 ? thermal[6] :
    value <= 0.4 ? thermal[7] :
    value <= 0.45 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 026 - Housholders Living Alone
const foundation026GetColor = (f) => {
  const value = f.properties.pc_householders_living_alone;
  return value <= 0.2 ? thermal[0] :
    value <= 0.3 ? thermal[1] :
    value <= 0.4 ? thermal[2] :
    value <= 0.5 ? thermal[3] :
    value <= 0.6 ? thermal[4] :
    value <= 0.7 ? thermal[5] :
    value <= 0.8 ? thermal[6] :
    value <= 0.9 ? thermal[7] :
    value <= 1.0 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 027 - Owner Occupied Housholds
const foundation027GetColor = (f) => {
  const value = f.properties.pc_owner_occupied_housing_units;
  return value <= 0.2 ? thermal[0] :
    value <= 0.3 ? thermal[1] :
    value <= 0.4 ? thermal[2] :
    value <= 0.5 ? thermal[3] :
    value <= 0.6 ? thermal[4] :
    value <= 0.7 ? thermal[5] :
    value <= 0.8 ? thermal[6] :
    value <= 0.9 ? thermal[7] :
    value <= 1.0 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 028 - Percent Renter Occupied
const foundation028GetColor = (f) => {
  const value = f.properties.pctrenter_occupied;
  return value <= 20 ? thermal[0] :
    value <= 30 ? thermal[1] :
    value <= 40 ? thermal[2] :
    value <= 50 ? thermal[3] :
    value <= 60 ? thermal[4] :
    value <= 70 ? thermal[5] :
    value <= 80 ? thermal[6] :
    value <= 90 ? thermal[7] :
    value <= 100 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 029 - Shaking Intensity
const foundation029GetColor = (f) => {
  const value = f.properties.pgv_site_mean_mmi_txt;
  return value === 'Very strong (VII)' ? thermal[7] :
    value === 'Severe (VIII)' ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 030 - Wet Season Mean Deformation Intensity
const foundation030GetColor = (f) => {
  const value = f.properties.pgd_total_wet_mean_di;
  return value === 'Low' ? thermal[1] :
  	value === 'Moderate' ? thermal[2] :
    value === 'High' ? thermal[3] :
    value === 'Very High' ? thermal[4] :
    [0, 0, 0, 100];
};

// FOUNDATION 033 - Dry Season Mean Deformation Intensity
const foundation033GetColor = (f) => {
  const value = f.properties.pgd_landslide_dry_mean_di;
  return value === 'None' ? thermal[0] :
    value === 'Low' ? thermal[1] :
    [0, 0, 0, 100];
};

// FOUNDATION 034 - Census Reponse Rate
const foundation034GetColor = (f) => {
  const value = f.properties.census_response_rate;
  return value <= 20 ? thermal[0] :
    value <= 30 ? thermal[1] :
    value <= 40 ? thermal[2] :
    value <= 50 ? thermal[3] :
    value <= 60 ? thermal[4] :
    value <= 70 ? thermal[5] :
    value <= 80 ? thermal[6] :
    value <= 90 ? thermal[7] :
    value <= 100 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 037 - Voters 18 to 25
const foundation037GetColor = (f) => {
  const value = f.properties.pct_18_25;
  return value <= 0.2 ? thermal[0] :
    value <= 0.3 ? thermal[1] :
    value <= 0.4 ? thermal[2] :
    value <= 0.5 ? thermal[3] :
    value <= 0.6 ? thermal[4] :
    value <= 0.7 ? thermal[5] :
    value <= 0.8 ? thermal[6] :
    value <= 0.9 ? thermal[7] :
    value <= 1.0 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 038 - Voters 26 to 32
const foundation038GetColor = (f) => {
  const value = f.properties.pct_26_32;
  return value <= 0.2 ? thermal[0] :
    value <= 0.3 ? thermal[1] :
    value <= 0.4 ? thermal[2] :
    value <= 0.5 ? thermal[3] :
    value <= 0.6 ? thermal[4] :
    value <= 0.7 ? thermal[5] :
    value <= 0.8 ? thermal[6] :
    value <= 0.9 ? thermal[7] :
    value <= 1.0 ? thermal[8] :
    [0, 0, 0, 100];
};

// FOUNDATION 039 - Voters 33 to 39

// FOUNDATION 040 - Voters 40 to 49

// FOUNDATION 041 - Voters 50 plus

// FOUNDATION 042 - Change in Ridership by Census Block

// FOUNDATION 043 - Eviction Rate

// FOUNDATION 044 - Poverty Rate

export const foundations = data => ({
  'Total Population': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-007-toatl-population',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation007GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Median Houshold Income': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-018-median-houshold-income',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation018GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Median Gross Rent': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-019-median-gross-rent',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation019GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  Evictions: {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-020-evictions',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation020GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Renter Occupied Households': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-021-renter-occupied-households',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation021GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Rent Burden': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-022-rent-burden',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation022GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Households with Children': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-024-households-children',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation024GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Households with Seniors': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-025-households-seniors',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation025GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Housholders Living Alone': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-026=housholders-living-alone',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation026GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Owner Occupied Housholds': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-027-owner-occupied-housholds',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation027GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Percent Renter Occupied': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-028-percent-renter-occupied',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation028GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Shaking Intensity': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-029-shaking-intensity',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation029GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Wet Season Mean Deformation Intensity': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-030-wet-season-mean-deformation-intensity',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation030GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Dry Season Mean Deformation Intensity': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-033-dry-season-mean-deformation-intensity',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.75,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation033GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Census Reponse Rate': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-034-census-reponse-rate',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.75,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation034GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Voters 18 to 25': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-037-voters-18-25',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.75,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation037GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Voters 26 to 32': {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-038-voters-26-32',
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.75,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    getFillColor: foundation038GetColor,
    filled: true,
    onClick: info => console.log('Layer clicked:', info.object),
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
});
