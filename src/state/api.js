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

const API_HOST = 'http://localhost:8000';

export const neighborhoodStart = actionEmitter(NEIGHBORHOOD_START);
export const neighborhoodFail = actionEmitter(NEIGHBORHOOD_FAIL);
export const neighborhoodSuccess = actionEmitter(NEIGHBORHOOD_SUCCESS);

function format(queryParams) {
  return Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
}

function api(endpoint, normalizer, start, success, fail) {
  return function apiHandler(queryParams) {
    return (dispatch) => {
      dispatch(start());
      return fetch(`${API_HOST}/housing_api${endpoint}?format=json&${format(queryParams)}`)
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

export const neighborhoodFetch = api('/affordable', json => json.map(demo => [
  demo.affordable ? ':D' : ':C',
  demo.demographic.name,
  demo.demographic.income_median,
  demo.neighborhood.name,
  demo.neighborhood.report_year.year,
]), neighborhoodStart, neighborhoodSuccess, neighborhoodFail);

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

