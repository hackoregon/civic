import qs from 'query-string';

export const API_HOST = 'http://service.civicpdx.org/housing';

export function api(endpoint, { buildParams, normalizer, start, success, fail }) {
  return function apiHandler() {
    return (dispatch, getState) => {
      dispatch(start());
      const queryParams = buildParams(getState());
      return fetch(`${API_HOST}${endpoint}?format=json&${qs.stringify(queryParams)}`)
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

export const get = (url, { normalizer, start, success, fail }) =>
  () => (dispatch) => {
    dispatch(start());
    return fetch(url)
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
