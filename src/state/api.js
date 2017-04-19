import qs from 'query-string';
import {
  getSelectedDemographic,
  getSelectedUnitSize,
} from './selectors/app';

export const NEIGHBORHOOD_START = 'NEIGHBORHOOD_START';
export const NEIGHBORHOOD_FAIL = 'NEIGHBORHOOD_FAIL';
export const NEIGHBORHOOD_SUCCESS = 'NEIGHBORHOOD_SUCCESS';

export const INITIAL_STATE = {
  neighborhood: {
    pending: false,
    data: null,
    error: null,
  },
};

const actionEmitter = type => payload => ({
  type,
  payload,
});

const API_HOST = 'http://service.civicpdx.org/housing';

export const neighborhoodStart = actionEmitter(NEIGHBORHOOD_START);
export const neighborhoodFail = actionEmitter(NEIGHBORHOOD_FAIL);
export const neighborhoodSuccess = actionEmitter(NEIGHBORHOOD_SUCCESS);

function api(endpoint, { buildParams, normalizer, start, success, fail }) {
  return function apiHandler() {
    return (dispatch, getState) => {
      dispatch(start());
      const queryParams = buildParams(getState());
      return fetch(`${API_HOST}${endpoint}?format=json&${qs.stringify(queryParams)}`)
        .then(res => res.json())
        .then(normalizer)
        .then((data) => {
          dispatch(success(data));
        })
        .catch((err) => {
          dispatch(fail(err));
        });
    };
  };
}

export const neighborhoodFetch = api('/affordable', {
  start: neighborhoodStart,
  success: neighborhoodSuccess,
  fail: neighborhoodFail,
  normalizer: json => json.map(demo => [
    demo.affordable ? ':D' : ':C',
    demo.demographic.name,
    demo.demographic.income_median,
    demo.neighborhood.name,
    demo.neighborhood.report_year.year,
  ]),
  buildParams: state => ({
    housing_size: getSelectedUnitSize(state),
    demographic: getSelectedDemographic(state),
  }),
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEIGHBORHOOD_START:
      return {
        ...state,
        neighborhood: {
          pending: true,
          data: null,
          error: null,
        },
      };
    case NEIGHBORHOOD_FAIL:
      return {
        ...state,
        neighborhood: {
          pending: false,
          error: action.payload,
          data: null,
        },
      };
    case NEIGHBORHOOD_SUCCESS:
      return {
        ...state,
        neighborhood: {
          pending: false,
          error: null,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
