import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { bool, node, number, shape, string } from "prop-types";
import CompareSlider from "./CompareSlider";

const ComparisonMap = props => {
  const {
    height,
    initialViewport,
    leftMap,
    leftMapTitle,
    rightMap,
    rightMapTitle,
    showDivider,
    sliderStartPosition
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

  const divider = css`
    z-index: 1;
    position: absolute;
    left: calc(${sliderPosition}% - 1px); // The 1px is to adjust for the border
    width: 0px;
    height: ${height}px;
    border: 1px solid white;
  `;

  const mapTitleWrapper = css`
    padding: 5px 10px 0 10px;
    display: flex;
    justify-content: space-between;
  `;

  const titleStyle = css`
    font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  `;

  const sliderMin = 5;
  const sliderMax = 95;
  const sliderWrapper = css`
    z-index: 1;
    position: absolute;
    top: ${height / 2}px;
    height: 0;
    left: ${sliderMin}%;
    width: ${sliderMax - sliderMin}%;
  `;

  return (
    <div css={container}>
      <div css={mapsWrapper}>
        <div css={mapTitleWrapper}>
          {leftMapTitle && <h2 css={titleStyle}>{leftMapTitle}</h2>}
          {rightMapTitle && <h2 css={titleStyle}>{rightMapTitle}</h2>}
        </div>
        {showDivider && <div css={divider} />}
        <div css={sliderWrapper}>
          <CompareSlider
            min={sliderMin}
            max={sliderMax}
            value={sliderPosition}
            onChange={value => {
              setSliderPosition(value);
            }}
          />
        </div>
        <div css={leftMapWrapper}>{LeftMap}</div>
        <div css={rightMapWrapper}>{RightMap}</div>
      </div>
    </div>
  );
};

ComparisonMap.propTypes = {
  height: number,
  initialViewport: shape({}),
  leftMap: node.isRequired,
  leftMapTitle: string,
  rightMap: node.isRequired,
  rightMapTitle: string,
  showDivider: bool,
  sliderStartPosition: number
};

ComparisonMap.defaultProps = {
  height: 550,
  leftMapTitle: "",
  rightMapTitle: "",
  showDivider: true,
  sliderStartPosition: 50
};

export default ComparisonMap;
