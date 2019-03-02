import axios from 'axios';

export const promiseToGet = url =>
  axios
    .get(url)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
