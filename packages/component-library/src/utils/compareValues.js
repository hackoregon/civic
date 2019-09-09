/**
 * This is a function to sort an array by key values.
 * @param {*} key - Population ex: [ {population: 2000}, {population: 1000} ]
 * @param {*} order - Ascending or Descending
 */

function compareValues(key, order = "Ascending") {
  function compareFunction(a, b) {
    if (
      !Object.prototype.hasOwnProperty.call(a, key) ||
      !Object.prototype.hasOwnProperty.call(b, key)
    ) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "Descending" ? comparison * -1 : comparison;
  }
  return compareFunction;
}

export default compareValues;
