import { storiesOf } from "@storybook/react";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
import barChartStory from "./BarChart.story";
import dataTable from "./DataTable.story";
import gradientScaleStory from "./GradientScale.story";
import horizontalBarChartStory from "./HorizontalBarChart.story";
import lineChartStory from "./LineChart.story";
import pieChartStory from "./PieChart.story";
import scatterplotStory from "./Scatterplot.story";
import stackedAreaChart from "./StackedAreaChart.story";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator story injection

// charts
storiesOf("Component Lib/Charts", module).addParameters({
  options: { showPanel: false }
});
// .add("Charts Style Guide", () => <ChartsStyle />);
barChartStory();
dataTable();
gradientScaleStory();
horizontalBarChartStory();
lineChartStory();
pieChartStory();
scatterplotStory();
stackedAreaChart();
