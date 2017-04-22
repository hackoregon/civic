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
  conflicts: null,
  features: null,
  nearby: null,
};

// *** ACTIONS: HOLDS ACTION PAYLOADS IN PLAIN JAVASCRIPT OBJECTS. MUST HAVE A TYPE
// PROPERTY THAT INDICATES THE PERFORMED ACTION, TYPICALLY BE DE NED AS STRING
// CONSTANTS. ALL OTHER PROPERTIES ARE THE ACTION'S PAYLOAD. *** //
export const INIT_APP    = 'INIT_APP';

export const GET_FMAS = 'GET_FMAS';
export const GET_FMAS_SUCCESS = 'GET_FMAS_SUCCESS';
export const GET_FMAS_FAILURE = 'GET_FMAS_FAILURE';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL  = 'OPEN_MODAL';

export const RENDER_PANEL = 'RENDER_PANEL';

// *** ACTION CREATORS: CREATES AN ACTION WITH OPTIONAL PAYLOAD AND BOUND DISPATCH. *** //

// INITIALIZE APP ACTION CREATORS //
export const initializeApp = () => ({ type: INIT_APP });


// MODAL ACTION CREATORS //
export const closeModal = payload => ({ type: CLOSE_MODAL, payload });
export const openModal = payload => ({ type: OPEN_MODAL, payload });

// RENDER PANEL CREATOR //
export const renderFmaPanelId = payload => ({ type: RENDER_PANEL, payload });

// FIRE API ACTION CREATORS //
export const getFmas = payload => ({ type: GET_FMAS, payload });
export const getFmasSuccess = payload => ({ type: GET_FMAS_SUCCESS, payload });
export const getFmasFailure = error => ({ type: GET_FMAS_FAILURE, error });


// *** THUNKS: THE THUNK CAN BE USED TO DELAY THE DISPATCH OF AN ACTION, OR TO DISPATCH
// ONLY IF A CERTAIN CONDITION IS MET. *** //

export const getFmasThunk = inputs => (dispatch) => {
  dispatch(getFmas());
  return transportApi.getFmas(inputs).then(
    data => dispatch(getFmasSuccess(data)),
    err => dispatch(getFmasFailure(err)),
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
        fmaPanelId: action.payload,
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


    default:
      return state;
  }
};

export default reducer;
