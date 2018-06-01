import React, { Component } from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './hex-deckgl-overlay.js';
import PropTypes from 'prop-types';
import {csv as requestCsv} from 'd3-request';
import { css } from 'emotion';

const HexOverlay = (props) => {
  const { data, viewport, mapboxStyle, mapboxToken } = props;

  const mapWrapper = css`
  margin: auto;
  max-width: 900px;
  `;
  const colorScale = r => [r * 255, 140, 200 * (1 - r)];

  return (
    <div className={mapWrapper}>
        <DeckGLOverlay viewport={viewport}
                       data={data || []}
                       colorScale={colorScale}
        />
    </div>
  );
}

export default HexOverlay;
