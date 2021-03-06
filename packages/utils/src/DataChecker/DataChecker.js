import { Fragment } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";
import checkData from "../utils/checkData";

const wrapperStyle = css`
  margin: 0 auto;
  max-width: 900px;
  width: 90%;
`;

const DataChecker = ({
  data,
  dataIsObject,
  dataAccessors,
  optionalKeys,
  message,
  children
}) => {
  const keys = Object.keys(dataAccessors);
  const values = Object.values(dataAccessors);
  const results = checkData(data, values, dataIsObject, optionalKeys);
  const component = results.allKeysValid ? (
    children
  ) : (
    <div css={wrapperStyle}>
      <h1>{message}</h1>
      {results.invalidType && (
        <h2>Invalid Type - check if array or object is expected</h2>
      )}
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
          <pre key={shortid.generate()} css={invalidStyle}>
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
        {!dataIsObject && JSON.stringify(data, undefined, 2)}
      </pre>
    </div>
  );
  return component;
};

DataChecker.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({}))
  ]).isRequired,
  dataAccessors: PropTypes.objectOf(PropTypes.string).isRequired,
  message: PropTypes.string,
  optionalKeys: PropTypes.shape({})
};

DataChecker.defaultProps = {
  message: "Invalid Data",
  dataIsObject: false
};

export default DataChecker;
