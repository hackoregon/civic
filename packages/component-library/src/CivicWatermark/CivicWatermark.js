import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import { css } from 'emotion';

const watermarkContainer = css`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  text-align: left;
`;

const none = css`
  display: none;
`;

const block = css`
  display: block;
`;

// This breakpoint is set so that CivicStoryCard breaks at 640px
const breakpoint = 494;

class CivicWatermark extends Component {
  render() {
    const mobileOnly = this.props.containerWidth <= breakpoint ? block : none;
    const desktopOnly = this.props.containerWidth > breakpoint ? block : none;

    return (
      <div className={watermarkContainer}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <g className={desktopOnly} fill="none" fillRule="evenodd">
            <path d="M0 134.658V0l11.566 11.597v123.061H0z" fill="#191119" />
            <path
              d="M133.864 0v11.597H11.566v.008L0 .008V0h133.864z"
              fill="#DC4556"
            />
          </g>
          <g className={mobileOnly} fill="none" fillRule="evenodd">
            <path d="M0 75V0l11.566 11.597v63.421H0z" fill="#191119" />
            <path
              d="M75 0v11.597H11.566v.008L0 .008V0h133.864z"
              fill="#DC4556"
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default Dimensions()(CivicWatermark);
