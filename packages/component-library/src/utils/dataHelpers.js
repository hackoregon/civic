/*
 function ungroupBy
 @data: array of objects with the same properties
 @dataSeriesKeys: array of strings of properties of data
 @dataSeriesLabels: optional array of strings with labels for dataSeriesKeys
*/

export function ungroupBy(data, dataSeriesKeys, dataSeriesLabels) {
  const arr = [];
  const labels = [];

  if (!dataSeriesLabels) {
    labels.push(...dataSeriesKeys);
  } else if (dataSeriesKeys.length === dataSeriesLabels.length) {
    labels.push(...dataSeriesLabels);
  } else {
    labels.push(...dataSeriesKeys);
  }

  dataSeriesKeys.forEach((key, index) => {
    arr.push(...data.map((obj) => {
      const retObj = Object.assign({}, obj);
      retObj.value = obj[key];
      retObj.type = labels[index];
      dataSeriesKeys.forEach(k => delete retObj[k]);
      return retObj;
    }));
  });
  return arr;
}

