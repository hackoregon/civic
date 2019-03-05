// A redux action utility for making a thunk based on an api
// ex. const exampleAPI = apiAdapter('service.civicpdx.org/example/api/', { start, success });
//     dispatch(exampleAPI())
import axios from 'axios';

export default (url, params, { start, success, error }) => () => dispatch => {
  dispatch(start());

  return axios
    .get(url, { params })
    .then(res => dispatch(success(res)))
    .catch(err => dispatch(error(err)));
};
