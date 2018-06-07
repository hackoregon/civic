import React from 'react';
import { css } from 'emotion';

const titleStyle = css`
  font-size: 40px;
  font-weight: 500;
  text-align: center;
  margin: 40px 0 12px 0;
`;

const subtitleStyle = css`
  display: block;
  font-size: 18px;
  text-align: center;
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
