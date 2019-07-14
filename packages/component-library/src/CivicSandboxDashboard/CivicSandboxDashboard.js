/* TODO: Fix linting errors */
/* eslint-disable */
import React, { useState } from "react";
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
import { css } from "emotion";
import PieChart from "../PieChart/PieChart";
import HorizontalBarChart from "../HorizontalBarChart/HorizontalBarChart";
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
  height: 45vh;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 0.9;
  transition: height 750ms ease-out, opacity 1.5s ease-in;
`;

const dashboardClosed = css`
  height: 0;
  opacity: 0;
  transition: height 750ms ease-out, opacity 0.25s linear;
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
  margin: 2% 2% 2% 8%;
  overflow-y: hidden;
`;

const donutPercent = css`
  position: absolute;
  bottom: 43%;
  left: 28%;
  width: 50%;
  margin: auto;
  text-align: center;
`;

const createTextViz = (text, index) => (
  <div className={viz} key={index}>
    <h2>{text.title}</h2>
    <h3>{text.data.toLocaleString()}</h3>
  </div>
);

const createDonutViz = (donut, index) => {
  const [percentValue] = donut.data;
  const salmon = "#EE495C";
  const gray = "#a9a9a9";
  return (
    <div className={viz} key={index}>
      <h2>{donut.title}</h2>
      <h2 className={donutPercent}>
        {percentValue.y < 1
          ? civicFormat.percentage(percentValue.y)
          : `${percentValue.y.toFixed(1)}%`}
      </h2>
      <PieChart
        data={donut.data}
        colors={[salmon, gray]}
        width={475}
        height={350}
        innerRadius={90}
        halfDoughnut
      />
    </div>
  );
};

const createBarsViz = (bars, index) => (
  <div className={viz} key={index}>
    <h2>{bars.title}</h2>
    <HorizontalBarChart
      minimalist={bars.minimalist}
      data={bars.data}
      sortOrder={bars.sortOrder}
      dataValue={bars.dataValue}
      dataLabel={bars.dataLabel}
      dataKeyLabel=""
      title=""
      subtitle=""
      xLabel=""
      yLabel=""
    />
  </div>
);

const placeholder = (
  <div className={viz}>
    <h2>Please select a polygon</h2>
  </div>
);

const CivicDashboard = props => {
  const { data, children, isDashboardOpen, onClick } = props;

  const [display, setDisplay] = useState("visualizations");

  const createVisualizations = data.map((object, index) => {
    const vizType = object.visualizationType;
    return vizType === "Text"
      ? createTextViz(object, index)
      : vizType === "PercentDonut"
      ? createDonutViz(object, index)
      : vizType === "ComparisonBar"
      ? createBarsViz(object, index)
      : null;
  });

  const [hasVisualizations] = createVisualizations;
  const visualizations = hasVisualizations ? createVisualizations : placeholder;

  const civicWatermark = (
    <div className={watermarkContainer}>
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
    <div className={buttonContainer}>
      <div
        className={display === "description" ? iconActive : icon}
        onClick={() => setDisplay("description")}
      >
        <div className={ICONS.info} />
      </div>
      <div
        className={display === "visualizations" ? iconActive : icon}
        onClick={() => setDisplay("visualizations")}
      >
        <div className={ICONS.eye} />
      </div>
    </div>
  );

  const dashboardToggleButton = (
    <div className={toggleContainer} onClick={() => onClick()}>
      <div className={toggleTitle}>
        {isDashboardOpen ? "" : "Please select a polygon"}
      </div>
      <div className={toggleArrow}>
        <div className={isDashboardOpen ? ICONS.arrowDown : ICONS.arrowUp} />
      </div>
    </div>
  );

  return (
    <div className={container}>
      <div className={isDashboardOpen ? dashboardOpen : dashboardClosed}>
        <div className={contentContainer}>
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
