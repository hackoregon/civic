import axios from "axios";

export const promiseToGet = url =>
  axios
    .get(url)
    .then(response => response.data)
    .catch(error => error);
