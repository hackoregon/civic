import React from 'react';
import PropTypes from 'prop-types';

import { VictoryGroup, VictoryScatter } from 'victory';

import GradientLine from './GradientLine';
import GradientBox from './GradientBox';

const GradientScale = ({ width, height, domain, primary, secondary = [] }) => {
  const data = [
    ...secondary.map(num => ({ x: num, y: 0, type: 'secondary' })),
    { x: primary, y: 0, type: 'primary' },
  ];
  return (
    <div>
      <svg style={{ position: 'absolute' }} height="0" width="0">
        <defs>
          <linearGradient id="myGradient">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#19B7AA" />
          </linearGradient>
        </defs>
      </svg>
      <VictoryGroup
        padding={{ top: 10, bottom: 10 }}
        domain={{ x: domain, y: [0, 1] }}
        height={height}
        width={width}
      >
        <GradientBox padding={0} fill="url(#myGradient)" />
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
  secondary: PropTypes.arrayOf(PropTypes.number),
};

GradientScale.defaultProps = {
  width: 500,
  height: 100,
};

export default GradientScale;
