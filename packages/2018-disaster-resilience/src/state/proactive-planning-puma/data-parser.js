import { civicFormat } from "@hackoregon/component-library/dist/utils";

const extractProperties = features =>
  features.map(feature => feature.properties);

const processFeatures = features =>
  features.map(nbhd => ({
    displaced_percap: parseFloat(nbhd.displaced_percap),
    census_response_rate: (100 - parseFloat(nbhd.census_response_rate)) / 100,
    total_population: parseFloat(nbhd.total_population),
    quadrant: nbhd.quadrant,
    resilienceLabel: `${civicFormat.titleCase(
      nbhd.name
    )} • Census Non-Response Rate`,
    displacementLabel: "Displacement"
  }));

const getProactivePlanningData = ({ features }) =>
  processFeatures(extractProperties(features)).filter(
    nbhd => nbhd.total_population > 0
  );

export default getProactivePlanningData;
