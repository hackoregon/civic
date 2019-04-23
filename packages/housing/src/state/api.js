import qs from "query-string";

export const API_HOST = "https://service.civicpdx.org/housing";

/**
 * buildUrl parameter is an optional function that will be passed the full redux state and the
 * (potentially) partial url you pass in as the first argument. See below for 'api' default
 */
export const get = (
  partialUrl,
  { buildUrl = (state, url) => url, normalizer, start, success, fail }
) => () => (dispatch, getState) => {
  dispatch(start());
  return fetch(buildUrl(getState(), partialUrl)) // NOTE - what is this global fetch?
    .then(res => {
      const json = res.json();
      if (res.ok) {
        return json;
      }
      return json.then(err => {
        throw new Error(err);
      });
    })
    .then(normalizer)
    .then(data => {
      dispatch(success(data));
    })
    .catch(err => {
      dispatch(fail(err));
    });
};

export const api = (endpoint, { buildParams, ...rest }) => {
  const buildUrl = (state, partialUrl) => {
    const params = qs.stringify(buildParams(state));
    return `${API_HOST}${partialUrl}?format=json${params ? `&${params}` : ""}`;
  };
  return get(endpoint, { buildUrl, ...rest });
};
