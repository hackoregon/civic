import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const chartEvents = [
  {
    target: 'data',
    eventHandlers: {
      onMouseOver: () => {
        return [
          {
            target: 'data',
            mutation: () => ({ style: { fill: 'tomato', width: 40 } }),
          }, {
            target: 'labels',
            mutation: () => ({ active: true }),
          },
        ];
      },
      onMouseOut: () => {
        return [
          {
            target: 'data',
            mutation: () => { },
          }, {
            target: 'labels',
            mutation: () => ({ active: false }),
          },
        ];
      },
    },
  },
];

function getDefaultDomain(data, dataKey, dataLabel) {
  const xValues = data.map(value => value[dataKey]);
  const yValues = data.map(value => value[dataLabel]);

  return {
    x: [
      Math.min(...xValues) < 0 ? Math.min(...xValues) : Math.min(...xValues),
      Math.max(...xValues),
    ],
    y: [
      Math.min(...yValues) < 0 ? Math.min(...yValues) : 0,
      Math.max(...yValues),
    ],
  };
}

// If we want to generate default domains ourselves, this needs to be finished:
function getDefaultStackedDomain(data, dataKey, dataLabel) {
  const xValues = data.map(value => value[dataKey]);
  const yValues = data.map(value => value[dataLabel]);
  console.log(data, dataKey, dataLabel);
  console.log(xValues, yValues);

  return {
    x: [
      Math.min(...xValues) < 0 ? Math.min(...xValues) : Math.min(...xValues),
      Math.max(...xValues),
    ],
    y: [
      Math.min(...yValues) < 0 ? Math.min(...yValues) : 0,
      Math.max(...yValues),
    ],
  };
}

function getDefaultDataSeriesLabels(data, series) {
  const categories = data.map(value => value[series]);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories.map(cat => ({ category: cat, label: cat }));
}

function getDefaultFillStyle(dataSeriesLabel) {
  const dataSeriesCategories =
    dataSeriesLabel && dataSeriesLabel.length
      ? dataSeriesLabel.map(series => (series.category))
      : null;
  return {
    data: {
      fill: d => {
        if (!dataSeriesCategories) return CivicVictoryTheme.civic.group.colorScale[0];
        const idx = dataSeriesCategories.findIndex(series => series === d.series);
        return CivicVictoryTheme.civic.group.colorScale[idx];
      },
    },
  };
}

function getDefaultLineStyle(idx) {
  return {
    data: { stroke: CivicVictoryTheme.civic.group.colorScale[idx] },
  };
}

export { chartEvents, getDefaultDomain, getDefaultDataSeriesLabels, getDefaultFillStyle, getDefaultLineStyle, getDefaultStackedDomain };

