import { assign } from "lodash";
import VisualizationColors from "../VisualizationColors";
import BrandColors from "../Brand/BrandColors";

const { victoryColors } = VisualizationColors;

// Brand Colors
const civicPrimary = BrandColors.primary.hex;
const civicSecondary = BrandColors.secondary.hex;
const civicTertiary = BrandColors.tertiary.hex;
const civicSecondaryLighter = BrandColors.medium.hex;
const civicSecondaryLightest = BrandColors.subdued.hex;

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
  padding: 50
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
  fill: civicPrimary
};

const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);

const pieLabelStyles = {
  fontFamily: sansSerif,
  fontSize: "16px",
  fontWeight: "bold"
};

const axisLabelStyles = {
  fontFamily: sansSerif,
  fontSize: "14px",
  fontWeight: "bold"
};

// *
// * Strokes
// *
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

export default {
  area: assign(
    {
      style: {
        data: {
          fill: "white",
          stroke: civicPrimary,
          strokeWidth: 1
        },
        labels: centeredLabelStyles
      }
    },
    baseProps
  ),
  areaScatter: assign(
    {
      style: {
        data: {
          fill: "white",
          stroke: civicPrimary,
          strokeWidth: 1
        }
      }
    },
    baseProps
  ),
  axis: assign(
    {
      style: {
        axis: {
          fill: "transparent",
          stroke: civicSecondaryLighter,
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
          stroke: civicSecondaryLightest,
          strokeDasharray,
          strokeLinecap,
          strokeLinejoin
        },
        ticks: {
          fill: "transparent",
          padding,
          size: 5,
          stroke: civicSecondaryLighter,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin
        },
        tickLabels: assign({}, baseLabelStyles, {
          fill: civicPrimary,
          stroke: "transparent"
        })
      }
    },
    baseProps
  ),
  axisLabel: assign(
    {
      style: axisLabelStyles
    },
    baseProps
  ),
  bar: assign(
    {
      style: {
        data: {
          fill: civicTertiary,
          padding: horizontalBarPadding,
          stroke: "transparent",
          strokeWidth: 0,
          width: 20
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  candlestick: assign(
    {
      style: {
        data: {
          stroke: civicSecondaryLighter
        },
        labels: centeredLabelStyles
      },
      candleColors: {
        positive: "#ffffff",
        negative: civicSecondaryLighter
      }
    },
    baseProps
  ),
  chart: assign(
    {
      animate: { duration: 1000 }
    },
    baseProps
  ),
  errorbar: assign(
    {
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: civicSecondaryLighter,
          strokeWidth: 2
        },
        labels: assign({}, centeredLabelStyles, {
          stroke: "transparent",
          strokeWidth: 0
        })
      }
    },
    baseProps
  ),
  group: assign(
    {
      colorScale: victoryColors
    },
    baseProps
  ),
  legend: {
    colorScale: victoryColors,
    gutter: 10,
    orientation: "vertical",
    titleOrientation: "top",
    style: {
      data: {
        type: "circle"
      },
      labels: baseLabelStyles,
      title: assign({}, baseLabelStyles, { padding: 5 })
    }
  },
  line: assign(
    {
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: civicSecondaryLighter,
          strokeWidth: 2
        },
        labels: assign({}, baseLabelStyles, {
          stroke: "transparent",
          strokeWidth: 0,
          textAnchor: "start"
        })
      }
    },
    baseProps
  ),
  pie: assign(
    {
      colorScale: victoryColors,
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
    },
    baseProps
  ),
  pieLabel: assign(
    {
      style: pieLabelStyles
    },
    baseProps
  ),
  scatter: assign(
    {
      style: {
        data: {
          fill: civicSecondaryLighter,
          opacity: 1,
          stroke: "transparent",
          strokeWidth: 0
        },
        labels: assign({}, centeredLabelStyles, {
          stroke: "transparent"
        })
      }
    },
    baseProps
  ),
  stack: assign(
    {
      colorScale: victoryColors
    },
    baseProps
  ),
  tooltip: assign(
    {
      style: {
        data: {
          fill: "transparent",
          stroke: "transparent",
          strokeWidth: 0
        },
        labels: centeredLabelStyles,
        customHoverColor: civicSecondary
      },
      flyoutStyle: {
        stroke: "transparent",
        strokeWidth: 1,
        fill: civicSecondaryLightest
      },
      flyoutProps: {
        cornerRadius: 10,
        pointerLength: 10
      }
    },
    tooltipProps
  ),
  voronoi: assign(
    {
      style: {
        data: {
          fill: "transparent",
          stroke: "transparent",
          strokeWidth: 0
        },
        labels: centeredLabelStyles
      }
    },
    baseProps
  )
};
