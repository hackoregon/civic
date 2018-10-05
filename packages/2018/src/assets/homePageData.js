import { titleCase } from '@hackoregon/component-library/src/utils/formatters';
import { disasterData } from './disasterData';
import { housingData } from './housingData';

const homelessnessData = [
  { count: 12, report_time: '2016-10-01T00:00:00Z' },
  { count: 19, report_time: '2016-11-01T00:00:00Z' },
  { count: 19, report_time: '2016-12-01T00:00:00Z' },
  { count: 16, report_time: '2017-01-01T00:00:00Z' },
  { count: 23, report_time: '2017-02-01T00:00:00Z' },
  { count: 27, report_time: '2017-03-01T00:00:00Z' },
  { count: 40, report_time: '2017-04-01T00:00:00Z' },
  { count: 60, report_time: '2017-05-01T00:00:00Z' },
  { count: 75, report_time: '2017-06-01T00:00:00Z' },
  { count: 114, report_time: '2017-07-01T00:00:00Z' },
  { count: 156, report_time: '2017-08-01T00:00:00Z' },
  { count: 183, report_time: '2017-09-01T00:00:00Z' },
  { count: 311, report_time: '2017-10-01T00:00:00Z' },
  { count: 237, report_time: '2017-11-01T00:00:00Z' },
  { count: 131, report_time: '2017-12-01T00:00:00Z' },
  { count: 149, report_time: '2018-01-01T00:00:00Z' },
  { count: 133, report_time: '2018-02-01T00:00:00Z' },
  { count: 227, report_time: '2018-03-01T00:00:00Z' },
  { count: 198, report_time: '2018-04-01T00:00:00Z' },
  { count: 112, report_time: '2018-05-01T00:00:00Z' },
];

const formatData = arr =>
  arr.map(obj => ({
    date: new Date(obj.report_time),
    count: obj.count,
  }));

const processData = data =>
  data &&
  data.length &&
  data.map(nbhd => ({
    displaced_percap: parseFloat(nbhd.properties.displaced_percap),
    census_response_rate:
      (100 - parseFloat(nbhd.properties.census_response_rate)) / 100,
    total_population: parseFloat(nbhd.properties.total_population),
    quadrant: nbhd.properties.quadrant,
    resilienceLabel:
      titleCase(nbhd.properties.name) + ' • Census Non-Response Rate',
    displacementLabel: 'Displacement',
  }));

const getChartData = data => {
  if (!data) return;

  const _ = { value: 0 };

  const severeBurden = +(
    data.find(
      d => d.datatype === 'Severely Burdened Renters, Share of All Households'
    ) || _
  ).value;
  const moderateBurden = +(
    data.find(
      d => d.datatype === 'Moderately Burdened Renters, Share of All Households'
    ) || _
  ).value;
  const noBurden = 100 - severeBurden - moderateBurden;

  return [
    { label: 'Severe', value: severeBurden },
    { label: 'Moderate', value: moderateBurden },
    { label: 'None', value: noBurden },
  ];
};

const rankKey = 'Total Burdened Renters, Share of All Households';

const getSelectedCityRank = data => {
  const datum = data && data.find(d => d.datatype === rankKey);
  return datum
    ? {
        rank: datum.rank,
        total: datum.total,
      }
    : {};
};

export const magnitudeOfUrbanCampsiteSweeps = formatData(homelessnessData);
export const proactivePlanning = processData(disasterData);
export const chartData = getChartData(housingData);
export const selectedCityRank = getSelectedCityRank(housingData);

