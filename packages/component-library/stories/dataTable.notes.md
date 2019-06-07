# Data Table

Simple data table to display data. Can be sorted by clicking the top of each column.

      ~~~js
      <DataTable data={yourDataSource} />
      ~~~

      ## How to use
      Pass the DataTable component a data prop. The data prop is composed of two main key value pairs.

      ~~~js
      const data = {
        columns: [ ...arrayOfColumns ],
        data: { ...objectOfObjectsById },
      }
      ~~~

      ### Columns
      The columns property is used to order and construct the header of the table. It must be an array of objects, so order of data will determine order of the table.
      ##### Simple usage
      ~~~js
      const data = {
        columns: [
          {
            header: 'First Name', <- value displayed at top of column
            key: 'firstName',     <- key used to match row information in data property
            align: 'right',       <- alignment of text in column. defaults to 'left'
          },
        ],
        data: { ... },
      }
      ~~~
      ##### With column category
      If you wish group multiple columns under a category, nest all the columns within a parent column.
      ~~~js
      const data = {
        columns: [
          {
            header: 'Name', <- This value will label the category
            key: 'name',
            columns: [                  |
              {                         |
                header: 'First Name',   |
                key: 'firstName',       |
                align: 'right',         |
              },                        | <- nested data will appear in the main column header row
              {                         |
                header: 'Last Name',    |
                key: 'lastName',        |
              },                        |
            ],                          |
          },
        ],
        data: { ... },
      }
      ~~~

      ### Data
      The data property should be an object of other objects with unique identifying keys and data that matches with your column keys.
      ~~~js
      const data = {
        columns: [... ],
        data: {
          dataValues1: {
            firstName: '',  <- Data will be placed in the column with the same key
            lastName: '',   <- Data will be placed in the column with the same key
          },
          dataValues2: {
            firstName: '',
            lastName: '',
          },
          dataValues3: {
            firstName: '',
            lastName: '',
          },
          { ... },
        },
      }
      ~~~
