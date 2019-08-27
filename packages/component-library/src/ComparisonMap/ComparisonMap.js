/* eslint-disable */
/** @jsx jsx */
import React from "react";
import Slider from "../Slider/Slider";
import { css, jsx } from "@emotion/core";
import { node, number, shape } from "prop-types";

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

  const LeftMap = React.cloneElement(leftMap, {
    onSharedViewportChange: setVP,
    sharedViewport: viewport,
    navigation: false,
    mapGLOptions: { keyboard: false },
    updateViewport: false
  });

  const RightMap = React.cloneElement(rightMap, {
    onSharedViewportChange: setVP,
    sharedViewport: viewport,
    navigation: false,
    mapGLOptions: { keyboard: false },
    updateViewport: false
  });

  const container = css`
    display: flex;
    flex-direction: column;
  `;

  const mapsWrapper = css`
    width: 100%;
    position: relative;
    height: ${height}px;
  `;

  const leftMapWrapper = css`
    position: absolute;
    width: 100%;
    height: ${height}px;
  `;

  const rightMapWrapper = css`
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

ComparisonMap.propTypes = {
  leftMap: node,
  rightMap: node,
  height: number,
  sliderStartPosition: number,
  initialViewport: shape({})
};

ComparisonMap.defaultProps = {
  height: 550,
  sliderStartPosition: 50
};

export default ComparisonMap;
