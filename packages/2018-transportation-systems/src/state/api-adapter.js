// A redux action utility for making a thunk based on an async file import
// ex. const someJsonInRepo = importAdapter('../assets/some.json', { start, success });
//     dispatch(someJsonInRepo())
import axios from 'axios';

const apiAdapter = (url, { start, success }) => () => (dispatch) => {
  dispatch(start());
  const apiPromise = axios.get(url);
  return apiPromise.then((res) => {
    dispatch(success(res));
  });
};

export default apiAdapter;
