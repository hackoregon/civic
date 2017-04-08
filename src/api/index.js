import { promiseToGet } from './utils';

const ROOT_URL = 'http://hacko-integration-658279555.us-west-2.elb.amazonaws.com/emergency/';

export const getAgencies = (inputs = {}) => {
  const { agency_id } = inputs;

  let url;
  if(agency_id) {
    url = `${ROOT_URL}/agencies/${agency_id}`;
  } else {
    url = `${ROOT_URL}/agencies/`;
  }

  return promiseToGet(url);
}

export const fireApi = {
  getAgencies,
  
}
