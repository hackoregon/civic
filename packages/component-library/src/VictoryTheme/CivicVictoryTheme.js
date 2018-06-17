import { assign } from "lodash";

// *
// * Colors
// *

const civicPrimary = "#1f1123";
const civicSecondary = "#eb4d5f";
const civicTertiary = "#716470";
const civicSecondaryLighter = "aaa4ab";
const civicSecondaryLightest = "f3f2f3";

const civicCategoricalColor1 = "#DC4556";
const civicCategoricalColor2 = "#19B7AA";
const civicCategoricalColor3 = "#1E62BD";
const civicCategoricalColor4 = "#721D7C";
const civicCategoricalColor5 = "#FFB226";

const colors = [
  civicCategoricalColor1,
  civicCategoricalColor2,
  civicCategoricalColor3,
  civicCategoricalColor4,
  civicCategoricalColor5,
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
const horizontalBarPadding = 2;
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

const pieLabelStyles = {
  fontFamily: sansSerif,
  fontSize: '18px',
}

const axisLabelStyles = {
  fontFamily: sansSerif,
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
        fill: grey900,
        stroke: 'black',
        strokeWidth: 1
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  areaScatter: assign({
    style: {
      data: {
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1
      }
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
        fill: civicTertiary,
        padding: horizontalBarPadding,
        stroke: "transparent",
        strokeWidth: 0,
        width: 40,
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
        stroke: "white",
        strokeWidth: 2
      },
      labels: assign({}, baseLabelStyles, {
        padding: 20,
        stroke: "transparent",
        strokeWidth: 0
      })
    }
  }, baseProps),
  pieLabel: assign({
    style: pieLabelStyles,
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
      customHoverColor: civicSecondary,
    },
    flyoutStyle: {
      stroke: "transparent",
      strokeWidth: 1,
      fill: civicSecondaryLightest,
    },
    flyoutProps: {
      cornerRadius: 10,
      pointerLength: 10
    },
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
