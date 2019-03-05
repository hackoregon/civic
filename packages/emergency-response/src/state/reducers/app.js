import { fireApi } from '../../api';

// *** STATE OBJECT *** //
// REDUX'S THREE PRINCIPLES:
// 1. SINGLE SOURCE OF TRUTH
// 2. STATE IS READ ONLY
// 3. CHANGES ARE MADE WITH PURE FUNCTIONS
export const INITIAL_STATE = {
  stories: [],
  isFetching: false,
  openModal: null,
};

// *** ACTIONS: HOLDS ACTION PAYLOADS IN PLAIN JAVASCRIPT OBJECTS. MUST HAVE A TYPE
// PROPERTY THAT INDICATES THE PERFORMED ACTION, TYPICALLY BE DE NED AS STRING
// CONSTANTS. ALL OTHER PROPERTIES ARE THE ACTION'S PAYLOAD. *** //
export const INIT_APP = 'INIT_APP';

export const GET_AGENCIES = 'GET_AGENCIES';
export const GET_AGENCIES_SUCCESS = 'GET_AGENCIES_SUCCESS';
export const GET_AGENCIES_FAILURE = 'GET_AGENCIES_FAILURE';

export const GET_ALARM_LEVELS = 'GET_ALARM_LEVELS';
export const GET_ALARM_LEVELS_SUCCESS = 'GET_ALARM_LEVELS_SUCCESS';
export const GET_ALARM_LEVELS_FAILURE = 'GET_ALARM_LEVELS_FAILURE';

export const GET_FIRE_BLOCK = 'GET_FIRE_BLOCK';
export const GET_FIRE_BLOCK_SUCCESS = 'GET_FIRE_BLOCK_SUCCESS';
export const GET_FIRE_BLOCK_FAILURE = 'GET_FIRE_BLOCK_FAILURE';

export const GET_FIRE_BLOCKS = 'GET_FIRE_BLOCKS';
export const GET_FIRE_BLOCKS_SUCCESS = 'GET_FIRE_BLOCKS_SUCCESS';
export const GET_FIRE_BLOCKS_FAILURE = 'GET_FIRE_BLOCKS_FAILURE';

export const GET_FMA = 'GET_FMA';
export const GET_FMA_SUCCESS = 'GET_FMA_SUCCESS';
export const GET_FMA_FAILURE = 'GET_FMA_FAILURE';

export const GET_FMAS = 'GET_FMAS';
export const GET_FMAS_SUCCESS = 'GET_FMAS_SUCCESS';
export const GET_FMAS_FAILURE = 'GET_FMAS_FAILURE';

export const GET_INCIDENTS = 'GET_INCIDENTS';
export const GET_INCIDENTS_SUCCESS = 'GET_INCIDENTS_SUCCESS';
export const GET_INCIDENTS_FAILURE = 'GET_INCIDENTS_FAILURE';

export const GET_MUTUAL_AID = 'GET_MUTUAL_AID';
export const GET_MUTUAL_AID_SUCCESS = 'GET_MUTUAL_AID_SUCCESS';
export const GET_MUTUAL_AID_FAILURE = 'GET_MUTUAL_AID_FAILURE';

export const GET_RESPONDERS = 'GET_RESPONDERS';
export const GET_RESPONDERS_SUCCESS = 'GET_RESPONDERS_SUCCESS';
export const GET_RESPONDERS_FAILURE = 'GET_RESPONDERS_FAILURE';

export const GET_RESPONDER_UNITS = 'GET_RESPONDER_UNITS';
export const GET_RESPONDER_UNITS_SUCCESS = 'GET_RESPONDER_UNITS_SUCCESS';
export const GET_RESPONDER_UNITS_FAILURE = 'GET_RESPONDER_UNITS_FAILURE';

export const GET_SITUATION_FOUND = 'GET_SITUATION_FOUND';
export const GET_SITUATION_FOUND_SUCCESS = 'GET_SITUATION_FOUND_SUCCESS';
export const GET_SITUATION_FOUND_FAILURE = 'GET_SITUATION_FOUND_FAILURE';

export const GET_STATIONS = 'GET_STATIONS';
export const GET_STATIONS_SUCCESS = 'GET_STATIONS_SUCCESS';
export const GET_STATIONS_FAILURE = 'GET_STATIONS_FAILURE';

export const GET_TIME_DESCRIPTIONS = 'GET_TIME_DESCRIPTIONS';
export const GET_TIME_DESCRIPTIONS_SUCCESS = 'GET_TIME_DESCRIPTIONS_SUCCESS';
export const GET_TIME_DESCRIPTIONS_FAILURE = 'GET_TIME_DESCRIPTIONS_FAILURE';

export const GET_TYPE_NATURE_CODES = 'GET_TYPE_NATURE_CODES';
export const GET_TYPE_NATURE_CODES_SUCCESS = 'GET_TYPE_NATURE_CODES_SUCCESS';
export const GET_TYPE_NATURE_CODES_FAILURE = 'GET_TYPE_NATURE_CODES_FAILURE';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';

export const RENDER_PANEL = 'RENDER_PANEL';

export const GET_FMA_ID_DATA = 'GET_FMA_ID_DATA';
export const GET_FMA_ID_DATA_SUCCESS = 'GET_FMA_ID_DATA_SUCCESS';
export const GET_FMA_ID_DATA_FAILURE = 'GET_FMA_ID_DATA_FAILURE';

// *** ACTION CREATORS: CREATES AN ACTION WITH OPTIONAL PAYLOAD AND BOUND DISPATCH. *** //

// INITIALIZE APP ACTION CREATORS //
export const initializeApp = () => ({ type: INIT_APP });

// MODAL ACTION CREATORS //
export const closeModal = payload => ({ type: CLOSE_MODAL, payload });
export const openModal = payload => ({ type: OPEN_MODAL, payload });

// RENDER PANEL CREATOR //
export const renderFmaPanelProperties = payload =>
  console.log(payload) || { type: RENDER_PANEL, payload };

// FIRE API ACTION CREATORS //
export const getAgencies = payload => ({ type: GET_AGENCIES, payload });
export const getAgenciesSuccess = payload => ({
  type: GET_AGENCIES_SUCCESS,
  payload,
});
export const getAgenciesFailure = error => ({
  type: GET_AGENCIES_FAILURE,
  error,
});

export const getAlarmLevels = payload => ({ type: GET_ALARM_LEVELS, payload });
export const getAlarmLevelsSuccess = payload => ({
  type: GET_ALARM_LEVELS_SUCCESS,
  payload,
});
export const getAlarmLevelsFailure = error => ({
  type: GET_ALARM_LEVELS_FAILURE,
  error,
});

export const getFireblock = payload => ({ type: GET_FIRE_BLOCK, payload });
export const getFireblockSuccess = payload => ({
  type: GET_FIRE_BLOCK_SUCCESS,
  payload,
});
export const getFireblockFailure = error => ({
  type: GET_FIRE_BLOCK_FAILURE,
  error,
});

export const getFireblocks = payload => ({ type: GET_FIRE_BLOCKS, payload });
export const getFireblocksSuccess = payload => ({
  type: GET_FIRE_BLOCKS_SUCCESS,
  payload,
});
export const getFireblocksFailure = error => ({
  type: GET_FIRE_BLOCKS_FAILURE,
  error,
});

export const getFma = payload => ({ type: GET_FMA, payload });
export const getFmaSuccess = payload => ({ type: GET_FMA_SUCCESS, payload });
export const getFmaFailure = error => ({ type: GET_FMA_FAILURE, error });

export const getFmas = payload => ({ type: GET_FMAS, payload });
export const getFmasSuccess = payload => ({ type: GET_FMAS_SUCCESS, payload });
export const getFmasFailure = error => ({ type: GET_FMAS_FAILURE, error });

export const getIncidents = payload => ({ type: GET_INCIDENTS, payload });
export const getIncidentsSuccess = payload => ({
  type: GET_INCIDENTS_SUCCESS,
  payload,
});
export const getIncidentsFailure = error => ({
  type: GET_INCIDENTS_FAILURE,
  error,
});

export const getMutualAid = payload => ({ type: GET_MUTUAL_AID, payload });
export const getMutualAidSuccess = payload => ({
  type: GET_MUTUAL_AID_SUCCESS,
  payload,
});
export const getMutualAidFailure = error => ({
  type: GET_MUTUAL_AID_FAILURE,
  error,
});

export const getResponders = payload => ({ type: GET_RESPONDERS, payload });
export const getRespondersSuccess = payload => ({
  type: GET_RESPONDERS_SUCCESS,
  payload,
});
export const getRespondersFailure = error => ({
  type: GET_RESPONDERS_FAILURE,
  error,
});

export const getResponderUnits = payload => ({
  type: GET_RESPONDER_UNITS,
  payload,
});
export const getResponderUnitsSuccess = payload => ({
  type: GET_RESPONDER_UNITS_SUCCESS,
  payload,
});
export const getResponderUnitsFailure = error => ({
  type: GET_RESPONDER_UNITS_FAILURE,
  error,
});

export const getSituationFound = payload => ({
  type: GET_SITUATION_FOUND,
  payload,
});
export const getSituationFoundSuccess = payload => ({
  type: GET_SITUATION_FOUND_SUCCESS,
  payload,
});
export const getSituationFoundFailure = error => ({
  type: GET_SITUATION_FOUND_FAILURE,
  error,
});

export const getStations = payload => ({ type: GET_STATIONS, payload });
export const getStationsSuccess = payload => ({
  type: GET_STATIONS_SUCCESS,
  payload,
});
export const getStationsFailure = error => ({
  type: GET_STATIONS_FAILURE,
  error,
});

export const getTimeDescriptions = payload => ({
  type: GET_TIME_DESCRIPTIONS,
  payload,
});
export const getTimeDescriptionsSuccess = payload => ({
  type: GET_TIME_DESCRIPTIONS_SUCCESS,
  payload,
});
export const getTimeDescriptionsFailure = error => ({
  type: GET_TIME_DESCRIPTIONS_FAILURE,
  error,
});

export const getTypeNatureCodes = payload => ({
  type: GET_TYPE_NATURE_CODES,
  payload,
});
export const getTypeNatureCodesSuccess = payload => ({
  type: GET_TYPE_NATURE_CODES_SUCCESS,
  payload,
});
export const getTypeNatureCodesFailure = error => ({
  type: GET_TYPE_NATURE_CODES_FAILURE,
  error,
});

export const getFmaIdData = payload => ({ type: GET_FMA_ID_DATA, payload });
export const getFmaIdDataSuccess = payload => ({
  type: GET_FMA_ID_DATA_SUCCESS,
  payload,
});
export const getFmaIdDataFailure = error => ({
  type: GET_FMA_ID_DATA_FAILURE,
  error,
});

// *** THUNKS: THE THUNK CAN BE USED TO DELAY THE DISPATCH OF AN ACTION, OR TO DISPATCH
// ONLY IF A CERTAIN CONDITION IS MET. *** //
export const getAgenciesThunk = inputs => dispatch => {
  dispatch(getAgencies());
  return fireApi
    .getAgencies(inputs)
    .then(
      data => dispatch(getAgenciesSuccess(data)),
      err => dispatch(getAgenciesFailure(err))
    );
};

export const getAlarmLevelsThunk = () => dispatch => {
  dispatch(getAlarmLevels());
  return fireApi
    .getAlarmLevels()
    .then(
      data => dispatch(getAlarmLevelsSuccess(data)),
      err => dispatch(getAlarmLevelsFailure(err))
    );
};

export const getFireblockThunk = inputs => dispatch => {
  dispatch(getFireblock());
  return fireApi
    .getFireblock(inputs)
    .then(
      data => dispatch(getFireblockSuccess(data)),
      err => dispatch(getFireblockFailure(err))
    );
};

export const getFireblocksThunk = () => dispatch => {
  dispatch(getFireblocks());
  return fireApi
    .getFireblocks()
    .then(
      data => dispatch(getFireblocksSuccess(data)),
      err => dispatch(getFireblocksFailure(err))
    );
};

export const getFmaThunk = inputs => dispatch => {
  dispatch(getFma());
  console.log('thunk', inputs);
  return fireApi
    .getFma(inputs)
    .then(
      data => dispatch(getFmaSuccess(data)),
      err => dispatch(getFmaFailure(err))
    );
};

export const getFmasThunk = inputs => dispatch => {
  dispatch(getFmas());
  return fireApi
    .getFmas(inputs)
    .then(
      data => dispatch(getFmasSuccess(data)),
      err => dispatch(getFmasFailure(err))
    );
};

export const getIncidentsThunk = inputs => dispatch => {
  dispatch(getIncidents());
  return fireApi
    .getIncidents(inputs)
    .then(
      data => dispatch(getIncidentsSuccess(data)),
      err => dispatch(getIncidentsFailure(err))
    );
};

export const getMutualAidThunk = inputs => dispatch => {
  dispatch(getMutualAid());
  return fireApi
    .getMutualAid(inputs)
    .then(
      data => dispatch(getMutualAidSuccess(data)),
      err => dispatch(getMutualAidFailure(err))
    );
};

export const getRespondersThunk = inputs => dispatch => {
  dispatch(getResponders());
  return fireApi
    .getResponders(inputs)
    .then(
      data => dispatch(getRespondersSuccess(data)),
      err => dispatch(getRespondersFailure(err))
    );
};

export const getResponderUnitsThunk = inputs => dispatch => {
  dispatch(getResponderUnits());
  return fireApi
    .getResponderUnits(inputs)
    .then(
      data => dispatch(getResponderUnitsSuccess(data)),
      err => dispatch(getResponderUnitsFailure(err))
    );
};

export const getSituationFoundThunk = inputs => dispatch => {
  dispatch(getSituationFound());
  return fireApi
    .getSituationFound(inputs)
    .then(
      data => dispatch(getSituationFoundSuccess(data)),
      err => dispatch(getSituationFoundFailure(err))
    );
};

export const getStationsThunk = inputs => dispatch => {
  dispatch(getStations());
  return fireApi
    .getStations(inputs)
    .then(
      data => dispatch(getStationsSuccess(data)),
      err => dispatch(getStationsFailure(err))
    );
};

export const getTimeDescriptionsThunk = inputs => dispatch => {
  dispatch(getTimeDescriptions());
  return fireApi
    .getTimeDescriptions(inputs)
    .then(
      data => dispatch(getTimeDescriptionsSuccess(data)),
      err => dispatch(getTimeDescriptionsFailure(err))
    );
};

export const getTypeNatureCodesThunk = inputs => dispatch => {
  dispatch(getTypeNatureCodes());
  return fireApi
    .getTypeNatureCodes(inputs)
    .then(
      data => dispatch(getTypeNatureCodesSuccess(data)),
      err => dispatch(getTypeNatureCodesFailure(err))
    );
};

// *** REDUCER: TAKES THE PREVIOUS STATE AND AN ACTION, AND RETURNS THE NEXT STATE. *** //
// APP REDUCER //
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        openModal: null,
      };
    case OPEN_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };
    case RENDER_PANEL:
      return {
        ...state,
        fmaPanelData: action.payload,
      };
    case GET_AGENCIES:
      return {
        ...state,
        isFetching: true,
      };
    case GET_AGENCIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        agencyData: action.payload,
      };
    case GET_AGENCIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_ALARM_LEVELS:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ALARM_LEVELS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        alarmLevelData: action.payload,
      };
    case GET_ALARM_LEVELS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_FIRE_BLOCK:
      return {
        ...state,
        isFetching: true,
      };
    case GET_FIRE_BLOCK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fireblockData: action.payload,
      };
    case GET_FIRE_BLOCK_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_FIRE_BLOCKS:
      return {
        ...state,
        isFetching: true,
      };
    case GET_FIRE_BLOCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fireblocksData: action.payload,
      };
    case GET_FIRE_BLOCKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_FMA:
      return {
        ...state,
        isFetching: true,
      };
    case GET_FMA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fmaData: action.payload,
      };
    case GET_FMA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_FMAS:
      return {
        ...state,
        isFetching: true,
      };
    case GET_FMAS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fmasData: action.payload,
      };
    case GET_FMAS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_INCIDENTS:
      return {
        ...state,
        isFetching: true,
      };
    case GET_INCIDENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        incidentsData: action.payload,
      };
    case GET_INCIDENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_MUTUAL_AID:
      return {
        ...state,
        isFetching: true,
      };
    case GET_MUTUAL_AID_SUCCESS:
      return {
        ...state,
        isFetching: false,
        mutualAidData: action.payload,
      };
    case GET_MUTUAL_AID_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_RESPONDERS:
      return {
        ...state,
        isFetching: true,
      };
    case GET_RESPONDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        respondersData: action.payload,
      };
    case GET_RESPONDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_RESPONDER_UNITS:
      return {
        ...state,
        isFetching: true,
      };
    case GET_RESPONDER_UNITS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        responderUnitsData: action.payload,
      };
    case GET_RESPONDER_UNITS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_SITUATION_FOUND:
      return {
        ...state,
        isFetching: true,
      };
    case GET_SITUATION_FOUND_SUCCESS:
      return {
        ...state,
        isFetching: false,
        situationFoundData: action.payload,
      };
    case GET_SITUATION_FOUND_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_STATIONS:
      return {
        ...state,
        isFetching: true,
      };
    case GET_STATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        stationsData: action.payload,
      };
    case GET_STATIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_TIME_DESCRIPTIONS:
      return {
        ...state,
        isFetching: true,
      };
    case GET_TIME_DESCRIPTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        timeDescriptionsData: action.payload,
      };
    case GET_TIME_DESCRIPTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_TYPE_NATURE_CODES:
      return {
        ...state,
        isFetching: true,
      };
    case GET_TYPE_NATURE_CODES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        typeNatureCodesData: action.payload,
      };
    case GET_TYPE_NATURE_CODES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
