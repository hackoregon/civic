import React from "react";
import PropTypes from "prop-types";

import { VictoryGroup, VictoryScatter } from "victory";

import GradientLine from "./GradientLine";
import GradientBox from "./GradientBox";

const colorScales = {
  default: ["#ffffff", "#19B7AA"],
  thermal: [
    "#ffffd2",
    "#ffefac",
    "#fee296",
    "#fec375",
    "#fd9b54",
    "#fc6443",
    "#e63638",
    "#c51f40",
    "#8f1f40"
  ],
  space: [
    "#f8fcfd",
    "#e4eff6",
    "#c8dae9",
    "#abc7df",
    "#9da6cd",
    "#9081bc",
    "#9d5daa",
    "#972e8f",
    "#6b2866"
  ],
  ocean: [
    "#ffffe1",
    "#effac1",
    "#ceedc2",
    "#8cd5c6",
    "#4fc1cc",
    "#28a1c8",
    "#3e76b3",
    "#4752a2",
    "#2d4070"
  ],
  planet: [
    "#f8f6fa",
    "#ece6f1",
    "#dcc4df",
    "#d4a4cf",
    "#e87bbc",
    "#f0479b",
    "#ab3271",
    "#ab2861",
    "#812844"
  ],
  earth: [
    "#fff8fc",
    "#f027f2",
    "#d7d8e9",
    "#b2c7e0",
    "#ab6d5",
    "#4ba1c8",
    "#28959b",
    "#288373",
    "#286356"
  ]
};

const GradientScale = ({
  width,
  height,
  domain,
  primary,
  secondary = [],
  colorScale = "default"
}) => {
  const data = [
    ...secondary.map(num => ({ x: num, y: 0, type: "secondary" })),
    { x: primary, y: 0, type: "primary" }
  ];
  return (
    <div>
      <svg style={{ position: "absolute" }} height="0" width="0">
        <defs>
          {colorScales[colorScale].length === 2 ? (
            <linearGradient id="myGradient">
              <stop offset="0%" stopColor={colorScales[colorScale][0]} />
              <stop
                offset="100%"
                stopColor={
                  colorScales[colorScale][colorScales[colorScale].length - 1]
                }
              />
            </linearGradient>
          ) : (
            <linearGradient id="myGradient">
              <stop offset="0%" stopColor="white" />
              {colorScales[colorScale].map((color, index) => (
                <stop offset={`${index * 9.09 + 9.09}%`} stopColor={color} />
              ))}
              <stop offset="100%" stopColor="black" />
            </linearGradient>
          )}
        </defs>
      </svg>
      <VictoryGroup
        padding={{ top: 10, bottom: 10 }}
        domain={{ x: domain, y: [0, 1] }}
        height={height}
        width={width}
      >
        <GradientBox padding={0} fill="url(#myGradient)" />
        {/* Necessary dummy component to make VictoryLine work within GradientBox work */}
        <VictoryScatter data={data} dataComponent={<GradientLine />} />
        <VictoryScatter data={data} dataComponent={<GradientLine />} />
      </VictoryGroup>
    </div>
  );
};

GradientScale.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  primary: PropTypes.number.isRequired,
  secondary: PropTypes.arrayOf(PropTypes.number)
};

GradientScale.defaultProps = {
  width: 500,
  height: 100
};

export default GradientScale;
