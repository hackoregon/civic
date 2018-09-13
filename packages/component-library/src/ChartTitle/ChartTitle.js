import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const titleStyle = css`
  display: block;
  font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

const subtitleStyle = css`
  display: block;
  font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
`;

const ChartTitle = ({ title, subtitle }) =>
  title || subtitle ? (
    <div>
      {title ? <h3 className={titleStyle}>{title}</h3> : null}
      {subtitle ? <span className={subtitleStyle}>{subtitle}</span> : null}
    </div>
  ) : null;

ChartTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

ChartTitle.defaultProps = {};

export default ChartTitle;
