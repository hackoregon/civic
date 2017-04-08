import axios from 'axios';

export const promiseToGet = (url, init) => axios.get(url, init)
  .then(response => {
    console.log(response.data)
    return response.data;
  })
  .catch(error => {
    console.log(error);
    return error;
  });
