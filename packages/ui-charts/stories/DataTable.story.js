import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";

import { DataTable } from "../src";
import notes from "./dataTable.notes.md";

const title = "Simple usage";
// const description = 'A data table.';

const testData = {
  columns: [
    {
      header: "Name",
      key: "name",
      columns: [
        {
          header: "First Name",
          key: "firstName",
          align: "right"
        },
        {
          header: "Last Name",
          key: "lastName"
        }
      ]
    },
    {
      align: "center",
      header: "Age",
      key: "age"
    }
  ],
  data: {
    11: {
      firstName: "John",
      lastName: "Lennon",
      age: 29
    },
    12: {
      firstName: "Paul",
      lastName: "McCartney",
      age: 23
    },
    13: {
      lastName: "Starr",
      firstName: "Ringo",
      age: 30
    },
    14: {
      firstName: "George",
      age: 22,
      lastName: "Harrison"
    },
    15: {
      firstName: "Brian",
      age: 24,
      lastName: "Wilson"
    },
    16: {
      firstName: "Dennis",
      age: 21,
      lastName: "Wilson"
    },
    17: {
      firstName: "Carl",
      lastName: "Wilson",
      age: 26
    },
    18: {
      lastName: "Love",
      firstName: "Mike",
      age: 23
    },
    19: {
      firstName: "Al",
      age: 25,
      lastName: "Jardine"
    }
  }
};

const demoCode = () => (
  <div style={{ maxWidth: "500px", margin: "1rem auto", textAlign: "center" }}>
    <h1>DataTable</h1>
    <DataTable data={testData} />
  </div>
);

export default () =>
  storiesOf("Component Lib/Charts/Data Table", module).add(title, demoCode, {
    notes
  });
