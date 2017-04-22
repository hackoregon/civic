import { promiseToGet } from './utils';

const ROOT_URL = 'http://service.civicpdx.org/emergency';

// without id: This viewset lists the agencies that respond to emergency incidents within Portland.
// with id: This viewset retrievies a specific agency.
export const getAgencies = (inputs = {}) => {
  const { agencyId } = inputs;
  let url;
  if (agencyId) {
    url = `${ROOT_URL}/agencies/${agencyId}`;
  } else {
    url = `${ROOT_URL}/agencies/`;
  }
  console.log('url', url);
  return promiseToGet(url);
};

// This viewset lists the levels of alarms.
export const getAlarmLevels = () => {
  const url = `${ROOT_URL}/alarmlevels/`;
  return promiseToGet(url);
};

// without incidents: This endpoint filters for a fireblock based on the latitude and longitude.
// with incidents: This endpoint filters for incidents within a specific fireblock.
export const getFireblock = (inputs = {}) => {
  const { incidents } = inputs;
  let url;

  if (incidents) {
    url = `${ROOT_URL}/fireblock/${incidents}`;
  } else {
    url = `${ROOT_URL}/fireblock/`;
  }

  return promiseToGet(url);
};

// This viewset will provide a list of Fireblocks.
export const getFireblocks = () => {
  const url = `${ROOT_URL}/fireblocks/`;
  return promiseToGet(url);
};

// without incidents: This endpoint finds an FMA based on a latitude and longitude.
// It returns an id, the geom, and demographic stats about a FMA.
// with incidents: This view returns all incidents for a FMA based on a latitude and
// longitude.
export const getFma = (inputs = {}) => {
  const { incidents } = inputs;
  let url;

  if (incidents) {
    url = `http://localhost:8000/transport/features?source_name=Grind and Pave`;
  } else {
    url = `http://localhost:8000/transport/features?source_name=Grind and Pave`;
  }

  return promiseToGet(url);
};

// without fma: This endpoint provides the fma id and geoms for all FMAs (Fire Management Areas).
// with fma: This viewset will provide the 'detail' action.
export const getFmas = (inputs = {}) => {
  const { fma } = inputs;
  let url;

  if (fma) {
    url = `http://localhost:8000/transport/features?source_name=Grind and Pave`;
  } else {
    url = `http://localhost:8000/transport/features?source_name=Grind and Pave`;
  }

  return promiseToGet(url);
};

// just incidents: This viewset will provide the 'list' action.
// incidents and found: This viewset will provide 'list' action.
// incidents, found and incident found id: This viewset will provide 'detail' action.
// incidents and foundclass: This viewset will provide 'list' action.
// incidents, foundclass and found class id: This viewset will provide 'detail' action.
// incidents and foundclassSub: This viewset will provide 'list' action.
// incidents, foundclassSub and foundclassSub id: This viewset will provide 'detail'
// action.
// incidents and info: This viewset will provide the details of an incident, returning
// the incident model, related incident_times, and responder units. It will also return
 // a calculated response_time for the incident
// incidents and times: This viewset will provide 'list' and 'detail' actions.
// incidents, times and times id: This viewset will provide the 'detail' action.
// incidents and totals: This viewset will provide 'list' and 'detail' actions.
export const getIncidents = (inputs = {}) => {
  const { found, incsitfoundId, foundclass, incsitfoundclassId, foundclassSub,
  incsitfoundsubId, info, times, inctimesId, totals  } = inputs;
  let url;

  if (found && !incsitfoundId) {
    url = `${ROOT_URL}/incidents/${found}`;
  } else if (found && incsitfoundId) {
    url = `${ROOT_URL}/incidents/${found}/${incsitfoundId}`;
  } else if (foundclass && !incsitfoundclassId) {
    url = `${ROOT_URL}/incidents/${foundclass}`;
  } else if (foundclass && incsitfoundclassId) {
    url = `${ROOT_URL}/incidents/${foundclass}/${incsitfoundclassId}`;
  } else if (foundclassSub && !incsitfoundsubId) {
    url = `${ROOT_URL}/incidents/${foundclassSub}`;
  } else if (foundclassSub && incsitfoundsubId) {
    url = `${ROOT_URL}/incidents/${foundclassSub}/${incsitfoundsubId}`;
  } else if (info) {
    url = `${ROOT_URL}/incidents/${info}`;
  } else if (times && !inctimesId) {
    url = `${ROOT_URL}/incidents/${times}`;
  } else if (times && inctimesId) {
    url = `${ROOT_URL}/incidents/${times}/${inctimesId}`;
  } else if (totals) {
    url = `${ROOT_URL}/incidents/${totals}`;
  } else {
    url = `${ROOT_URL}/incidents/`;
  }

  return promiseToGet(url);
};

// without mutual aid id: This viewset will provide 'list' action.
// with mutual aid id: This viewset will provide 'list' action.
export const getMutualAid = (inputs = {}) => {
  const { mutualaidId } = inputs;
  let url;

  if (mutualaidId) {
    url = `${ROOT_URL}/mutualaid/${mutualaidId}`;
  } else {
    url = `${ROOT_URL}/mutualaid/`;
  }

  return promiseToGet(url);
};

// without responder units id: This viewset will provide 'list' action.
// with responder units id: This viewset will provide 'detail' action.
export const getResponders = (inputs = {}) => {
  const { incidentId } = inputs;
  let url;

  if (incidentId) {
    url = `${ROOT_URL}/responders/${incidentId}`;
  } else {
    url = `${ROOT_URL}/responders/`;
  }

  return promiseToGet(url);
};

// without id: This viewset will provide 'list' action.
// with id: This viewset will provide 'detail' action.
export const getResponderUnits = (inputs = {}) => {
  const { responderunitId } = inputs;
  let url;

  if (responderunitId) {
    url = `${ROOT_URL}/responderunits/${responderunitId}`;
  } else {
    url = `${ROOT_URL}/responderunits/`;
  }

  return promiseToGet(url);
};

// without situationfoundId: This viewset will provide 'list' action.
// with situationfoundId: This viewset will provide the 'detail' action.
export const getSituationFound = (inputs = {}) => {
  const { situationfoundId } = inputs;
  let url;

  if (situationfoundId) {
    url = `${ROOT_URL}/situationfound/${situationfoundId}`;
  } else {
    url = `${ROOT_URL}/situationfound/`;
  }

  return promiseToGet(url);
};

// without station id: This viewset will provide the 'list' action.
// with station id: This viewset will provide the 'detail' action.
export const getStations = (inputs = {}) => {
  const { stationId } = inputs;
  let url;

  if (stationId) {
    url = `${ROOT_URL}/station/${stationId}`;
  } else {
    url = `${ROOT_URL}/station/`;
  }

  return promiseToGet(url);
};

// without time description id: This viewset will provide 'list' action.
// with time description id: This viewset will provide the 'detail' action.
export const getTimeDescriptions = (inputs = {}) => {
  const { timedescId } = inputs;
  let url;

  if (timedescId) {
    url = `${ROOT_URL}/timedescriptions/${timedescId}`;
  } else {
    url = `${ROOT_URL}/timedescriptions/`;
  }

  return promiseToGet(url);
};

// without type nature code id: This viewset will provide the 'list' action.
// with type nature code id: This viewset will provide the 'detail' action.
export const getTypeNatureCodes = (inputs = {}) => {
  const { typenaturecodeId } = inputs;
  let url;

  if (typenaturecodeId) {
    url = `${ROOT_URL}/typenaturecodes/${typenaturecodeId}`;
  } else {
    url = `${ROOT_URL}/typenaturecodes/`;
  }

  return promiseToGet(url);
};

export const transportApi = {
  getAgencies,
  getAlarmLevels,
  getFireblock,
  getFireblocks,
  getFma,
  getFmas,
  getIncidents,
  getMutualAid,
  getResponders,
  getResponderUnits,
  getSituationFound,
  getStations,
  getTimeDescriptions,
  getTypeNatureCodes,
};
