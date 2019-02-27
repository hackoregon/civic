import axios from 'axios';
import { HOST } from './utils';

const fetchManyAdapter = (urls, { start, success, failure }) => () => (dispatch) => {
  dispatch(start());

  const fullURLs = urls.map(url => HOST + url);

  // Promise resolves when the GET for every URL finishes
  return Promise.all(fullURLs.map(url => axios.get(url))).then((responses) => {
    dispatch(success(responses.map(res => res.data)));
    return responses;
  }).catch((err) => {
    dispatch(failure(err));
  });
};

export default fetchManyAdapter;
