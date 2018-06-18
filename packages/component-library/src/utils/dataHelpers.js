export const formatData = data => [].concat(
  data.map(obj => ({ type: '18-25', year: obj.year, pct: obj.pct_18_25 })),
  data.map(obj => ({ type: '26-32', year: obj.year, pct: obj.pct_26_32 })),
  data.map(obj => ({ type: '33-39', year: obj.year, pct: obj.pct_33_39 })),
  data.map(obj => ({ type: '40-49', year: obj.year, pct: obj.pct_40_49 })),
  data.map(obj => ({ type: '50+', year: obj.year, pct: obj.pct_50_plus })),
);

/*
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

