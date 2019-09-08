import {
  VisualizationColors,
  VictoryTheme
} from "@hackoregon/component-library";

const { categorical } = VisualizationColors;
const victoryColors = [
  categorical.yellow.hex,
  categorical.green.hex,
  categorical.pink.hex,
  categorical.purple.hex,
  categorical.blue.hex
];

export default {
  ...VictoryTheme,
  group: { ...VictoryTheme.group, colorScale: victoryColors },
  legend: { ...VictoryTheme.legend, colorScale: victoryColors },
  pie: { ...VictoryTheme.pie, colorScale: victoryColors },
  stack: { ...VictoryTheme.stack, colorScale: victoryColors }
};
