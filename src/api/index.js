import { promiseToGet } from './utils';

const ROOT_URL = 'http://hacko-integration-658279555.us-west-2.elb.amazonaws.com/emergency/';

//without id: This viewset lists the agencies that respond to emergency incidents within Portland.
//with id: This viewset retrievies a specific agency.
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

//This viewset lists the levels of alarms.
export const getAlarmLevels = () => {
  const url = `${ROOT_URL}/alarmlevels/`;
  return promiseToGet(url);
}

//without incidents: This endpoint filters for a fireblock based on the latitude and longitude.
//with incidents: This endpoint filters for incidents within a specific fireblock.
export const getFireblock = (inputs = {}) => {
  const { incidents } = inputs;
  let url;

  if(incidents) {
    url = `${ROOT_URL}/fireblock/${incidents}`;
  } else {
    url = `${ROOT_URL}/fireblock/`;
  }

  return promiseToGet(url);
}

//This viewset will provide a list of Fireblocks.
export const getFireblocks = () => {
  const url = `${ROOT_URL}/fireblocks/`;
  return promiseToGet(url);
}

//without incidents: This endpoint finds an FMA based on a latitude and longitude. It returns an id, the geom, and demographic stats about a FMA.
//with incidents: This view returns all incidents for a FMA based on a latitude and longitude.
export const getFma = (inputs = {}) => {
  const { incidents } = inputs;
  let url;

  if(incidents) {
    url = `${ROOT_URL}/fma/${incidents}`;
  } else {
    url = `${ROOT_URL}/fma/`;
  }

  return promiseToGet(url);
}

//without fma: This endpoint provides the fma id and geoms for all FMAs (Fire Management Areas).
//with fma: This viewset will provide the 'detail' action.
export const getFmas = (inputs = {}) => {
  const { fma } = inputs;
  let url;

  if(fma) {
    url = `${ROOT_URL}/fmas/${fma}`;
  } else {
    url = `${ROOT_URL}/fmas/`;
  }

  return promiseToGet(url);
}

//just incidents: This viewset will provide the 'list' action.
//incidents and found: This viewset will provide 'list' action.
//incidents, found and incident found id: This viewset will provide 'detail' action.
//incidents and foundclass: This viewset will provide 'list' action.
//incidents, foundclass and found class id: This viewset will provide 'detail' action.
//incidents and foundclass_sub: This viewset will provide 'list' action.
//incidents, foundclass_sub and foundclass_sub id: This viewset will provide 'detail' action.
//incidents and info: This viewset will provide the details of an incident, returning the incident model, related incident_times, and responder units. It will also return a calculated response_time for the incident
//incidents and times: This viewset will provide 'list' and 'detail' actions.
//incidents, times and times id: This viewset will provide the 'detail' action.
//incidents and totals: This viewset will provide 'list' and 'detail' actions.
export const getIncidents = (inputs = {}) => {
  const { found, incsitfound_id, foundclass, incsitfoundclass_id, foundclass_sub, incsitfoundsub_id, info, times, inctimes_id, totals  } = inputs;
  let url;

  if(found && !incsitfound_id) {
    url = `${ROOT_URL}/incidents/${found}`;
  } else if(found && incsitfound_id) {
    url = `${ROOT_URL}/incidents/${found}/${incsitfound_id}`;
  } else if(foundclass && !incsitfoundclass_id) {
    url = `${ROOT_URL}/incidents/${foundclass}`;
  } else if(foundclass && incsitfoundclass_id) {
    url = `${ROOT_URL}/incidents/${foundclass}/${incsitfoundclass_id}`;
  } else if(foundclass_sub && !incsitfoundsub_id) {
    url = `${ROOT_URL}/incidents/${foundclass_sub}`;
  } else if(foundclass_sub && incsitfoundsub_id) {
    url = `${ROOT_URL}/incidents/${foundclass_sub}/${incsitfoundsub_id}`;
  } else if(info) {
    url = `${ROOT_URL}/incidents/${info}`;
  } else if(times && !inctimes_id) {
    url = `${ROOT_URL}/incidents/${times}`;
  } else if(times && inctimes_id) {
    url = `${ROOT_URL}/incidents/${times}/${inctimes_id}`;
  } else if(totals) {
    url = `${ROOT_URL}/incidents/${totals}`;
  } else {
    url = `${ROOT_URL}/incidents/`;
  }

  return promiseToGet(url);
}



export const fireApi = {
  getAgencies,
  getAlarmLevels,
  getFireblock,
  getFireblocks
}
