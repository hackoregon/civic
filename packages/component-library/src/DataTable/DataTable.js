import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
/* eslint-disable jsx-a11y/no-static-element-interactions */

// Classes
const defaultTableClass = css`
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse;
`;
const defaultHeaderClass = css`
  box-sizing: border-box;
`;
const defaultHeaderCellClass = item => css`
  border-bottom: ${item.underlined ? '1pt solid black' : ''};
  border-collapse: separate;
  padding: .25rem 1rem;
  text-align: center;
`;
const defaultColumnClass = css`
  box-sizing: border-box;
`;
const defaultColumnCellClass = item => css`
  border-bottom: 2pt solid black;
  border-collapse: separate;
  cursor: pointer;
  padding: .25rem 1rem;
  text-align: ${item.align || 'left'};
`;
const defaultRowClass = css`
`;
const defaultRowCellClass = item => css`
  border-bottom: 1pt solid lightgray;
  padding: .25rem 1rem;
  text-align: ${item.align || 'left'};
`;

// Default components
const DefaultColumn = ({ columns, sortTable, columnClass, columnCellClass }) => (
  <tr className={columnClass || defaultColumnClass}>
    {columns.map(item =>
      <th
        key={item.key}
        className={columnCellClass || defaultColumnCellClass(item)}
        colSpan={item.colSpan}
        onClick={() => sortTable(item.key)}
      >
        {item.header}
      </th>
    )}
  </tr>
);
DefaultColumn.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      key: PropTypes.string,
    })
  ).isRequired,
  columnClass: PropTypes.string,
  columnCellClass: PropTypes.string,
  sortTable: PropTypes.func.isRequired,
};

const DefaultHeader = ({ className, columns }) => (
  <tr className={className || defaultHeaderClass}>
    {columns.map(item => (
      <th
        key={item.key}
        className={defaultHeaderCellClass(item)}
        colSpan={item.colSpan || '1'}
      >
        {item.header}
      </th>
    )
    )}
  </tr>
);
DefaultHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      key: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
};

const DefaultRow = ({ data, id, columns, rowClass, rowCellClass }) => (
  <tr className={rowClass || defaultRowClass}>
    {columns.map(item => (
      <td key={id + data[item.key]} className={rowCellClass || defaultRowCellClass(item)}>
        {data[item.key]}
      </td>
    ))}
  </tr>
);
DefaultRow.propTypes = {
  data: PropTypes.shape({}).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      key: PropTypes.string,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  rowClass: PropTypes.string,
  rowCellClass: PropTypes.string,
};

export default class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asc: true,
      sorted: props.data.data,
      flattenedColumns: this.flattenColumns(props.data.columns),
    };
  }

  sortTable = (sortKey = '') => {
    const { sorted: prevSorted, asc } = this.state;
    const sorted = Object.values(prevSorted).sort(this.compare(sortKey, asc));
    this.setState((prevState) => {
      return {
        sorted,
        asc: !prevState.asc,
      };
    });
  }

  compare = (sortpivot, asc) => {
    // Returns a sorting function
    return (a, b) => {
      // force null and undefined to the bottom
      let A = a[sortpivot] === null || a[sortpivot] === undefined ? '' : a[sortpivot];
      let B = b[sortpivot] === null || b[sortpivot] === undefined ? '' : b[sortpivot];
      // force any string values to lowercase for sorting accuracy
      A = typeof a[sortpivot] === 'string' ? a[sortpivot].toLowerCase() : a[sortpivot];
      B = typeof b[sortpivot] === 'string' ? b[sortpivot].toLowerCase() : b[sortpivot];
      // Return either 1 or -1 to indicate a sort priority
      if (asc) {
        if (A > B) return 1;
        if (A < B) return -1;
        // returning 0, undefined or any falsey value will use subsequent sorts or
        // the index as a tiebreaker
        return 0;
      }
      if (A > B) return -1;
      if (A < B) return 1;
      // returning 0, undefined or any falsey value will use subsequent sorts or
      // the index as a tiebreaker
      return 0;
    };
  }

  generateHeaderAndColumns = (topLevelColumns) => {
    const { HeaderComponent, ColumnComponent } = this.props;
    const Header = HeaderComponent || DefaultHeader;
    const Column = ColumnComponent || DefaultColumn;
    const headerValues = [];
    const columnValues = [];
    Object.values(topLevelColumns)
      .forEach((item) => {
        if (item.columns) {
          headerValues.push({
            ...item,
            colSpan: item.columns.length,
            underlined: true,
          });
          columnValues.push(...item.columns);
        } else {
          headerValues.push({
            colSpan: '1',
            key: item.key,
            underlined: false,
          });
          columnValues.push({ ...item });
        }
      });
    return (
      <thead>
        { <Header columns={headerValues} /> }
        { <Column columns={columnValues} sortTable={this.sortTable} /> }
      </thead>
    );
  }

  flattenColumns = (topLevelColumns) => {
    return Object.values(topLevelColumns)
      .reduce((accumulator, currentValue) => {
        if (currentValue.columns) {
          accumulator.push(...currentValue.columns);
        } else {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, []);
  }

  render() {
    const { tableClass, RowComponent } = this.props;
    const Row = RowComponent || DefaultRow;
    return (
      <table className={tableClass || defaultTableClass}>
        { this.generateHeaderAndColumns(this.props.data.columns) }
        <tbody>
          {
            Object.keys(this.state.sorted).map(id => (
              <Row
                key={id}
                id={id}
                columns={this.state.flattenedColumns}
                data={this.state.sorted[id]}
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}

DataTable.propTypes = {
  data: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        header: PropTypes.string,
        key: PropTypes.string,
      })
    ).isRequired,
    data: PropTypes.objectOf(
      PropTypes.object,
    ).isRequired,
  }).isRequired,
  HeaderComponent: PropTypes.element,
  ColumnComponent: PropTypes.element,
  RowComponent: PropTypes.element,
  tableClass: PropTypes.string,
};
