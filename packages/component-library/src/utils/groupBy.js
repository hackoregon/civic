/*
function groupBy
 @data: array of objects with the same properties
 @groupByKey: the key that the objects should be grouped by

 This component is used by the horizontal bar chart to transform data for the stacked bar chart. It takes an array of objects and transforms it into an array of arrays of objects where each array containes one of each of the different values based on the groupByKey.
 */

const groupBy = (data, groupByKey) => {
  const groupedObj = data.reduce(
    (result, item) => ({
      ...result,
      [item[groupByKey]]: [...(result[item[groupByKey]] || []), item]
    }),
    {}
  );
  return Object.keys(groupedObj).map(key => groupedObj[key]);
};

export default groupBy;
