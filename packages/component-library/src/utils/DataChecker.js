import React, { Fragment } from "react";
import { string, shape } from "prop-types";
import { css } from "emotion";
import checkData from "./checkData";

/**
 * Helper function to show invalid property values as code
 *
 * Takes in an `properties` object of and and an optional message string
 */
const wrapperStyle = css`
  margin: 0 auto;
  max-width: 900px;
  width: 90%;
`;

const DataChecker = ({ data, dataAccessors, message, children }) => {
  const keys = Object.keys(dataAccessors);
  const values = Object.values(dataAccessors);
  const results = checkData(data, values);
  const component = results.allKeysValid ? (
    children
  ) : (
    <div className={wrapperStyle}>
      <h1>{message}</h1>
      <h2>Data Accessors</h2>
      {keys.map((key, index) => {
        const isValid =
          results[values[index]].valid === results[values[index]].total;
        const validCount = results[values[index]].valid;
        const totalCount = results[values[index]].total;
        const keyValue = values[index];
        const invalidStyle = !isValid
          ? css`
              color: red;
            `
          : css``;
        return (
          <pre className={invalidStyle}>
            <strong>
              {isValid ? "✅ " : "⛔️ "}
              {`${key}: `}
            </strong>
            {JSON.stringify(keyValue, undefined, 2)}
            {!isValid && (
              <Fragment>
                <br />
                <small>
                  {validCount === 0
                    ? `${key} is invalid. "${keyValue}" not found in data`
                    : `${key} is invalid. "${keyValue}" missing in ${totalCount -
                        validCount}/${totalCount} objects in data`}
                </small>
              </Fragment>
            )}
          </pre>
        );
      })}
      <h2>Data</h2>
      <pre>
        <strong>data: </strong>
        {JSON.stringify(data, undefined, 2)}
      </pre>
    </div>
  );
  return component;
};

DataChecker.propTypes = {
  dataAccessors: shape({}),
  message: string
};

DataChecker.defaultProps = {
  message: "Invalid Data"
};

export default DataChecker;
