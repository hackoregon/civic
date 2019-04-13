// A redux action utility for making a thunk based on an api
// ex. const exampleAPI = apiAdapter('service.civicpdx.org/example/api/', { start, success });
//     dispatch(exampleAPI())
import axios from "axios";

const apiAdapter = (url, { start, success, error }) => () => dispatch => {
  dispatch(start());
  return axios
    .get(url)
    .then(res => {
      dispatch(success(res));
    })
    .catch(err => {
      dispatch(error(err));
    });
};

export default apiAdapter;
