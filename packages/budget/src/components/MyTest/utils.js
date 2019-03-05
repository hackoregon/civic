import * as d3 from 'd3';

// constants used in BubbleChart.js
export const width = 800;
export const height = 500;
export const center = { x: width / 2, y: height / 2 };

// constants used in index.js for slider
export const min = 1;
export const max = 10;
export const step = 1;
export const style = {
  width: 800,
  margin: 'auto',
  padding: 20,
  justifyContent: 'center',
};
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

// Bubble Data used in index.js
export const saBubbleData = [
  {
    FY2006: [
      {
        title: 'Bureau of Environmental Services',
        id: 1,
        total_amount: 7468965,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'City Budget Office',
        id: 2,
        total_amount: 115497,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
      {
        title: 'Office of Management & Finance',
        id: 3,
        total_amount: 8398624,
        color: '#329f7c',
        percentage: '20% of Total Budget',
      },
    ],
  },
  {
    FY2007: [
      {
        title: 'Office of the Mayor',
        id: 4,
        total_amount: 592962,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Portland Bureau of Transportation',
        id: 5,
        total_amount: 57546789,
        color: '#329f7c',
        percentage: '20% of Total Budget',
      },
      {
        title: 'Portland Housing Bureau',
        id: 6,
        total_amount: 11639339,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
    ],
  },
  {
    FY2008: [
      {
        title: 'Portland Parks & Recreation',
        id: 7,
        total_amount: 21829002,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Portland Police Bureau',
        id: 8,
        total_amount: 2954388,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Portland Water Bureau',
        id: 9,
        total_amount: 1585195,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
    ],
  },
  {
    FY2009: [
      {
        title: 'Bureau of Environmental Services',
        id: 1,
        total_amount: 7468965,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Portland Parks & Recreation',
        id: 7,
        total_amount: 21829002,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Office of Management & Finance',
        id: 3,
        total_amount: 8398624,
        color: '#329f7c',
        percentage: '20% of Total Budget',
      },
    ],
  },
  {
    FY2010: [
      {
        title: 'Office of Management & Finance',
        id: 3,
        total_amount: 8398624,
        color: '#329f7c',
        percentage: '20% of Total Budget',
      },
      {
        title: 'Office of the Mayor',
        id: 4,
        total_amount: 592962,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Portland Bureau of Transportation',
        id: 5,
        total_amount: 57546789,
        color: '#329f7c',
        percentage: '20% of Total Budget',
      },
      {
        title: 'Portland Housing Bureau',
        id: 6,
        total_amount: 11639339,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
    ],
  },
  {
    FY2011: [
      {
        title: 'Portland Housing Bureau',
        id: 6,
        total_amount: 11639339,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
      {
        title: 'Portland Parks & Recreation',
        id: 7,
        total_amount: 21829002,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Portland Police Bureau',
        id: 8,
        total_amount: 2954388,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Portland Water Bureau',
        id: 9,
        total_amount: 1585195,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
    ],
  },
  {
    FY2012: [
      {
        title: 'Bureau of Environmental Services',
        id: 1,
        total_amount: 7468965,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'City Budget Office',
        id: 2,
        total_amount: 115497,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
      {
        title: 'Office of the Mayor',
        id: 4,
        total_amount: 592962,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
    ],
  },
  {
    FY2013: [
      {
        title: 'Office of the Mayor',
        id: 4,
        total_amount: 592962,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'City Budget Office',
        id: 2,
        total_amount: 115497,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
      {
        title: 'Portland Bureau of Transportation',
        id: 5,
        total_amount: 57546789,
        color: '#329f7c',
        percentage: '20% of Total Budget',
      },
      {
        title: 'Portland Housing Bureau',
        id: 6,
        total_amount: 11639339,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
    ],
  },
  {
    FY2014: [
      {
        title: 'Portland Bureau of Transportation',
        id: 5,
        total_amount: 57546789,
        color: '#329f7c',
        percentage: '20% of Total Budget',
      },
      {
        title: 'Portland Parks & Recreation',
        id: 7,
        total_amount: 21829002,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Portland Police Bureau',
        id: 8,
        total_amount: 2954388,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Portland Water Bureau',
        id: 9,
        total_amount: 1585195,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
    ],
  },
  {
    FY2015: [
      {
        title: 'Portland Police Bureau',
        id: 8,
        total_amount: 2954388,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'Bureau of Environmental Services',
        id: 1,
        total_amount: 7468965,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'City Budget Office',
        id: 2,
        total_amount: 115497,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
      {
        title: 'Office of Management & Finance',
        id: 3,
        total_amount: 8398624,
        color: '#329f7c',
        percentage: '20% of Total Budget',
      },
    ],
  },
  {
    FY2016: [
      {
        title: 'Bureau of Environmental Services',
        id: 1,
        total_amount: 7468965,
        color: '#329f7c',
        percentage: '5% of Total Budget',
      },
      {
        title: 'City Budget Office',
        id: 2,
        total_amount: 115497,
        color: '#329f7c',
        percentage: '10% of Total Budget',
      },
      {
        title: 'Office of Management & Finance',
        id: 3,
        total_amount: 8398624,
        color: '#329f7c',
        percentage: '20% of Total Budget',
      },
    ],
  },
];

// create nodes used in BubbleChart.js
export const createNodes = rawData => {
  // Use the max total_amount in the data as the max in the scale's domain
  // note we have to ensure the total_amount is a number.
  const maxAmount = d3.max(rawData, d => +d.total_amount);

  // Sizes bubbles based on area.
  // @v4: new flattened scale names.
  const radiusScale = d3
    .scalePow()
    .exponent(0.5)
    .range([2, 85])
    .domain([0, maxAmount]);

  // Use map() to convert raw data into node data.
  const myNodes = rawData.map(d => ({
    id: d.id,
    radius: radiusScale(+d.total_amount),
    value: +d.total_amount,
    percentage: d.percentage,
    name: d.title,
    color: d.color,
    x: Math.random() * 900,
    y: Math.random() * 800,
  }));

  // sort them descending to prevent occlusion of smaller nodes.
  myNodes.sort((a, b) => b.value - a.value);

  return myNodes;
};
