import React from "react";
import PropTypes from "prop-types";
import { PieChart } from "@hackoregon/component-library";
import commaSeparate from "../../utils/comma-separate";

const colors = [
  "#3e75ac",
  "#4c8ccd",
  "#68a3df",
  "#87baed",
  "#abd1f7",
  "#d3e8fd"
];

const contentBlockStyle = {
  display: "inline-block",
  verticalAlign: "top",
  width: "33.333%",
  minWidth: "340px"
};

const numberColumnStyle = {
  display: "inline-block",
  width: "30%",
  textAlign: "right"
};

const labelColumnStyle = {
  boxSizing: "border-box",
  display: "inline-block",
  width: "70%",
  textAlign: "left",
  paddingLeft: "1em"
};

const numberStyle = {
  color: colors[0],
  fontWeight: "bold"
};

const chartProportions = {
  width: 350,
  height: 200,
  innerRadius: 20
};

const textAlignCenter = {
  textAlign: "center"
};

// VictoryPie uses d3-interpolate to perform animations. d3-interpolate
// "sanitizes" all values, despite whether or not they are used for an animation.
// This results in english words that happen to also be valid html/css color names
// become rgb(x, x, x) strings.
const protectLabels = data => data.map(d => ({ ...d, name: `${d.name}.` }));

/* eslint-disable dot-notation */
const DemographicDetailView = ({ demographics }) => {
  if (!demographics) return <div />;
  return (
    <div>
      {demographics && (
        <div style={textAlignCenter}>
          <h2>{demographics.name}</h2>
          <div style={contentBlockStyle}>
            <h3 style={textAlignCenter}>Race/Ethnicity</h3>
            <PieChart
              data={demographics.populations}
              dataLabel="name"
              dataValue="value"
              colors={colors}
              useLegend
              {...chartProportions}
            />
          </div>
          <div style={contentBlockStyle}>
            <h3 style={textAlignCenter}>Household Totals</h3>
            <div style={numberColumnStyle}>
              <p style={numberStyle}>
                {commaSeparate(demographics.households["Households"])}
              </p>
              <p style={numberStyle}>
                {commaSeparate(demographics.households["Single-Person"])}
              </p>
              <p style={numberStyle}>
                {commaSeparate(
                  demographics.households["Households with Children"]
                )}
              </p>
            </div>
            <div style={labelColumnStyle}>
              <p>Total Households</p>
              <p>Single Person Households</p>
              <p>Households With Children</p>
            </div>
          </div>
          <div style={contentBlockStyle}>
            <h3 style={textAlignCenter}>Vulnerable Populations</h3>
            <div style={numberColumnStyle}>
              <p style={numberStyle}>
                {commaSeparate(
                  demographics.households["Foreign-Born Individuals"]
                )}
              </p>
              <p style={numberStyle}>
                {commaSeparate(
                  demographics.households["Persons Exp-Disabilities"]
                )}
              </p>
              <p style={numberStyle}>
                {commaSeparate(demographics.households["Persons 65 and Older"])}
              </p>
            </div>
            <div style={labelColumnStyle}>
              <p>Foreign Born</p>
              <p>Persons With Disabilities</p>
              <p>65 &amp; Older</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
/* eslint-enable dot-notation */

DemographicDetailView.propTypes = {
  demographics: PropTypes.object
};

DemographicDetailView.defaultProps = {
  demographics: null
};

export default DemographicDetailView;
