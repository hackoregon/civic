/* TODO: Fix linting errors */
/* eslint-disable */
import { scaleThreshold } from "d3";

/* COLOR SCHEME OPTIONS */
const thermal = [
  [255, 255, 204, 155],
  [255, 237, 160, 155],
  [254, 217, 118, 155],
  [254, 178, 76, 155],
  [253, 141, 60, 155],
  [252, 78, 42, 155],
  [227, 26, 28, 155],
  [189, 0, 38, 155],
  [128, 0, 38, 155]
];
const planet = [
  [247, 244, 249, 155],
  [231, 225, 239, 155],
  [212, 185, 218, 155],
  [201, 148, 199, 155],
  [223, 101, 176, 155],
  [231, 41, 138, 155],
  [206, 18, 86, 155],
  [152, 0, 67, 155],
  [103, 0, 31, 155]
];
const space = [
  [247, 252, 253, 155],
  [224, 236, 244, 155],
  [191, 211, 230, 155],
  [158, 188, 218, 155],
  [140, 150, 198, 155],
  [140, 107, 177, 155],
  [136, 65, 157, 155],
  [129, 15, 124, 155],
  [77, 0, 75, 155]
];
const earth = [
  [255, 247, 251, 155],
  [236, 226, 240, 155],
  [208, 209, 230, 155],
  [166, 189, 219, 155],
  [103, 169, 207, 155],
  [54, 144, 192, 155],
  [2, 129, 138, 155],
  [1, 108, 89, 155],
  [1, 70, 54, 155]
];
const ocean = [
  [255, 255, 217, 155],
  [237, 248, 177, 155],
  [199, 233, 180, 155],
  [127, 205, 187, 155],
  [65, 182, 196, 155],
  [29, 145, 192, 155],
  [34, 94, 168, 155],
  [37, 52, 148, 155],
  [8, 29, 88, 155]
];

// ColorBrewer - Diverging - 10-class RdYlBu
const earthquakeColorScheme = [
  [49, 54, 149, 155],
  [69, 117, 180, 155],
  [116, 173, 209, 155],
  [171, 217, 233, 155],
  [224, 243, 248, 155],
  [254, 224, 144, 155],
  [253, 174, 97, 155],
  [244, 109, 67, 155],
  [215, 48, 39, 155],
  [165, 0, 38, 155]
];

// ColorBrewer - Diverging - 10-class PRGn
const purpleGreenDivergent10 = [
  [64, 0, 75, 255],
  [118, 42, 131, 255],
  [153, 112, 171, 255],
  [194, 165, 207, 255],
  [231, 212, 232, 255],
  [217, 240, 211, 255],
  [166, 219, 160, 255],
  [90, 174, 97, 255],
  [27, 120, 55, 255],
  [0, 68, 27, 255]
];

// ColorBrewer - Diverging -  10-class RdBu
const redBlueDivergent10 = [
  [103, 0, 31, 255],
  [178, 24, 43, 255],
  [214, 96, 77, 255],
  [244, 165, 130, 255],
  [253, 219, 199, 255],
  [209, 229, 240, 255],
  [146, 197, 222, 255],
  [67, 147, 195, 255],
  [33, 102, 172, 255],
  [5, 48, 97, 255]
];

export const foundations = data => ({
  "Total Population": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-007-total-population",
    data: data.slide_data.features,
    scaleType: "equal",
    color: earth,
    getPropValue: f => f.properties.total_population,
    propName: "total_population"
  },
  "Median Household Income": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-018-median-household-income",
    data: data.slide_data.features,
    scaleType: "equal",
    color: space,
    getPropValue: f => f.properties.median_household_income,
    propName: "median_household_income"
  },
  "Median Gross Rent": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-019-median-gross-rent",
    data: data.slide_data.features,
    scaleType: "equal",
    color: planet,
    getPropValue: f => f.properties.Median_gross_rent,
    propName: "Median_gross_rent"
  },
  Evictions: {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-020-evictions",
    data: data.slide_data.features,
    scaleType: "equal",
    color: thermal,
    getPropValue: f => f.properties.evictions,
    propName: "evictions"
  },
  "Renter Occupied Households": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-021-renter-occupied-households",
    data: data.slide_data.features,
    scaleType: "equal",
    color: ocean,
    getPropValue: f => f.properties.renter_occupied_households,
    propName: "renter_occupied_households"
  },
  "Rent Burden": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-022-rent-burden",
    data: data.slide_data.features,
    scaleType: "equal",
    color: thermal,
    getPropValue: f => f.properties.rent_burden,
    propName: "rent_burden"
  },
  "Households with Children": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-024-households-children",
    data: data.slide_data.features,
    scaleType: "equal",
    color: space,
    getPropValue: f => f.properties.pc_household_with_children_under_18,
    propName: "pc_household_with_children_under_18"
  },
  "Households with Seniors": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-025-households-seniors",
    data: data.slide_data.features,
    scaleType: "equal",
    color: ocean,
    getPropValue: f => f.properties.pc_household_with_individuals_65_ovr,
    propName: "pc_household_with_individuals_65_ovr"
  },
  "Householders Living Alone": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-026-householders-living-alone",
    data: data.slide_data.features,
    scaleType: "equal",
    color: planet,
    getPropValue: f => f.properties.pc_householders_living_alone,
    propName: "pc_householders_living_alone"
  },
  "Owner Occupied Households": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-027-owner-occupied-households",
    data: data.slide_data.features,
    scaleType: "equal",
    color: space,
    getPropValue: f => f.properties.pc_owner_occupied_housing_units,
    propName: "pc_owner_occupied_housing_units"
  },
  "Percent Renter Occupied": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-028-percent-renter-occupied",
    data: data.slide_data.features,
    scaleType: "equal",
    color: thermal,
    getPropValue: f => f.properties.pctrenter_occupied,
    propName: "pctrenter_occupied"
  },
  "Shaking Intensity": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-029-shaking-intensity",
    data: data.slide_data.features,
    scaleType: "ordinal",
    color: [earthquakeColorScheme[7], earthquakeColorScheme[9]],
    propName: "pgv_site_mean_mmi_txt",
    categories: ["Very strong (VII)", "Severe (VIII)"]
  },
  "Wet Season Mean Deformation Intensity": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-030-wet-season-mean-deformation-intensity",
    data: data.slide_data.features,
    scaleType: "ordinal",
    color: [
      earthquakeColorScheme[5],
      earthquakeColorScheme[6],
      earthquakeColorScheme[7],
      earthquakeColorScheme[9]
    ],
    propName: "pgd_total_wet_mean_di",
    categories: ["Low", "Moderate", "High", "Very High"]
  },
  "Dry Season Mean Deformation Intensity": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-033-dry-season-mean-deformation-intensity",
    data: data.slide_data.features,
    scaleType: "ordinal",
    color: [earthquakeColorScheme[4], earthquakeColorScheme[5]],
    propName: "pgd_landslide_dry_mean_di",
    categories: ["None", "Low"]
  },
  "Census Reponse Rate": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-034-census-reponse-rate",
    data: data.slide_data.features,
    scaleType: "equal",
    color: thermal,
    getPropValue: f => f.properties.census_response_rate,
    propName: "census_response_rate"
  },
  "Voters 18 to 25": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-037-voters-18-25",
    data: data.slide_data.features,
    scaleType: "equal",
    color: earth,
    getPropValue: f => f.properties.pct_18_25,
    propName: "pct_18_25"
  },
  "Voters 26 to 32": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-038-voters-26-32",
    data: data.slide_data.features,
    scaleType: "equal",
    color: earth,
    getPropValue: f => f.properties.pct_26_32,
    propName: "pct_26_32"
  },
  "Voters 33 to 39": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-039-voters-33-39",
    data: data.slide_data.features,
    scaleType: "equal",
    color: earth,
    getPropValue: f => f.properties.pct_33_39,
    propName: "pct_33_39"
  },
  "Voters 40 to 49": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-040-voters-40-49",
    data: data.slide_data.features,
    scaleType: "equal",
    color: earth,
    getPropValue: f => f.properties.pct_40_49,
    propName: "pct_40_49"
  },
  "Voters 50 plus": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-041-voters-50-plus",
    data: data.slide_data.features,
    scaleType: "equal",
    color: earth,
    getPropValue: f => f.properties.pct_50_plus,
    propName: "pct_50_plus"
  },
  "Change in Ridership by Census Block": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-042-change-ridership",
    data: data.slide_data.features,
    opacity: 1,
    scaleType: "threshold",
    color: purpleGreenDivergent10,
    propName: "stops_pct_change",
    categories: [-100, -75, -50, -25, 0, 25, 50, 75, 100]
  },
  "Eviction Rate": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-043-eviction-rate",
    data: data.slide_data.features,
    scaleType: "equal",
    color: space,
    getPropValue: f => f.properties.eviction_rate,
    propName: "eviction_rate"
  },
  "Poverty Rate": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-044-poverty-rate",
    data: data.slide_data.features,
    scaleType: "equal",
    color: ocean,
    getPropValue: f => f.properties.poverty_rate,
    propName: "poverty_rate"
  },
  "Camp Reports": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-045-camp-reports",
    data: data.slide_data.features,
    scaleType: "equal",
    color: ocean,
    getPropValue: f => f.properties.count,
    propName: "count"
  }
});

// Slide 016 - points of interest
const poiIconMapping = {
  School: {
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  Hospital: {
    x: 250,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  BEECN: {
    x: 500,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  "Fire Station": {
    x: 0,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  },
  Pin: {
    x: 250,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  },
  COMMCTR: {
    x: 500,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  }
};

const poiIconZoomScale = zoom =>
  zoom > 11.5
    ? 5.5
    : zoom > 10.5
    ? 5
    : zoom > 9.5
    ? 4
    : zoom > 8.5
    ? 3
    : zoom > 7.5
    ? 2
    : 1;

const poiGetIconColor = f =>
  f.properties.type === "BEECN"
    ? [0, 0, 0, 255]
    : f.properties.type === "COMMCTR"
    ? [114, 29, 124, 255]
    : f.properties.type === "Fire Station"
    ? [220, 69, 86, 255]
    : f.properties.type === "School"
    ? [255, 178, 38, 255]
    : f.properties.type === "Hospital"
    ? [30, 98, 189, 255]
    : [0, 0, 0, 255];

// Slide 015 - Change in Ridership by Route
const divergingScale = scaleThreshold()
  .domain([-100, -75, -50, -25, 0, 25, 50, 75, 100])
  .range(purpleGreenDivergent10);

const ridershipRouteGetColor = f => {
  const value = f.properties.pct_change;
  return divergingScale(value);
};

export const slides = data => ({
  "bike parking": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-001-bike-parking",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [30, 98, 189, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-001-bike-parking",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.05,
      getColor: () => [30, 98, 189, 255],
      getRadius: () => 50,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [255, 178, 38, 200],
      parameters: { depthTest: false }
    }
  },
  "bike lanes": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-002-bike-lanes",
      data: data.slide_meta.boundary,
      opacity: 0,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [255, 178, 38, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-002-bike-lanes",
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: () => [255, 178, 38, 255],
      getPath: f => f.geometry.coordinates,
      getWidth: () => 15,
      rounded: false,
      autoHighlight: true,
      highlightColor: [0, 0, 0, 50]
    }
  },
  parks: {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-003-parks",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [25, 183, 170, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "SmallPolygonMap",
      id: "polygon-layer-slide-003-parks",
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: () => [25, 183, 170, 255],
      getLineWidth: () => 7.5,
      stroked: true,
      getFillColor: () => [25, 183, 170, 255],
      filled: true,
      autoHighlight: true,
      highlightColor: [25, 183, 170, 25]
    }
  },
  "multi-use trails": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-004-multi-use-trails",
      data: data.slide_meta.boundary,
      opacity: 0,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [220, 69, 86, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-004-multi-use-trails",
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: () => [220, 69, 86, 255],
      getPath: f => f.geometry.coordinates,
      getWidth: () => 15,
      rounded: false,
      autoHighlight: true,
      highlightColor: [0, 0, 0, 50]
    }
  },
  "community gardens": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-005-community-gardens",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [25, 183, 170, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "SmallPolygonMap",
      id: "polygon-layer-slide-005-community-gardens",
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: () => [25, 183, 170, 255],
      getLineWidth: () => 5,
      stroked: true,
      getFillColor: () => [25, 183, 170, 255],
      filled: true,
      autoHighlight: true,
      highlightColor: [25, 183, 170, 25]
    }
  },
  "bike greenways": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-008-bike-greenways",
      data: data.slide_meta.boundary,
      opacity: 0,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [25, 183, 170, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-008-bike-greenways",
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: () => [25, 183, 170, 255],
      getPath: f => f.geometry.coordinates,
      getWidth: () => 15,
      rounded: false,
      autoHighlight: true,
      highlightColor: [0, 0, 0, 50]
    }
  },
  "rail stops": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-009-rail-stops",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [114, 29, 124, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-009-rail-stops",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: () => [114, 29, 124, 255],
      getRadius: () => 40,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100],
      parameters: { depthTest: false }
    }
  },
  "grocery stores": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-010-grocery-stores",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [255, 178, 38, 255],
      getLineWidth: () => 100,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-010-grocery-stores",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: () => [255, 178, 38, 255],
      getRadius: () => 100,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [220, 69, 86, 200],
      parameters: { depthTest: false }
    }
  },
  demolitions: {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-011-demolitions",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [220, 69, 86, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-011-demolitions",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: () => [220, 69, 86, 255],
      getRadius: () => 100,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [255, 178, 38, 200],
      parameters: { depthTest: false }
    }
  },
  "camp sweeps": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-012-camps-sweeps",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [30, 98, 189, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-012-camps-sweeps",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.75,
      getColor: () => [30, 98, 189, 255],
      getRadius: () => 100,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [255, 178, 38, 200],
      parameters: { depthTest: false }
    }
  },
  "camp reports": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-013-camp-reports",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [114, 29, 124, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-013-camp-reports",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.1,
      getColor: () => [114, 29, 124, 255],
      getRadius: () => 100,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [255, 178, 38, 200],
      parameters: { depthTest: false }
    }
  },
  "bus stops": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-014-bus-stops",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [30, 98, 189, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-014-bus-stops",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: () => [30, 98, 189, 255],
      getRadius: () => 40,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100],
      parameters: { depthTest: false }
    }
  },
  "Change in Ridership by Route": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-015-change-ridership-route",
      data: data.slide_meta.boundary,
      opacity: 0,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [0, 0, 0, 0],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-015-change-ridership-route",
      pickable: true,
      data: data.slide_data.features,
      opacity: 0.7,
      getColor: ridershipRouteGetColor,
      getPath: f => f.geometry.coordinates,
      getWidth: () => 20,
      rounded: true,
      autoHighlight: true,
      highlightColor: [255, 178, 38, 200]
    }
  },
  "points of interest": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-016-poi",
      data: data.slide_meta.boundary,
      opacity: 0,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [0, 0, 0, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "IconMap",
      id: "icon-layer-slide-016-poi",
      pickable: true,
      data: data.slide_data.features,
      opacity: 0.75,
      iconAtlas: "https://i.imgur.com/xgTAROe.png",
      iconMapping: poiIconMapping,
      sizeScale: poiIconZoomScale,
      getPosition: f => (f.geometry === null ? [0, 0] : f.geometry.coordinates),
      getIcon: f => f.properties.type,
      getSize: () => 11,
      getColor: poiGetIconColor,
      autoHighlight: false,
      highlightColor: [0, 0, 0, 0]
    }
  },
  "Building Permits": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-017-building-permits",
      data: data.slide_meta.boundary,
      opacity: 0,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [0, 0, 0, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScreenGridMap",
      id: "screengrid-layer-slide-017-building-permits",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.75,
      colorRange: earth,
      cellSizePixels: 35,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 100]
    }
  },
  "Safety Hotline": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-031-safety-hotline",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [30, 98, 189, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-031-safety-hotline",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.15,
      getColor: () => [30, 98, 189, 255],
      getRadius: () => 30,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [255, 178, 38, 200],
      parameters: { depthTest: false }
    }
  },
  Crashes: {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-032-crashes",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [220, 69, 86, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-032-crashes",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.15,
      getColor: () => [220, 69, 86, 255],
      getRadius: () => 30,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [255, 178, 38, 200],
      parameters: { depthTest: false }
    }
  },
  "Bike Counts": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-035-bike-counts",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [220, 69, 86, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-035-bike-counts",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => (f.geometry === null ? [0, 0] : f.geometry.coordinates),
      opacity: 0.6,
      getColor: () => [220, 69, 86, 255],
      getRadius: f => Math.sqrt(f.properties.year_2017 / Math.PI) * 10,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [255, 178, 38, 200],
      parameters: { depthTest: false }
    }
  },
  "Bike Estimates": {
    boundary: {
      mapType: "PolygonPlotMap",
      id: "boundary-layer-slide-036-bike-estimates",
      data: data.slide_meta.boundary,
      opacity: 1,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: () => [114, 29, 124, 255],
      getLineWidth: () => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-036-bike-estimates",
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => (f.geometry === null ? [0, 0] : f.geometry.coordinates),
      opacity: 0.3,
      getColor: () => [114, 29, 124, 255],
      getRadius: f => Math.sqrt(f.properties.year_2016 / Math.PI) * 10,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [255, 178, 38, 200],
      parameters: { depthTest: false }
    }
  }
});
