const c = "‌‌​"; // U+200B (zero-width space character)

/**
 * This function protects data attributes from being accessed by d3-interpolate
 * to work around https://github.com/FormidableLabs/victory/issues/928
 *
 * @param {array} data - An array of data objects
 * @param {object} dataAccessors - An object with { dataKey, dataValue, etc ..}
 * @return {array} An array with each element transformed for each dataAcccessor to add a zero-width space character
 */

function protectData(data, dataAccessors) {
  return data.map(d => {
    return {
      ...d,
      ...Object.fromEntries(
        Object.values(dataAccessors).map(property => {
          return [property, `${d[property]}${c}`];
        })
      )
    };
  });
}

export default protectData;
