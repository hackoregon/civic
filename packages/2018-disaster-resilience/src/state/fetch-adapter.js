import axios from "axios";

const HOST = "https://service.civicpdx.org/disaster-resilience/";
const echo = a => a;

const apiAdapter = (
  url,
  { encodeParams, start, success, failure }
) => params => dispatch => {
  dispatch(start());

  const encode = encodeParams || echo;
  const fullURL = encode(HOST + url, params);
  return axios
    .get(fullURL)
    .then(res => {
      dispatch(success(res.data));
      return res;
    })
    .catch(err => {
      dispatch(failure(err));
    });
};

export default apiAdapter;
