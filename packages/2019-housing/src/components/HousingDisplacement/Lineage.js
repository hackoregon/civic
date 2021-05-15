/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import { DataGrid } from "@material-ui/data-grid";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";

const variablesColumns = [
  { field: "field", headerName: "Field", width: 150 },
  { field: "name", headerName: "Name", width: 100 },
  { field: "type", headerName: "Type", width: 100 },
  { field: "description", headerName: "Description", width: 800 }
];

const variablesRows = [
  {
    id: 1,
    field: "sample_a_count",
    name: "Sample A",
    type: "Count",
    description:
      "A count of sample A, with a brief description of that clarifies how sample A was counted"
  },
  {
    id: 2,
    field: "sample_b_count",
    name: "Sample B",
    type: "Count",
    description:
      "A count of sample B, with a brief description of that clarifies how sample B was counted"
  },
  {
    id: 3,
    field: "sample_c_average",
    name: "Sample B",
    type: "Average",
    description:
      "An average of sample B, with a brief description of that clarifies how sample C was averaged"
  }
];

function VariablesTable() {
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <DataGrid
        rows={variablesRows}
        columns={variablesColumns}
        autoHeight
        hideFooter
      />
    </div>
  );
}

const definitionsColumns = [
  { field: "term", headerName: "Term", width: 150 },
  { field: "definition", headerName: "Definition", width: 800 }
];

const definitionsRows = [
  {
    id: 1,
    term: "Sample term",
    definition:
      "A count of sample A, with a brief description of that clarifies how sample A was counted"
  },
  {
    id: 2,
    term: "Sample term B",
    definition:
      "A count of sample B, with a brief description of that clarifies how sample B was counted"
  }
];

function DefinitionsTable() {
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <DataGrid
        rows={definitionsRows}
        columns={definitionsColumns}
        autoHeight
        hideFooter
      />
    </div>
  );
}

const ContentA = () => (
  <Fragment>
    <h3>Key Definitions</h3>
    <DefinitionsTable />
    <h4>
      <a href="#">See full dataset documentation</a>
    </h4>
    <h3>Key Variables</h3>
    <VariablesTable />
    <h4>
      <a href="#">See full dataset documentation</a>
    </h4>
    <h3>Assumptions</h3>
    <h3>Sources</h3>
    <ul>
      <li>
        <a href="#">Source dataset from sample organization A</a>
      </li>
      <li>
        <a href="#">Source dataset from sample organization B</a>
      </li>
    </ul>
  </Fragment>
);
const ContentB = () => (
  <Fragment>
    <h3>Key Definitions</h3>
    <DefinitionsTable />
    <h4>
      <a href="#">See full dataset documentation</a>
    </h4>
    <h3>Key Variables</h3>
    <VariablesTable />
    <h4>
      <a href="#">See full dataset documentation</a>
    </h4>
    <h3>Assumptions</h3>
    <h3>Sources</h3>
    <ul>
      <li>
        <a href="#">Source dataset from sample organization A</a>
      </li>
      <li>
        <a href="#">Source dataset from sample organization B</a>
      </li>
    </ul>
  </Fragment>
);

const Lineage = () => (
  <AccordianContentContainer>
    <DataTabs DatasetA={ContentA} DatasetB={ContentB} />
  </AccordianContentContainer>
);

export default Lineage;
