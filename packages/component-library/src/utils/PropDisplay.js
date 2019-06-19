import React from "react";
import { string, shape } from "prop-types";
import { css } from "emotion";

/**
 * Helper function to show invalid property values as code
 *
 * Takes in an `properties` object and and a message
 */
const wrapperStyle = css`
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
`;

const PropertyDisplay = ({ properties, message }) => {
  const keys = Object.keys(properties);
  const values = Object.values(properties);
  return (
    <div className={wrapperStyle}>
      <h1>{message}</h1>
      {keys.map((key, index) => (
        <pre>
          <strong>{key}: </strong>
          {JSON.stringify(values[index], undefined, 2)}
        </pre>
      ))}
    </div>
  );
};

PropertyDisplay.propTypes = {
  properties: shape({}),
  message: string
};

PropertyDisplay.defaultProps = {
  message: "Invalid Data Props"
};

export default PropertyDisplay;
