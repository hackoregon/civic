import qs from 'query-string';

export const API_HOST = 'http://service.civicpdx.org/housing';

// const makeCall = (url, dispatch, { normalizer, start, success, fail }) => fetch(url)
//   .then((res) => {
//     const json = res.json();
//     if (res.ok) { return json; }
//     return json.then((err) => {
//       throw new Error(err);
//     });
//   })
//   .then(normalizer)
//   .then((data) => {
//     dispatch(success(data));
//   })
//   .catch((err) => {
//     dispatch(fail(err));
//   });

/**
 * buildUrl parameter is an optional function that will be passed the full redux state and the
 * (potentially) partial url you pass in as the first argument. See below for 'api' default
 */
export const get = (partialUrl, {
  buildUrl = (state, url) => url,
  normalizer,
  start,
  success,
  fail,
}) =>
  () => (dispatch, getState) => {
    dispatch(start());
    return fetch(buildUrl(getState(), partialUrl))
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

export const api = (endpoint, { buildParams, ...rest }) => {
  const buildUrl = (state, partialUrl) =>
    `${API_HOST}${partialUrl}?format=json&${qs.stringify(buildParams(state))}`;

  return get(endpoint, { buildUrl, ...rest });
};
