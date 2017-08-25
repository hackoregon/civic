import React from 'react';

const CustomPieLegend = (options) => {
  const { payload } = options;

  const styles = {
    display: 'inline-block', verticalAlign: 'middle', marginRight: 8,
  };

  return (
    <ul className="recharts-default-legend" style={{ textAlign: 'center' }}>
      {
        payload.map((entry, index) => {
          const active = entry.value === options.active ? 'active' : '';
          return (
            <li
              key={entry.value}
              style={styles}
              className={`recharts-legend-item legend-item-${index} ${active}`}
              role="button"
            >
              <svg className="recharts-surface" width={options.iconSize} height={options.iconSize} viewBox="0 0 32 32" version="1.1" style={styles}>
                <path fill={entry.color} className="recharts-symbols" transform="translate(16,16)" d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0" />
              </svg>
              {entry.value}
            </li>
          );
        })
      }
    </ul>
  );
};

export default CustomPieLegend;
