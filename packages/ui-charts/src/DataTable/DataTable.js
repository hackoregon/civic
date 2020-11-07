/* eslint-disable import/prefer-default-export */
import { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";
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
  border-bottom: ${item.underlined ? "1pt solid black" : ""};
  border-collapse: separate;
  padding: 0.25rem 1rem;
  text-align: center;
`;
const defaultColumnClass = css`
  box-sizing: border-box;
`;
const defaultColumnCellClass = item => css`
  border-bottom: 2pt solid black;
  border-collapse: separate;
  cursor: pointer;
  padding: 0.25rem 1rem;
  text-align: ${item.align || "left"};
`;
const defaultRowClass = css``;
const defaultRowCellClass = item => css`
  border-bottom: 1pt solid lightgray;
  padding: 0.25rem 1rem;
  text-align: ${item.align || "left"};
`;

// Default components
const DefaultColumn = ({
  columns,
  sortTable,
  columnClass,
  columnCellClass
}) => (
  <tr css={columnClass || defaultColumnClass}>
    {columns.map(item => (
      <th
        key={shortid.generate()}
        css={columnCellClass || defaultColumnCellClass(item)}
        colSpan={item.colSpan}
        onClick={() => sortTable(item.key)}
      >
        {item.header}
      </th>
    ))}
  </tr>
);
DefaultColumn.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      key: PropTypes.string
    })
  ).isRequired,
  columnClass: PropTypes.string,
  columnCellClass: PropTypes.string,
  sortTable: PropTypes.func.isRequired
};

const DefaultHeader = ({ styles, columns }) => (
  <tr css={styles || defaultHeaderClass}>
    {columns.map(item => (
      <th
        key={shortid.generate()}
        css={defaultHeaderCellClass(item)}
        colSpan={item.colSpan || "1"}
      >
        {item.header}
      </th>
    ))}
  </tr>
);
DefaultHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      key: PropTypes.string
    })
  ).isRequired,
  styles: PropTypes.string
};

const DefaultRow = ({ data, columns, rowClass, rowCellClass }) => (
  <tr css={rowClass || defaultRowClass}>
    {columns.map(item => (
      <td
        key={shortid.generate()}
        css={rowCellClass || defaultRowCellClass(item)}
      >
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
      key: PropTypes.string
    })
  ).isRequired,
  rowClass: PropTypes.string,
  rowCellClass: PropTypes.string
};

export class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asc: true,
      sorted: props.data.data,
      flattenedColumns: this.flattenColumns(props.data.columns)
    };
  }

  compare = (sortpivot, asc) => {
    // Returns a sorting function
    return (a, b) => {
      // force null and undefined to the bottom
      let A =
        a[sortpivot] === null || a[sortpivot] === undefined ? "" : a[sortpivot];
      let B =
        b[sortpivot] === null || b[sortpivot] === undefined ? "" : b[sortpivot];
      // force any string values to lowercase for sorting accuracy
      A =
        typeof a[sortpivot] === "string"
          ? a[sortpivot].toLowerCase()
          : a[sortpivot];
      B =
        typeof b[sortpivot] === "string"
          ? b[sortpivot].toLowerCase()
          : b[sortpivot];
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
  };

  flattenColumns = topLevelColumns => {
    return Object.values(topLevelColumns).reduce(
      (accumulator, currentValue) => {
        if (currentValue.columns) {
          accumulator.push(...currentValue.columns);
        } else {
          accumulator.push(currentValue);
        }
        return accumulator;
      },
      []
    );
  };

  generateHeaderAndColumns = topLevelColumns => {
    const { HeaderComponent, ColumnComponent } = this.props;
    const Header = HeaderComponent || DefaultHeader;
    const Column = ColumnComponent || DefaultColumn;
    const headerValues = [];
    const columnValues = [];
    Object.values(topLevelColumns).forEach(item => {
      if (item.columns) {
        headerValues.push({
          ...item,
          colSpan: item.columns.length,
          underlined: true
        });
        columnValues.push(...item.columns);
      } else {
        headerValues.push({
          colSpan: "1",
          key: item.key,
          underlined: false
        });
        columnValues.push({ ...item });
      }
    });
    return (
      <thead>
        {<Header columns={headerValues} />}
        {<Column columns={columnValues} sortTable={this.sortTable} />}
      </thead>
    );
  };

  sortTable = (sortKey = "") => {
    const { sorted: prevSorted, asc } = this.state;
    const sorted = Object.values(prevSorted).sort(this.compare(sortKey, asc));
    this.setState(prevState => {
      return {
        sorted,
        asc: !prevState.asc
      };
    });
  };

  render() {
    const { data, tableClass, RowComponent } = this.props;
    const { sorted, flattenedColumns } = this.state;
    const Row = RowComponent || DefaultRow;
    return (
      <table css={tableClass || defaultTableClass}>
        {this.generateHeaderAndColumns(data.columns)}
        <tbody>
          {Object.keys(sorted).map(id => (
            <Row
              key={shortid.generate()}
              id={id}
              columns={flattenedColumns}
              data={sorted[id]}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

DataTable.propTypes = {
  /** Data and column headers and mappings  */
  data: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        header: PropTypes.string,
        key: PropTypes.string
      })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired,
  /** Custom header component */
  HeaderComponent: PropTypes.element,
  /** Custom column component */
  ColumnComponent: PropTypes.element,
  /** Custom row component */
  RowComponent: PropTypes.element,
  /** Emotion css prop applied to the table */
  tableClass: PropTypes.string
};

DataTable.displayName = "DataTable";
