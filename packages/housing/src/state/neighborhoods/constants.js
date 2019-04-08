export const GEOJSON_STATIC_LOCATION =
  'https://s3-us-west-2.amazonaws.com/hacko-cdn/2017-housing/neighborhoods.geojson';

export const INITIAL_STATE = {
  pending: false,
  data: null,
  error: null,
};

const CALL_START = 'NEIGHBORHOODS/START';
const CALL_FAIL = 'NEIGHBORHOODS/FAIL';
const CALL_SUCCESS = 'NEIGHBORHOODS/SUCCESS';

export const actionTypes = {
  CALL_START,
  CALL_FAIL,
  CALL_SUCCESS,
};
