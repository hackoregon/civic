import { assign } from "lodash";

// *
// * Colors
// *
const civicPrimary = "#201024";
const civicSecondary = "#706371";
const civicTertiary = "#EE495C";
const civicSecondaryLighter = "AAA4AB";
const civicSecondaryLightest = "F3F2F3";



const civicCategoricalColor1 = "#DC4556";
const civicCategoricalColor2 = "#19B7AA";
const civicCategoricalColor3 = "#1E62BD";
const civicCategoricalColor4 = "#721D7C";
const civicCategoricalColor5 = "#FFB226";
const civicCategoricalColor6 = "#DC4556";

const colors = [
  civicCategoricalColor1,
  civicCategoricalColor2,
  civicCategoricalColor3,
  civicCategoricalColor4,
  civicCategoricalColor5,
  civicCategoricalColor6
];

const yellow200 = "#FFF59D";
const deepOrange600 = "#F4511E";
const lime300 = "#DCE775";
const lightGreen500 = "#8BC34A";
const teal700 = "#00796B";
const cyan900 = "#006064";
const blueGrey50 = "#ECEFF1";
const blueGrey300 = "#90A4AE";
const blueGrey700 = "#455A64";
const grey900 = "#212121";
const black = "#000000"
// *
// * Typography
// *
const sansSerif = "'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif";
const letterSpacing = "normal";
const fontSize = 12;
const fontWeight = "normal";
// *
// * Layout
// *
const padding = 8;
const baseProps = {
  width: 650,
  height: 350,
  padding: 50,
  domainPadding: 20,
  animate: 100,
};
const tooltipProps = {
  x: 325,
  y: 0,
  orientation: "bottom",
  pointerLength: 0,
  cornerRadius: 0
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  fontWeight,
  letterSpacing,
  padding,
  fill: black,
};

const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);

const axisLabelStyles = {
  fontFamily: "'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif",
  fontSize: '14px',
  fontWeight: 'bold',
};

// *
// * Strokes
// *
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

export default {
  area: assign({
    style: {
      data: {
        fill: grey900
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  axis: assign({
    style: {
      axis: {
        fill: "transparent",
        stroke: blueGrey300,
        strokeWidth: 2,
        strokeLinecap,
        strokeLinejoin
      },
      axisLabel: assign({}, centeredLabelStyles, {
        padding,
        stroke: "transparent"
      }),
      grid: {
        fill: "transparent",
        stroke: blueGrey50,
        strokeDasharray,
        strokeLinecap,
        strokeLinejoin
      },
      ticks: {
        fill: "transparent",
        padding,
        size: 5,
        stroke: blueGrey300,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin
      },
      tickLabels: assign({}, baseLabelStyles, {
        fill: black,
        stroke: "transparent"
      })
    }
  }, baseProps),
  axisLabel: assign({
    style: axisLabelStyles
  }
  , baseProps),
  bar: assign({
    style: {
      data: {
        fill: "#756172",
        padding,
        stroke: "transparent",
        strokeWidth: 0,
        width: 40
      },
      labels: baseLabelStyles
    }
  }, baseProps),
  candlestick: assign({
    style: {
      data: {
        stroke: blueGrey700
      },
      labels: centeredLabelStyles
    },
    candleColors: {
      positive: "#ffffff",
      negative: blueGrey700
    }
  }, baseProps),
  chart: baseProps,
  errorbar: assign({
    style: {
      data: {
        fill: "transparent",
        opacity: 1,
        stroke: blueGrey700,
        strokeWidth: 2
      },
      labels: assign({}, centeredLabelStyles, {
        stroke: "transparent",
        strokeWidth: 0
      })
    }
  }, baseProps),
  group: assign({
    colorScale: colors
  }, baseProps),
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle',
      },
      labels: baseLabelStyles,
      title: assign({}, baseLabelStyles, { padding: 5 }),
    },
  },
  line: assign({
    style: {
      data: {
        fill: "transparent",
        opacity: 1,
        stroke: blueGrey700,
        strokeWidth: 2
      },
      labels: assign({}, baseLabelStyles, {
        stroke: "transparent",
        strokeWidth: 0,
        textAnchor: "start"
      })
    }
  }, baseProps),
  pie: assign({
    colorScale: colors,
    style: {
      data: {
        padding,
        stroke: blueGrey50,
        strokeWidth: 1
      },
      labels: assign({}, baseLabelStyles, {
        padding: 20,
        stroke: "transparent",
        strokeWidth: 0
      })
    }
  }, baseProps),
  scatter: assign({
    style: {
      data: {
        fill: blueGrey700,
        opacity: 1,
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: assign({}, centeredLabelStyles, {
        stroke: "transparent"
      })
    }
  }, baseProps),
  stack: assign({
    colorScale: colors
  }, baseProps),
  tooltip: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: centeredLabelStyles,
    },
    flyoutStyle: {
      stroke: "transparent",
      strokeWidth: 1,
      fill: civicSecondaryLightest,
    },
    flyoutProps: {
      cornerRadius: 10,
      pointerLength: 10
    }
  }, tooltipProps),
  voronoi: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: centeredLabelStyles
    }
  }, baseProps)
};
