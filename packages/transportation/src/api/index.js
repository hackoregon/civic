import { promiseToGet } from './utils';

const ROOT_URL = 'http://service.civicpdx.org/transport/';
// const ROOT_URL = 'http://localhost:8000/transport/';

// without fma: This endpoint provides the fma id and geoms for all FMAs (Fire Management Areas).
// with fma: This viewset will provide the 'detail' action.

export const getFeatures = input => {
  let url = '';
  console.log(`api input ${input}`);
  switch (input) {
    case 'features':
      url = `${ROOT_URL}features/?source_name=Grind and Pave&startDate=2017-04-29&endDate=2020-01-01&format=json`;
      break;

    case 'conflicts':
      // url = `${ROOT_URL}conflicts?distance=100&days=14&startDate=2017-04-29&endDate=2017-06-30&format=json`;
      url = `${ROOT_URL}conflicts?distance=100&days=14&startDate=2017-04-29&endDate=2017-06-30&format=json`;
      break;

    case 'nearby':
      url = `${ROOT_URL}nearby?address=1221 SW 4th Avenue, Portland, OR&distance=200&startDate=2017-04-29&endDate=2017-12-31&format=json`;
      break;
  }
  console.log(`api url ${url}`);
  return promiseToGet(url);
};

// TODO: change base url to AWS
export const transportApi = {
  getFeatures,
};
