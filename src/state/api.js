import qs from 'query-string';

export const API_HOST = 'http://service.civicpdx.org/housing';

function get(url, { buildParams, normalizer, start, success, fail }) {
  return function apiHandler() {
    return (dispatch, getState) => {
      dispatch(start());
      const queryParams = buildParams(getState());
      return fetch(`${url}?format=json&${qs.stringify(queryParams)}`)
        .then((res) => {
          const json = res.json();
          if (res.ok) { return json; }
          return json.then((err) => {
            throw new Error(err);
          });
        })
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

export const api = (endpoint, options) => get(`${API_HOST}${endpoint}`, options);
