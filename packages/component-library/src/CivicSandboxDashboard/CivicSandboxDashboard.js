/* eslint-disable no-nested-ternary */
import { useState } from "react";
import {
  arrayOf,
  bool,
  func,
  node,
  number,
  oneOfType,
  shape,
  string
} from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";
import LineChart from "../LineChart/LineChart";
// import PieChart from "../PieChart/PieChart";
// import HorizontalBarChart from "../HorizontalBarChart/HorizontalBarChart";
import civicFormat from "../utils/civicFormat";
import { ICONS } from "../styleConstants";

const container = css`
  position: absolute;
  bottom: 50px;
  left: 25px;
  display: flex;
  flex-direction: column;
  width: 575px;
  background: rgba(243, 242, 243, 0.9);
  color: rgb(85, 85, 85);
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.2);
  @media (max-width: 900px) {
    width: 92%;
    left: 1%;
  }
`;

const dashboardOpen = css`
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 0.9;
  transition: height 750ms ease-out, opacity 1.5s ease-in;
`;

const dashboardClosed = css`
  height: 0;
  opacity: 0;
  transition: height 750ms ease-out, opacity 0s linear;
`;

const contentContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

const toggleContainer = css`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  color: #dc4556;
  z-index: 4;
  opacity: 0.9;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.2);
`;

const toggleTitle = css`
  flex: 3;
  margin auto 20px;
`;

const toggleArrow = css`
  flex: 1;
  margin 1% auto;
  font-size: 20px;
  text-align: center;
`;

const watermarkContainer = css`
  position: absolute;
  left: -1px;
  top: -1px;
`;

const buttonContainer = css`
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const icon = css`
  text-align: center;
  border: 1px solid lightGray;
  background-color: #f0f0f0;
  color: dimGray;
  font-size: 20px;
  height: 98%;
  width: 50%;
  margin: 0 auto;
`;

const iconActive = css`
  text-align: center;
  border: 1px solid lightGray;
  background-color: #f0f0f0;
  color: #dc4556;
  font-size: 20px;
  height: 98%;
  width: 50%;
  margin: 0 auto;
`;

const viz = css`
  width: 90%;
  overflow-y: hidden;
  padding-left: 5%;
`;

// const donutPercent = css`
//   position: absolute;
//   bottom: 35px;
//   left: 28%;
//   width: 50%;
//   margin: auto;
//   text-align: center;
// `;

// const createTextViz = text => (
//   <div css={viz} key={shortid.generate()}>
//     <h2>{text.title}</h2>
//     <h3>{text.data.toLocaleString()}</h3>
//   </div>
// );

// const createDonutViz = donut => {
//   const [percentValue] = donut.data;
//   const salmon = "#EE495C";
//   const gray = "#a9a9a9";
//   return (
//     <div css={viz} key={shortid.generate()}>
//       <h2>{donut.title}</h2>
//       <h2 css={donutPercent}>
//         {percentValue.y < 1
//           ? civicFormat.percentage(percentValue.y)
//           : `${percentValue.y.toFixed(1)}%`}
//       </h2>
//       <PieChart
//         data={donut.data}
//         colors={[salmon, gray]}
//         width={400}
//         height={400}
//         innerRadius={110}
//         halfDoughnut
//       />
//     </div>
//   );
// };

// const createBarsViz = bars => (
//   <div css={viz} key={shortid.generate()}>
//     <h2>{bars.title}</h2>
//     <HorizontalBarChart
//       minimalist={bars.minimalist}
//       data={bars.data}
//       sortOrder={bars.sortOrder}
//       dataValue={bars.dataValue}
//       dataLabel={bars.dataLabel}
//       dataKeyLabel=""
//       title=""
//       subtitle=""
//       xLabel=""
//       yLabel=""
//     />
//   </div>
// );

const createLineViz = (data, title, xLabel, yLabel, xFormat, yFormat) => {
  const yForm = yFormat === "percent" ? "percentage" : yFormat;
  return (
    <div css={viz} key={shortid.generate()}>
      <h2>{title}</h2>
      <LineChart
        data={data}
        xLabel={xLabel}
        yLabel={`${yLabel.slice(0, 1).toUpperCase()}${yLabel.slice(1)}`}
        xNumberFormatter={x => civicFormat[xFormat](x)}
        yNumberFormatter={y => civicFormat[yForm](y)}
      />
    </div>
  );
};

const placeholder = (
  <div css={viz}>
    <h2>Please select a polygon</h2>
  </div>
);

const CivicDashboard = props => {
  const { data, children, isDashboardOpen, onClick } = props;
  const [display, setDisplay] = useState("visualizations");

  const createVisualizations =
    data && data.feature && data.feature.object
      ? Object.entries(data.feature.object.properties).filter(c => {
          const colorFieldName = data.visualization.map.fieldName.color;
          const a = c[0].match(/^[a-zA-Z]+/);
          const b = colorFieldName.match(/^[a-zA-Z]+/);
          return a[0] === b[0];
        })
      : [];

  const censusYears3 = [1990, 2000, 2010];
  const censusYears4 = [1990, 2000, 2010, 2017];
  const lineData =
    createVisualizations.length === 3
      ? createVisualizations.map((d, i) => {
          const yFormatType = data.visualization.tooltip.primary.format;
          return {
            x: censusYears3[i],
            y:
              d[1] && yFormatType !== "percent"
                ? d[1]
                : d[1] && yFormatType === "percent"
                ? d[1] / 100
                : 0
          };
        })
      : createVisualizations.length === 4
      ? createVisualizations.map((d, i) => {
          const yFormatType = data.visualization.tooltip.primary.format;
          return {
            x: censusYears4[i],
            y:
              d[1] && yFormatType !== "percent"
                ? d[1]
                : d[1] && yFormatType === "percent"
                ? d[1] / 100
                : 0
          };
        })
      : null;

  const visualizations =
    createVisualizations.length > 0
      ? createLineViz(
          lineData,
          data.displayName,
          "Year",
          data.visualization.tooltip.primary.format,
          "year",
          data.visualization.tooltip.primary.format
        )
      : placeholder;

  const civicWatermark = (
    <div css={watermarkContainer}>
      <svg width="134" height="135" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path d="M0 134.658V0l11.566 11.597v123.061H0z" fill="#191119" />
          <path
            d="M133.864 0v11.597H11.566v.008L0 .008V0h133.864z"
            fill="#DC4556"
          />
        </g>
      </svg>
    </div>
  );

  const visualizationButtons = (
    <div css={buttonContainer}>
      <div
        css={display === "description" ? iconActive : icon}
        onClick={() => setDisplay("description")}
        onKeyPress={() => setDisplay("description")}
        tabIndex={0}
        role="button"
      >
        <div className={ICONS.info} />
      </div>
      <div
        css={display === "visualizations" ? iconActive : icon}
        onClick={() => setDisplay("visualizations")}
        onKeyPress={() => setDisplay("visualizations")}
        tabIndex={0}
        role="button"
      >
        <div className={ICONS.eye} />
      </div>
    </div>
  );

  const dashboardToggleButton = (
    <div
      css={toggleContainer}
      onClick={() => onClick()}
      onKeyPress={() => onClick()}
      tabIndex={0}
      role="button"
    >
      <div css={toggleTitle}>
        {isDashboardOpen ? "" : "Please select a polygon"}
      </div>
      <div css={toggleArrow}>
        <div className={isDashboardOpen ? ICONS.arrowDown : ICONS.arrowUp} />
      </div>
    </div>
  );

  return (
    <div css={container}>
      <div css={isDashboardOpen ? dashboardOpen : dashboardClosed}>
        <div css={contentContainer}>
          {display === "description" ? children : visualizations}
        </div>
        {civicWatermark}
        {children ? visualizationButtons : null}
      </div>
      {dashboardToggleButton}
    </div>
  );
};

CivicDashboard.propTypes = {
  data: arrayOf(
    shape({
      data: oneOfType([arrayOf(shape({})), number, string]),
      id: oneOfType([number, string]),
      title: string,
      visualizationType: string
    })
  ),
  children: node,
  isDashboardOpen: bool,
  onClick: func
};

export default CivicDashboard;
