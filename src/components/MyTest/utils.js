import * as d3 from 'd3';

// constants
export const width = 800;
export const height = 400;
export const center = { x: width / 1.25, y: height / 2 };
export const min = 1;
export const max = 10;
export const step = 1;
export const style = { width: 800, margin: 'auto', padding: 20, justifyContent: 'center' };
export const marks = {
  1: '2007',
  2: '2008',
  3: '2009',
  4: '2010',
  5: '2011',
  6: '2012',
  7: '2013',
  8: '2014',
  9: '2015',
  10: '2016',
};

// Bubble Data
export const bubbleData = [
  { 2007: [
    { bureau_title: 'Bureau of Environmental Services',
      id: 1,
      total_amount: 7468965,
      color: '#b2df8a',
      percentage: '5% of Total Budget' },
    { bureau_title: 'City Budget Office',
      id: 2,
      total_amount: 115497,
      color: '#b2df8a',
      percentage: '10% of Total Budget' },
    { bureau_title: 'Office of Management & Finance',
      id: 3,
      total_amount: 8398624,
      color: '#fb9a99',
      percentage: '20% of Total Budget' },
  ] },
  { 2008: [
    { bureau_title: 'Office of the Mayor',
      id: 4,
      total_amount: 592962,
      color: '#fb9a99',
      percentage: '5% of Total Budget' },
    { bureau_title: 'Portland Bureau of Transportation',
      id: 5,
      total_amount: 57546789,
      color: '#fdbf6f',
      percentage: '20% of Total Budget' },
    { bureau_title: 'Portland Housing Bureau',
      id: 6,
      total_amount: 11639339,
      color: '#fdbf6f',
      percentage: '10% of Total Budget' },
  ] },
  { 2009: [
    { bureau_title: 'Portland Parks & Recreation',
      id: 7,
      total_amount: 21829002,
      color: '#fdbf6f',
      percentage: '5% of Total Budget' },
    { bureau_title: 'Portland Police Bureau',
      id: 8,
      total_amount: 2954388,
      color: '#cab2d6',
      percentage: '5% of Total Budget' },
    { bureau_title: 'Portland Water Bureau',
      id: 9,
      total_amount: 1585195,
      color: '#cab2d6',
      percentage: '10% of Total Budget' },
  ] },
  { 2010: [
    { bureau_title: 'Bureau of Environmental Services',
      id: 1,
      total_amount: 7468965,
      color: '#b2df8a',
      percentage: '5% of Total Budget' },
    { bureau_title: 'City Budget Office',
      id: 2,
      total_amount: 115497,
      color: '#b2df8a',
      percentage: '10% of Total Budget' },
    { bureau_title: 'Office of Management & Finance',
      id: 3,
      total_amount: 8398624,
      color: '#fb9a99',
      percentage: '20% of Total Budget' },
  ] },
  { 2011: [
    { bureau_title: 'Office of the Mayor',
      id: 4,
      total_amount: 592962,
      color: '#fb9a99',
      percentage: '5% of Total Budget' },
    { bureau_title: 'Portland Bureau of Transportation',
      id: 5,
      total_amount: 57546789,
      color: '#fdbf6f',
      percentage: '20% of Total Budget' },
    { bureau_title: 'Portland Housing Bureau',
      id: 6,
      total_amount: 11639339,
      color: '#fdbf6f',
      percentage: '10% of Total Budget' },
  ] },
  { 2012: [
    { bureau_title: 'Portland Parks & Recreation',
      id: 7,
      total_amount: 21829002,
      color: '#fdbf6f',
      percentage: '5% of Total Budget' },
    { bureau_title: 'Portland Police Bureau',
      id: 8,
      total_amount: 2954388,
      color: '#cab2d6',
      percentage: '5% of Total Budget' },
    { bureau_title: 'Portland Water Bureau',
      id: 9,
      total_amount: 1585195,
      color: '#cab2d6',
      percentage: '10% of Total Budget' },
  ] },
  { 2013: [
    { bureau_title: 'Bureau of Environmental Services',
      id: 1,
      total_amount: 7468965,
      color: '#b2df8a',
      percentage: '5% of Total Budget' },
    { bureau_title: 'City Budget Office',
      id: 2,
      total_amount: 115497,
      color: '#b2df8a',
      percentage: '10% of Total Budget' },
    { bureau_title: 'Office of Management & Finance',
      id: 3,
      total_amount: 8398624,
      color: '#fb9a99',
      percentage: '20% of Total Budget' },
  ] },
  { 2014: [
    { bureau_title: 'Office of the Mayor',
      id: 4,
      total_amount: 592962,
      color: '#fb9a99',
      percentage: '5% of Total Budget' },
    { bureau_title: 'Portland Bureau of Transportation',
      id: 5,
      total_amount: 57546789,
      color: '#fdbf6f',
      percentage: '20% of Total Budget' },
    { bureau_title: 'Portland Housing Bureau',
      id: 6,
      total_amount: 11639339,
      color: '#fdbf6f',
      percentage: '10% of Total Budget' },
  ] },
  { 2015: [
    { bureau_title: 'Portland Parks & Recreation',
      id: 7,
      total_amount: 21829002,
      color: '#fdbf6f',
      percentage: '5% of Total Budget' },
    { bureau_title: 'Portland Police Bureau',
      id: 8,
      total_amount: 2954388,
      color: '#cab2d6',
      percentage: '5% of Total Budget' },
    { bureau_title: 'Portland Water Bureau',
      id: 9,
      total_amount: 1585195,
      color: '#cab2d6',
      percentage: '10% of Total Budget' },
  ] },
  { 2016: [
    { bureau_title: 'Bureau of Environmental Services',
      id: 1,
      total_amount: 7468965,
      color: '#b2df8a',
      percentage: '5% of Total Budget' },
    { bureau_title: 'City Budget Office',
      id: 2,
      total_amount: 115497,
      color: '#b2df8a',
      percentage: '10% of Total Budget' },
    { bureau_title: 'Office of Management & Finance',
      id: 3,
      total_amount: 8398624,
      color: '#fb9a99',
      percentage: '20% of Total Budget' },
  ] },
];

// create nodes
export const createNodes = (rawData) => {
  // Use the max total_amount in the data as the max in the scale's domain
  // note we have to ensure the total_amount is a number.
  const maxAmount = d3.max(rawData, d => +d.total_amount);

  // Sizes bubbles based on area.
  // @v4: new flattened scale names.
  const radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([2, 85])
      .domain([0, maxAmount]);

  // Use map() to convert raw data into node data.
  const myNodes = rawData.map(d => ({
    id: d.id,
    radius: radiusScale(+d.total_amount),
    value: +d.total_amount,
    percentage: d.percentage,
    name: d.bureau_title,
    color: d.color,
    x: Math.random() * 900,
    y: Math.random() * 800,
  }));

  // sort them descending to prevent occlusion of smaller nodes.
  myNodes.sort((a, b) => b.value - a.value);

  return myNodes;
};
