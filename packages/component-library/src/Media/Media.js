/* Deprecated component, 2017 only */

import { css } from 'styled-components';
// these sizes are arbitrary and you can set them to whatever you wish

const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376,
};

// iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const pxSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${pxSize}px) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export default media;
