import React from "react";
import { DataTable } from "@hackoregon/component-library";
import { budgetPieData } from "./budgetPieData";

const cols = [
  { header: "", key: "name" },
  { header: "Description", key: "longName" },
  { header: "Percentage", key: "pct", align: "right" }
];

const tableData = { columns: cols, data: budgetPieData };

const BudgetTable = () => <DataTable data={tableData} />;

export default BudgetTable;
