import PropTypes from "prop-types";
import checkData from "./checkData";

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

  if (!results.allKeysValid) {
    /* eslint-disable no-console */
    console.warn(
      "%cCivicCard Input Violations",
      "font-weight: bold; font-size: 30px; line-height: 40px; color: red; tex-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black"
    );
    console.warn(
      `%c${message}`,
      "font-weight: bold; font-size: 15px; line-height: 40px; color: red; tex-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black"
    );
    if (results.invalidType) {
      console.error("Invalid Type - check if array or object is expected");
    }
    const accessorMessage = (
      isValid,
      isOptional,
      isNull,
      key,
      keyValue,
      validCount,
      totalCount
    ) => {
      let keyMessage = "";
      if (isOptional) {
        keyMessage = `${key} is optional`;
      } else if (isNull) {
        keyMessage = `${key} cannot be null`;
      } else if (validCount === 0) {
        keyMessage = `${key} is invalid. "${keyValue}" not found in data`;
      } else if (!isValid) {
        return `${key} is invalid. "${keyValue}" missing in ${totalCount -
          validCount}/${totalCount} objects in data`;
      }

      /* eslint-disable no-nested-ternary */
      return `
        ${
          isOptional ? "✅ Optional --" : isValid && !isNull ? "✅" : "🥺"
        } ${key}: ${keyValue && JSON.stringify(keyValue, undefined, 2)}
        ${keyMessage || ""}
      `;
      /* eslint-enable no-nested-ternary */
    };

    const dataAccessorViolations = keys.map((key, index) => {
      const isValid =
        results[values[index]].valid === results[values[index]].total;
      const isOptional = optionalKeys[key];
      const { isNull } = results[values[index]];
      const validCount = results[values[index]].valid;
      const totalCount = results[values[index]].total;
      const keyValue = values[index];
      return accessorMessage(
        isValid,
        isOptional,
        isNull,
        key,
        keyValue,
        validCount,
        totalCount
      );
    });

    console.warn(`
      Data Accessors\n
      ${dataAccessorViolations.join("\n")}
    `);
    /* eslint-enable no-console */
  }
  return children;
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
