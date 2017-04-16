/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';

function Table({ rows }) {
  return (
    <table>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((record, index) => (
              <td key={index}>{record}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.defaultProps = {
  rows: [],
};

Table.propTypes = {
  rows: React.PropTypes.array,
};

export default Table;
