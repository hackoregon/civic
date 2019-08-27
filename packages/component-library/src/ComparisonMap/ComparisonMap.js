/* eslint-disable */
/** @jsx jsx */
import React from "react";
// import {} from "prop-types";
import { css, jsx } from "@emotion/core";
import { isEqual } from "lodash";
import Slider from "../Slider/Slider";

const sliderWrapper = css`
  margin: 2em auto;
  width: 90%;
`;

const ComparisonMap = props => {
  const {
    leftMap,
    rightMap,
    height,
    sliderStartPosition,
    initialViewport
  } = props;

  const [sliderPosition, setSliderPosition] = React.useState(
    sliderStartPosition
  );

  const [viewport, setVP] = React.useState(initialViewport);
  /* global console */
  const onVPChange = newestViewport => {
    console.log("NEW-VP:", newestViewport);
    setVP(prevVP => {
      console.log("PREV-VP:", prevVP);
      console.log("NOT EQUAL:", !isEqual(prevVP, newestViewport));
      console.log("\n");
      if (!isEqual(prevVP, newestViewport)) {
        return newestViewport;
      }
    });

    // if (nav) {
    //   return setVP(prevVP => ({...prevVP, zoom: prevVP.zoom + 1}) );
    // } else {
    //   return setVP(newestViewport);
    // }
  };

  const LeftMap = React.cloneElement(leftMap, {
    vpChange: onVPChange,
    sharedViewport: viewport
  });

  const RightMap = React.cloneElement(rightMap, {
    vpChange: onVPChange,
    sharedViewport: viewport
  });

  const container = css`
    border: 2.5px solid magenta;
    display: flex;
    flex-direction: column;
  `;

  const mapsWrapper = css`
    width: 100%;
    border: 2px solid green;
    position: relative;
    height: ${height}px;
  `;

  const leftMapWrapper = css`
    border: 1px solid blue;
    position: absolute;
    width: 100%;
    height: ${height}px;
  `;

  const rightMapWrapper = css`
    border: 1px solid red;
    position: absolute;
    width: 100%;
    height: ${height}px;
    clip-path: inset(0 0 0 ${sliderPosition}%);
  `;

  return (
    <div css={container}>
      <div css={mapsWrapper}>
        <div css={leftMapWrapper}>{LeftMap}</div>
        <div css={rightMapWrapper}>{RightMap}</div>
      </div>
      <div css={sliderWrapper}>
        <Slider
          min={5}
          max={95}
          step={5}
          value={sliderPosition}
          onChange={value => {
            setSliderPosition(value);
          }}
        />
      </div>
    </div>
  );
};

ComparisonMap.propTypes = {};

ComparisonMap.defaultProps = {};

export default ComparisonMap;
