import React, { Component } from 'react';
import {render} from 'react-dom';
import DeckGLOverlay from './hex-deckgl-overlay.js';
import PropTypes from 'prop-types';
import {csv as requestCsv} from 'd3-request';
import { css } from 'emotion';

const HexOverlay = (props) => {
  const { viewport, data, opacity, radius, elevation } = props;

  const mapWrapper = css`
  margin: auto;
  max-width: 900px;
  `;
  const colorScale = r => [r * 255, 140, 200 * (1 - r)];

  return (
    <DeckGLOverlay viewport={viewport} data={data || []}
    colorScale={colorScale} opacity={opacity} radius={radius} elevation={elevation}
    />
  );
}

export default HexOverlay;
