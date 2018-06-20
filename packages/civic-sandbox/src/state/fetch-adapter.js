import axios from 'axios';

const echo = a => a;

const apiAdapter = (url, { start, success, failure }) => () => (dispatch) => {
  dispatch(start());
  return axios.get(url).then((res) => {
    dispatch(success(res.data));
    return res;
  }).catch((err) => {
    dispatch(failure(err));
  });
};

export const fetchAllAdapter = (urls, { start, success, failure }) => () => (dispatch) => {
  dispatch(start());
  const fullUrls = urls.map(url => axios.get(url));
  return axios.all(fullUrls).then(axios.spread((...res) => {
    dispatch(success(res.map(r => r.data)));
    return res;
  })).catch((err) => {
    dispatch(failure(err));
  });
};

export default apiAdapter;
