import { scaleThreshold } from "d3";

/* COLOR SCHEME OPTIONS */
const thermal = [
  [255, 255, 204, 200],
  [255, 237, 160, 200],
  [254, 217, 118, 200],
  [254, 178, 76, 200],
  [253, 141, 60, 200],
  [252, 78, 42, 200],
  [227, 26, 28, 200],
  [189, 0, 38, 200],
  [128, 0, 38, 200]
];

const planet = [
  [247, 244, 249, 200],
  [231, 225, 239, 200],
  [212, 185, 218, 200],
  [201, 148, 199, 200],
  [223, 101, 176, 200],
  [231, 41, 138, 200],
  [206, 18, 86, 200],
  [152, 0, 67, 200],
  [103, 0, 31, 200]
];
const space = [
  [247, 252, 253, 200],
  [224, 236, 244, 200],
  [191, 211, 230, 200],
  [158, 188, 218, 200],
  [140, 150, 198, 200],
  [140, 107, 177, 200],
  [136, 65, 157, 200],
  [129, 15, 124, 200],
  [77, 0, 75, 200]
];
const earth = [
  [255, 247, 251, 200],
  [236, 226, 240, 200],
  [208, 209, 230, 200],
  [166, 189, 219, 200],
  [103, 169, 207, 200],
  [54, 144, 192, 200],
  [2, 129, 138, 200],
  [1, 108, 89, 200],
  [1, 70, 54, 200]
];
const ocean = [
  [255, 255, 217, 200],
  [237, 248, 177, 200],
  [199, 233, 180, 200],
  [127, 205, 187, 200],
  [65, 182, 196, 200],
  [29, 145, 192, 200],
  [34, 94, 168, 200],
  [37, 52, 148, 200],
  [8, 29, 88, 200]
];

// ColorBrewer - Diverging - 10-class RdYlBu
const earthquakeColorScheme = [
  [49, 54, 149, 200],
  [69, 117, 180, 200],
  [116, 173, 209, 200],
  [171, 217, 233, 200],
  [224, 243, 248, 200],
  [254, 224, 144, 200],
  [253, 174, 97, 200],
  [244, 109, 67, 200],
  [215, 48, 39, 200],
  [165, 0, 38, 200]
];

// ColorBrewer - Diverging - 10-class PRGn
const purpleGreenDivergent10 = [
  [64, 0, 75, 200],
  [118, 42, 131, 200],
  [153, 112, 171, 200],
  [194, 165, 207, 200],
  [231, 212, 232, 200],
  [217, 240, 211, 200],
  [166, 219, 160, 200],
  [90, 174, 97, 200],
  [27, 120, 55, 200],
  [0, 68, 27, 200]
];

const civicBlue = [30, 98, 189, 255];
const civicGreen = [25, 183, 170, 255];
const civicPurple = [114, 29, 124, 255];
const civicPink = [220, 69, 86, 255];
const civicYellow = [255, 178, 38, 255];

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
    ? civicPurple
    : f.properties.type === "Fire Station"
    ? civicPink
    : f.properties.type === "School"
    ? civicYellow
    : f.properties.type === "Hospital"
    ? civicBlue
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
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-001-bike-parking",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicBlue,
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-001-bike-parking",
      data: data.slide_data.features,
      getFillColor: () => civicBlue,
      getLineColor: () => civicBlue,
      getRadius: () => 50
    }
  },
  "bike lanes": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-002-bike-lanes",
      data: data.slide_meta.boundary,
      opacity: 0,
      getLineColor: () => civicYellow,
      getLineWidth: () => 45
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-002-bike-lanes",
      data: data.slide_data.features,
      getColor: () => civicYellow,
      getWidth: () => 25
    }
  },
  parks: {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-003-parks",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicGreen,
      getLineWidth: () => 45
    },
    map: {
      mapType: "SmallPolygonMap",
      id: "polygon-layer-slide-003-parks",
      data: data.slide_data.features,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: () => civicGreen,
      getLineWidth: () => 7.5,
      getFillColor: () => civicGreen
    }
  },
  "multi-use trails": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-004-multi-use-trails",
      data: data.slide_meta.boundary,
      opacity: 0,
      getLineColor: () => civicPink,
      getLineWidth: () => 45
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-004-multi-use-trails",
      data: data.slide_data.features,
      getColor: () => civicPink,
      getWidth: () => 25
    }
  },
  "community gardens": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-005-community-gardens",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicGreen,
      getLineWidth: () => 45
    },
    map: {
      mapType: "SmallPolygonMap",
      id: "polygon-layer-slide-005-community-gardens",
      data: data.slide_data.features,
      getLineColor: () => civicGreen,
      getLineWidth: () => 5,
      getFillColor: () => civicGreen
    }
  },
  "bike greenways": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-008-bike-greenways",
      data: data.slide_meta.boundary,
      opacity: 0,
      getLineColor: () => civicGreen,
      getLineWidth: () => 45
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-008-bike-greenways",
      data: data.slide_data.features,
      getColor: () => civicGreen,
      getWidth: () => 25
    }
  },
  "rail stops": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-009-rail-stops",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicPurple,
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-009-rail-stops",
      data: data.slide_data.features,
      getFillColor: () => civicPurple,
      getLineColor: () => civicPurple,
      getRadius: () => 40
    }
  },
  "grocery stores": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-010-grocery-stores",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicYellow,
      getLineWidth: () => 100
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-010-grocery-stores",
      data: data.slide_data.features,
      getFillColor: () => civicYellow,
      getLineColor: () => civicYellow,
      getRadius: () => 100,
      highlightColor: [255, 140, 0, 155]
    }
  },
  demolitions: {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-011-demolitions",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicPink,
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-011-demolitions",
      data: data.slide_data.features,
      getFillColor: () => civicPink,
      getLineColor: () => civicPink,
      getRadius: () => 100
    }
  },
  "camp sweeps": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-012-camps-sweeps",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicBlue,
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-012-camps-sweeps",
      data: data.slide_data.features,
      getFillColor: () => civicBlue,
      getLineColor: () => civicBlue,
      getRadius: () => 100
    }
  },
  "camp reports": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-013-camp-reports",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicPurple,
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-013-camp-reports",
      data: data.slide_data.features,
      opacity: 0.1,
      getFillColor: () => civicPurple,
      getLineColor: () => civicPurple,
      getRadius: () => 100
    }
  },
  "bus stops": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-014-bus-stops",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicBlue,
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-014-bus-stops",
      data: data.slide_data.features,
      getFillColor: () => civicBlue,
      getLineColor: () => civicBlue,
      getRadius: () => 40
    }
  },
  "Change in Ridership by Route": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-015-change-ridership-route",
      data: data.slide_meta.boundary,
      opacity: 0,
      getLineColor: () => [0, 0, 0, 0],
      getLineWidth: () => 45
    },
    map: {
      mapType: "PathMap",
      id: "path-layer-slide-015-change-ridership-route",
      data: data.slide_data.features,
      opacity: 0.8,
      getColor: ridershipRouteGetColor,
      getWidth: () => 25,
      rounded: true
    }
  },
  "points of interest": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-016-poi",
      data: data.slide_meta.boundary,
      opacity: 0,
      getLineColor: () => [0, 0, 0, 255],
      getLineWidth: () => 45
    },
    map: {
      mapType: "IconMap",
      id: "icon-layer-slide-016-poi",
      data: data.slide_data.features,
      opacity: 0.75,
      iconAtlas: "https://i.imgur.com/xgTAROe.png",
      iconMapping: poiIconMapping,
      sizeScale: poiIconZoomScale,
      getPosition: f => (f.geometry === null ? [0, 0] : f.geometry.coordinates),
      getIcon: f => f.properties.type,
      getSize: () => 11,
      getColor: poiGetIconColor
    }
  },
  "Building Permits": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-017-building-permits",
      data: data.slide_meta.boundary,
      opacity: 0,
      getLineColor: () => [0, 0, 0, 255],
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScreenGridMap",
      id: "screengrid-layer-slide-017-building-permits",
      data: data.slide_data.features,
      opacity: 0.75,
      colorRange: earth,
      cellSizePixels: 35
    }
  },
  "Safety Hotline": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-031-safety-hotline",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicBlue,
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-031-safety-hotline",
      data: data.slide_data.features,
      opacity: 0.15,
      getFillColor: () => civicBlue,
      getLineColor: () => civicBlue,
      getRadius: () => 30
    }
  },
  Crashes: {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-032-crashes",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicPink,
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-032-crashes",
      data: data.slide_data.features,
      opacity: 0.15,
      getFillColor: () => civicPink,
      getLineColor: () => civicPink,
      getRadius: () => 30
    }
  },
  "Bike Counts": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-035-bike-counts",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicPink,
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-035-bike-counts",
      data: data.slide_data.features,
      getPosition: f => (f.geometry === null ? [0, 0] : f.geometry.coordinates),
      opacity: 0.6,
      getFillColor: () => civicPink,
      getLineColor: () => civicPink,
      getRadius: f => Math.sqrt(f.properties.year_2017 / Math.PI) * 10
    }
  },
  "Bike Estimates": {
    boundary: {
      mapType: "BoundaryMap",
      id: "boundary-layer-slide-036-bike-estimates",
      data: data.slide_meta.boundary,
      opacity: 1,
      getLineColor: () => civicPurple,
      getLineWidth: () => 45
    },
    map: {
      mapType: "ScatterPlotMap",
      id: "scatterplot-layer-slide-036-bike-estimates",
      data: data.slide_data.features,
      getPosition: f => (f.geometry === null ? [0, 0] : f.geometry.coordinates),
      opacity: 0.3,
      getFillColor: () => civicPurple,
      getLineColor: () => civicPurple,
      getRadius: f => Math.sqrt(f.properties.year_2016 / Math.PI) * 10
    }
  }
});
