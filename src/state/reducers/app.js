import { transportApi } from '../../api';

// *** STATE OBJECT *** //
// REDUX'S THREE PRINCIPLES:
// 1. SINGLE SOURCE OF TRUTH
// 2. STATE IS READ ONLY
// 3. CHANGES ARE MADE WITH PURE FUNCTIONS
export const INITIAL_STATE = {
  stories: [],
  isFetching: false,
  openModal: null,  
  mapType: 'features',
  conflicts: {
    distance: 3,
    days: 2,
    startDate: '',
    endDate: '',
    data: null,
  },
  features: {
    showNulls: false,
    sourceName: 'Grind and Pave',
    startDate: '',
    endDate: '',
    data: null,
  },
  nearby: {
    distance: 3,
    address: '1120 SW 5th Ave, Portland, OR',
    startDate: '',
    endDate: '',
    data: null,
  },
};

// *** ACTIONS: HOLDS ACTION PAYLOADS IN PLAIN JAVASCRIPT OBJECTS. MUST HAVE A TYPE
// PROPERTY THAT INDICATES THE PERFORMED ACTION, TYPICALLY BE DE NED AS STRING
// CONSTANTS. ALL OTHER PROPERTIES ARE THE ACTION'S PAYLOAD. *** //
export const INIT_APP    = 'INIT_APP';

export const GET_FEATURES = 'GET_FEATURES';
export const GET_FEATURES_SUCCESS = 'GET_FEATURES_SUCCESS';
export const GET_FEATURES_FAILURE = 'GET_FEATURES_FAILURE';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL  = 'OPEN_MODAL';

export const RENDER_PANEL = 'RENDER_PANEL';

export const SET_MAP_TYPE = 'SET_MAP_TYPE';

// *** ACTION CREATORS: CREATES AN ACTION WITH OPTIONAL PAYLOAD AND BOUND DISPATCH. *** //

// INITIALIZE APP ACTION CREATORS //
export const initializeApp = () => ({ type: INIT_APP });


// MODAL ACTION CREATORS //
export const closeModal = payload => ({ type: CLOSE_MODAL, payload });
export const openModal = payload => ({ type: OPEN_MODAL, payload });

// RENDER PANEL CREATOR //
export const renderFmaPanelId = payload => ({ type: RENDER_PANEL, payload });

// FIRE API ACTION CREATORS //
export const getFeatures = payload => ({ type: GET_FEATURES, payload });
export const getFeaturesSuccess = payload => ({ type: GET_FEATURES_SUCCESS, payload });
export const getFeaturesFailure = error => ({ type: GET_FEATURES_FAILURE, error });

export const setMapType = mapType => ({type: SET_MAP_TYPE, mapType})

// *** THUNKS: THE THUNK CAN BE USED TO DELAY THE DISPATCH OF AN ACTION, OR TO DISPATCH
// ONLY IF A CERTAIN CONDITION IS MET. *** //

export const selectMapThunk = input => (dispatch, getState) => {
  const state = getState();
  // console.log('reducers currentstate');
  // console.log(state);
  // console.log(`inputs ${input}`);
  const newMapType = input || state.app.mapType;
  // console.log(`reducers post set ${mapType}`)
  if (newMapType != state.app.mapType) {
    dispatch(setMapType(newMapType));
  }
  // console.log('reducers key')
  // console.log(state['app'][mapType]['data']);
  if (!state['app'][newMapType]['data']) {
    // console.log('reducers no input')
    dispatch(getFeatures());
    return transportApi.getFeatures(input).then(
      data => dispatch(getFeaturesSuccess(data)),
      err => dispatch(getFeaturesFailure(err)),
    );
  }
  
};

// *** REDUCER: TAKES THE PREVIOUS STATE AND AN ACTION, AND RETURNS THE NEXT STATE. *** //
// APP REDUCER //
export const reducer = (state = INITIAL_STATE, action) => {
  console.log(`reducer maptype = ${state.mapType}, action type=${action.type}`);
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
        fmaPanelId: action.payload,
      };

    case GET_FEATURES:
      return {
        ...state,
        isFetching: true,
      };
    case GET_FEATURES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        featureData: action.payload,
      };
    case GET_FEATURES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case SET_MAP_TYPE:
      return {
        ...state,
        mapType: action.mapType,
      };


    default:
      return state;
  }
};

export default reducer;
