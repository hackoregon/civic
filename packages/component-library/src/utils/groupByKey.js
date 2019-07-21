/*
function groupBy
 @data: array of objects with the same properties
 @dataSeriesKey: the key that the objects should be grouped by
 @sortByKey: the key that the objects should be sorted by

 This component is used by the horizontal bar chart to transform data for the stacked bar chart. It takes an array of objects and transforms it into an array of arrays of objects where each array containes one of each of the different values based on the dataSeriesKey.
 */

const groupByKey = (data, dataSeriesKey, sortByKey) => {

  const groupedObj = data.reduce(
    (result, item) => {
      return {
        ...result,
        [item[dataSeriesKey]]: [...(result[item[dataSeriesKey]] || []), item]
      }
    },
    {}
  );
  return Object.keys(groupedObj).map(key => {
    const arr = groupedObj[key];
    return arr.sort((a, b) => (a[sortByKey] > b[sortByKey] ? 1 : -1));
  });
};

export default groupByKey;
