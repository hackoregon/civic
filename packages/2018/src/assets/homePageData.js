import { titleCase } from '@hackoregon/component-library/src/utils/formatters';
import { ungroupBy } from '@hackoregon/component-library/src/utils/dataHelpers';
import { disasterData } from './disasterData';
import { housingData } from './housingData';
import { transportationData } from './transportationData';
import { electionData } from './electionData';
import { educationData } from './educationData';

const CHARTB_CATEGORIES = [
  'black',
  'hispanic',
  'multi_ethnic',
  'native',
  'pacific',
];
const CHARTB_LABELS = [
  'Black/African American',
  'Hispanic/Latino',
  'Multi-Ethnic',
  'American Indian/Alaska Native',
  'Native Hawaiian/Pacific Islander',
];

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

const formatRidershipOverTimeData = data =>
  data
    .map(yearObj => ({
      type: 'Weekday',
      year: yearObj.year,
      ons: yearObj.weekday_sum_ons,
    }))
    .concat(
      data.map(yearObj => ({
        type: 'Saturday',
        year: yearObj.year,
        ons: yearObj.saturday_sum_ons,
      }))
    )
    .concat(
      data.map(yearObj => ({
        type: 'Sunday',
        year: yearObj.year,
        ons: yearObj.sunday_sum_ons,
      }))
    );

function compareNumbers(a, b) {
  return b - a;
}

const calcStudents = (numpct, enrollment) => ((numpct && enrollment) ? (numpct * enrollment) / 100 : 0);

const calculateStudents = school => school.map(d => ({
  year: d.year,
  asian: calcStudents(d.enroll_asian, d.enroll_current),
  black: calcStudents(d.enroll_black, d.enroll_current),
  hispanic: calcStudents(d.enroll_hispanic, d.enroll_current),
  multi_ethnic: calcStudents(d.enroll_multi_ethnic, d.enroll_current),
  native: calcStudents(d.enroll_native, d.enroll_current),
  pacific: calcStudents(d.enroll_pacific, d.enroll_current),
  white: calcStudents(d.enroll_white, d.enroll_current),
  underrepresented: calcStudents(100, d.enroll_current) - (calcStudents(d.enroll_white, d.enroll_current) + calcStudents(d.enroll_asian, d.enroll_current)),
}));

export const magnitudeOfUrbanCampsiteSweeps = formatData(homelessnessData);
export const proactivePlanning = disasterData;
export const chartData = getChartData(housingData);
export const selectedCityRank = getSelectedCityRank(housingData);
export const ridershipData = formatRidershipOverTimeData(transportationData);
export const electionsData = electionData.sort(compareNumbers);
export const processedSchoolData = ungroupBy(calculateStudents(educationData), CHARTB_CATEGORIES, CHARTB_LABELS);

