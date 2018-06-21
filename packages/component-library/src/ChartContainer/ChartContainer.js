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

const chartLoading = css`
  text-align: center;
  background: #EEE;
  height: 100%;
`;

const chartError = css`
  text-align: center;
  background: #FDD;
  height: 100%;
`;

/**
  ChartContainer renders titles, subtitles, and provides some default styling for charts.
  It is designed to render a VictoryChart as children.

  Eventually you'll be able to pass it legends and tooltips to render as well.
*/

const ChartContainer = ({
  title,
  error,
  loading,
  subtitle,
  children,
  className,
}) => {
  const wrapperStyle = css`
    margin: 0 auto;
    max-width: 900px;
    width: 100%;
    ${className};
  `;

  let content = (
    <div>
      { title ? <h3 className={titleStyle}>{title}</h3> : null}
      { subtitle ? <span className={subtitleStyle}>{subtitle}</span> : null}
      <div className={wrapperStyle}>
        { children }
      </div>
    </div>
  );

  if (loading) {
    content = <div className={chartLoading}>Loading...</div>;
  } else if (error) {
    content = <div className={chartError}>{error}</div>;
  }

  return content;
};

ChartContainer.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

ChartContainer.defaultProps = {
};

export default ChartContainer;
