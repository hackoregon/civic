import React from 'react';
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

/**
  ChartContainer renders titles, subtitles, and provides some default styling for charts.
  It is designed to render a VictoryChart as children.

  Eventually you'll be able to pass it legends and tooltips to render as well.
*/

const ChartContainer = ({
  title,
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

  return (
    <div>
      { title ? <h3 className={titleStyle}>{title}</h3> : null}
      { subtitle ? <span className={subtitleStyle}>{subtitle}</span> : null}
      <div className={wrapperStyle}>
        { children }
      </div>
    </div>
  );
};

ChartContainer.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
  subtitle: React.PropTypes.string,
  className: React.PropTypes.string,
};

ChartContainer.defaultProps = {
};

export default ChartContainer;
