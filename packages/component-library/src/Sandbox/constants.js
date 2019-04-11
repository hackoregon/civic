/* TODO: Fix linting errors */
/* eslint-disable */
import * as d3 from "d3";

/* COLOR SCHEME OPTIONS */
const thermal = [
  [255, 255, 204, 255],
  [255, 237, 160, 255],
  [254, 217, 118, 255],
  [254, 178, 76, 255],
  [253, 141, 60, 255],
  [252, 78, 42, 255],
  [227, 26, 28, 255],
  [189, 0, 38, 255],
  [128, 0, 38, 255]
];

const planet = [
  [247, 244, 249, 255],
  [231, 225, 239, 255],
  [212, 185, 218, 255],
  [201, 148, 199, 255],
  [223, 101, 176, 255],
  [231, 41, 138, 255],
  [206, 18, 86, 255],
  [152, 0, 67, 255],
  [103, 0, 31, 255]
];
const space = [
  [247, 252, 253, 255],
  [224, 236, 244, 255],
  [191, 211, 230, 255],
  [158, 188, 218, 255],
  [140, 150, 198, 255],
  [140, 107, 177, 255],
  [136, 65, 157, 255],
  [129, 15, 124, 255],
  [77, 0, 75, 255]
];
const earth = [
  [255, 247, 251, 255],
  [236, 226, 240, 255],
  [208, 209, 230, 255],
  [166, 189, 219, 255],
  [103, 169, 207, 255],
  [54, 144, 192, 255],
  [2, 129, 138, 255],
  [1, 108, 89, 255],
  [1, 70, 54, 255]
];
const ocean = [
  [255, 255, 217, 255],
  [237, 248, 177, 255],
  [199, 233, 180, 255],
  [127, 205, 187, 255],
  [65, 182, 196, 255],
  [29, 145, 192, 255],
  [34, 94, 168, 255],
  [37, 52, 148, 255],
  [8, 29, 88, 255]
];
const purpleGreenDivergent = [
  [115, 41, 125, 255],
  [149, 86, 156, 255],
  [181, 139, 186, 255],
  [214, 193, 217, 255],
  [215, 215, 215, 255],
  [192, 227, 213, 255],
  [135, 205, 179, 255],
  [77, 184, 144, 255],
  [18, 164, 110, 255]
];

// ColorBrewer - Diverging - 10-class RdYlBu
const earthquakeColorScheme = [
  [49, 54, 149, 255],
  [69, 117, 180, 255],
  [116, 173, 209, 255],
  [171, 217, 233, 255],
  [224, 243, 248, 255],
  [254, 224, 144, 255],
  [253, 174, 97, 255],
  [244, 109, 67, 255],
  [215, 48, 39, 255],
  [165, 0, 38, 255]
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
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: earth,
    getPropValue: f => parseFloat(f.properties.total_population),
    propName: "total_population",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Median Household Income": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-018-median-household-income",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: space,
    getPropValue: f => parseFloat(f.properties.median_household_income),
    propName: "median_household_income",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Median Gross Rent": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-019-median-gross-rent",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: planet,
    getPropValue: f => parseFloat(f.properties.Median_gross_rent),
    propName: "Median_gross_rent",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  Evictions: {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-020-evictions",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: thermal,
    getPropValue: f => parseFloat(f.properties.evictions),
    propName: "evictions",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Renter Occupied Households": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-021-renter-occupied-households",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: ocean,
    getPropValue: f => parseFloat(f.properties.renter_occupied_households),
    propName: "renter_occupied_households",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Rent Burden": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-022-rent-burden",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: thermal,
    getPropValue: f => parseFloat(f.properties.rent_burden),
    propName: "rent_burden",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Households with Children": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-024-households-children",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: space,
    getPropValue: f => f.properties.pc_household_with_children_under_18,
    propName: "pc_household_with_children_under_18",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Households with Seniors": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-025-households-seniors",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: ocean,
    getPropValue: f =>
      parseFloat(f.properties.pc_household_with_individuals_65_ovr),
    propName: "pc_household_with_individuals_65_ovr",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Householders Living Alone": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-026-householders-living-alone",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: planet,
    getPropValue: f => parseFloat(f.properties.pc_householders_living_alone),
    propName: "pc_householders_living_alone",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Owner Occupied Households": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-027-owner-occupied-households",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: space,
    getPropValue: f => parseFloat(f.properties.pc_owner_occupied_housing_units),
    propName: "pc_owner_occupied_housing_units",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Percent Renter Occupied": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-028-percent-renter-occupied",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: thermal,
    getPropValue: f => parseFloat(f.properties.pctrenter_occupied),
    propName: "pctrenter_occupied",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Shaking Intensity": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-029-shaking-intensity",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "ordinal",
    color: [earthquakeColorScheme[7], earthquakeColorScheme[9]],
    propName: "pgv_site_mean_mmi_txt",
    categories: ["Very strong (VII)", "Severe (VIII)"],
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Wet Season Mean Deformation Intensity": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-030-wet-season-mean-deformation-intensity",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "ordinal",
    color: [
      earthquakeColorScheme[5],
      earthquakeColorScheme[6],
      earthquakeColorScheme[7],
      earthquakeColorScheme[9]
    ],
    propName: "pgd_total_wet_mean_di",
    categories: ["Low", "Moderate", "High", "Very High"],
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Dry Season Mean Deformation Intensity": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-033-dry-season-mean-deformation-intensity",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "ordinal",
    color: [earthquakeColorScheme[4], earthquakeColorScheme[5]],
    propName: "pgd_landslide_dry_mean_di",
    categories: ["None", "Low"],
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Census Reponse Rate": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-034-census-reponse-rate",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: thermal,
    getPropValue: f => parseFloat(f.properties.census_response_rate),
    propName: "census_response_rate",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Voters 18 to 25": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-037-voters-18-25",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: earth,
    getPropValue: f => parseFloat(f.properties.pct_18_25),
    propName: "pct_18_25",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Voters 26 to 32": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-038-voters-26-32",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: earth,
    getPropValue: f => parseFloat(f.properties.pct_26_32),
    propName: "pct_26_32",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Voters 33 to 39": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-039-voters-33-39",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: earth,
    getPropValue: f => parseFloat(f.properties.pct_33_39),
    propName: "pct_33_39",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100]
  },
  "Voters 40 to 49": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-040-voters-40-49",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: earth,
    getPropValue: f => parseFloat(f.properties.pct_40_49),
    propName: "pct_40_49",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Voters 50 plus": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-041-voters-50-plus",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: earth,
    getPropValue: f => parseFloat(f.properties.pct_50_plus),
    propName: "pct_50_plus",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Change in Ridership by Census Block": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-042-change-ridership",
    pickable: true,
    data: data.slide_data.features,
    opacity: 1,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "threshold",
    color: purpleGreenDivergent10,
    propName: "stops_pct_change",
    categories: [-100, -75, -50, -25, 0, 25, 50, 75, 100],
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Eviction Rate": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-043-eviction-rate",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 122, 122, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: space,
    getPropValue: f => parseFloat(f.properties.eviction_rate),
    propName: "eviction_rate",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Poverty Rate": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-044-poverty-rate",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 112, 112, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: ocean,
    getPropValue: f => parseFloat(f.properties.poverty_rate),
    propName: "poverty_rate",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
  },
  "Camp Reports": {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-045-camp-reports",
    pickable: true,
    data: data.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [112, 112, 112, 255],
    getLineWidth: f => 0.2,
    stroked: true,
    scaleType: "equal",
    color: ocean,
    getPropValue: f => parseFloat(f.properties.count),
    propName: "count",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 100],
    onLayerClick: f => console.log(f)
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
    ? 10
    : zoom > 10.5
    ? 8
    : zoom > 9.5
    ? 6
    : zoom > 8.5
    ? 4
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
const divergingScale = d3
  .scaleThreshold()
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
      getLineColor: f => [30, 98, 189, 255],
      getLineWidth: f => 45,
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
      getColor: f => [30, 98, 189, 255],
      getRadius: f => 50,
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
      getLineColor: f => [255, 178, 38, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-002-bike-lanes",
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: f => [255, 178, 38, 255],
      getPath: f => f.geometry.coordinates,
      getWidth: f => 15,
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
      getLineColor: f => [25, 183, 170, 255],
      getLineWidth: f => 45,
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
      getLineColor: f => [25, 183, 170, 255],
      getLineWidth: f => 7.5,
      stroked: true,
      getFillColor: f => [25, 183, 170, 255],
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
      getLineColor: f => [220, 69, 86, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-004-multi-use-trails",
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: f => [220, 69, 86, 255],
      getPath: f => f.geometry.coordinates,
      getWidth: f => 15,
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
      getLineColor: f => [25, 183, 170, 255],
      getLineWidth: f => 45,
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
      getLineColor: f => [25, 183, 170, 255],
      getLineWidth: f => 5,
      stroked: true,
      getFillColor: f => [25, 183, 170, 255],
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
      getLineColor: f => [25, 183, 170, 255],
      getLineWidth: f => 45,
      lineWidthScale: 1,
      lineJointRounded: false
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-008-bike-greenways",
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: f => [25, 183, 170, 255],
      getPath: f => f.geometry.coordinates,
      getWidth: f => 15,
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
      getLineColor: f => [114, 29, 124, 255],
      getLineWidth: f => 45,
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
      getColor: f => [114, 29, 124, 255],
      getRadius: f => 40,
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
      getLineColor: f => [255, 178, 38, 255],
      getLineWidth: f => 100,
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
      getColor: f => [255, 178, 38, 255],
      getRadius: f => 100,
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
      getLineColor: f => [220, 69, 86, 255],
      getLineWidth: f => 45,
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
      getColor: f => [220, 69, 86, 255],
      getRadius: f => 100,
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
      getLineColor: f => [30, 98, 189, 255],
      getLineWidth: f => 45,
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
      getColor: f => [30, 98, 189, 255],
      getRadius: f => 100,
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
      getLineColor: f => [114, 29, 124, 255],
      getLineWidth: f => 45,
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
      getColor: f => [114, 29, 124, 255],
      getRadius: f => 100,
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
      getLineColor: f => [30, 98, 189, 255],
      getLineWidth: f => 45,
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
      getColor: f => [30, 98, 189, 255],
      getRadius: f => 40,
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
      getLineColor: f => [0, 0, 0, 0],
      getLineWidth: f => 45,
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
      getWidth: f => 20,
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
      getLineColor: f => [0, 0, 0, 255],
      getLineWidth: f => 45,
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
      getSize: f => 11,
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
      getLineColor: f => [0, 0, 0, 255],
      getLineWidth: f => 45,
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
      getLineColor: f => [30, 98, 189, 255],
      getLineWidth: f => 45,
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
      getColor: f => [30, 98, 189, 255],
      getRadius: f => 30,
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
      getLineColor: f => [220, 69, 86, 255],
      getLineWidth: f => 45,
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
      getColor: f => [220, 69, 86, 255],
      getRadius: f => 30,
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
      getLineColor: f => [220, 69, 86, 255],
      getLineWidth: f => 45,
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
      getColor: f => [220, 69, 86, 255],
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
      getLineColor: f => [114, 29, 124, 255],
      getLineWidth: f => 45,
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
      getColor: f => [114, 29, 124, 255],
      getRadius: f => Math.sqrt(f.properties.year_2016 / Math.PI) * 10,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      highlightColor: [255, 178, 38, 200],
      parameters: { depthTest: false }
    }
  }
});
