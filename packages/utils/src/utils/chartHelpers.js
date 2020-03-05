import { VictoryTheme } from "@hackoregon/ui-themes";

const chartEvents = (theme = VictoryTheme, replaceMutationStyles) => {
  const tooltipColor = theme.tooltip.style.customHoverColor;
  const defaultMutation = props => ({
    style: Object.assign(props.style, { fill: tooltipColor })
  });
  const replaceStyleMutation = () => ({ style: { fill: tooltipColor } });
  const tooltipMutation = replaceMutationStyles
    ? replaceStyleMutation
    : defaultMutation;

  return [
    {
      target: "data",
      eventHandlers: {
        onMouseOver: () => {
          return [
            {
              target: "data",
              mutation: tooltipMutation
            },
            {
              target: "labels",
              mutation: () => ({ active: true })
            }
          ];
        },
        onMouseOut: () => {
          return [
            {
              target: "data",
              mutation: () => {}
            },
            {
              target: "labels",
              mutation: () => ({ active: false })
            }
          ];
        }
      }
    }
  ];
};

function getDefaultDomain(data, dataKey, dataLabel) {
  const xValues = data.map(value => value[dataKey]);
  const yValues = data.map(value => value[dataLabel]);

  return {
    x: [
      Math.min(...xValues) < 0 ? Math.min(...xValues) : Math.min(...xValues),
      Math.max(...xValues)
    ],
    y: [
      Math.min(...yValues) < 0 ? Math.min(...yValues) : 0,
      Math.max(...yValues)
    ]
  };
}

function getDefaultStackedDomain(data, dataKey, dataLabel) {
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, []);
  }

  const xValues = data.map(value => value[dataKey]);
  const yValues = Object.values(
    groupBy(data, dataKey).map(value =>
      value.reduce((acc, obj) => acc + obj[dataLabel], 0)
    )
  );

  return {
    x: [
      Math.min(...xValues) < 0 ? Math.min(...xValues) : Math.min(...xValues),
      Math.max(...xValues)
    ],
    y: [
      Math.min(...yValues) < 0 ? Math.min(...yValues) : 0,
      Math.max(...yValues)
    ]
  };
}

function getDefaultDataSeriesLabels(data, series) {
  const categories = data.map(value => value[series]);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories.map(cat => ({ category: cat, label: cat }));
}

function getDefaultFillStyle(dataSeriesLabel, theme = VictoryTheme) {
  const dataSeriesCategories =
    dataSeriesLabel && dataSeriesLabel.length
      ? dataSeriesLabel.map(series => series.category)
      : null;
  return {
    data: {
      fill: d => {
        if (!dataSeriesCategories) return theme.group.colorScale[0];
        const idx = dataSeriesCategories.findIndex(
          series => series === d.series
        );
        return theme.group.colorScale[idx];
      }
    }
  };
}

function getDefaultLineStyle(idx, theme = VictoryTheme) {
  return {
    data: { stroke: theme.group.colorScale[idx] }
  };
}

function getDefaultAreaStyle(idx, theme = VictoryTheme) {
  return {
    data: { fill: theme.group.colorScale[idx] }
  };
}

const categoricalColors = (dataLength, theme = VictoryTheme) => {
  const colorScheme = [];
  for (let i = 0; i < dataLength; i += 1) {
    colorScheme.push(theme.group.colorScale[i]);
  }
  return colorScheme;
};

const transformDatato100 = (dataset, value, label) => {
  const totals = dataset[0].map((currentData, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i][label];
    }, 0);
  });
  const newData = dataset.map(indvData => {
    return indvData.map((datum, i) => {
      const newObj = {
        ...datum,
        [`${value}`]: datum[value],
        [`${label}`]: datum[label] / totals[i]
      };
      return newObj;
    });
  });
  return newData;
};

export default {
  chartEvents,
  getDefaultDomain,
  getDefaultDataSeriesLabels,
  getDefaultFillStyle,
  getDefaultLineStyle,
  getDefaultAreaStyle,
  getDefaultStackedDomain,
  categoricalColors,
  transformDatato100
};
