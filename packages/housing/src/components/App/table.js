/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';

function Table({ rows }) {
  return (
    <table>
      <tbody>
        {rows.map(row => (
          <tr>
            {row.map(record => (
              <td>{record}</td>
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
  rows: React.PropTypes.arrayOf(),
};

export default Table;
