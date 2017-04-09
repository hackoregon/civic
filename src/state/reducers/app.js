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
  agencyData: {},
};

// *** ACTIONS: HOLDS ACTION PAYLOADS IN PLAIN JAVASCRIPT OBJECTS. MUST HAVE A TYPE
// PROPERTY THAT INDICATES THE PERFORMED ACTION, TYPICALLY BE DE NED AS STRING
// CONSTANTS. ALL OTHER PROPERTIES ARE THE ACTION'S PAYLOAD. *** //
export const INIT_APP    = 'INIT_APP';

export const GET_AGENCIES = 'GET_AGENCIES';
export const GET_AGENCIES_SUCCESS = 'GET_AGENCIES_SUCCESS';
export const GET_AGENCIES_FAILURE = 'GET_AGENCIES_FAILURE';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL  = 'OPEN_MODAL';


// *** ACTION CREATORS: CREATES AN ACTION WITH OPTIONAL PAYLOAD AND BOUND DISPATCH. *** //

// INITIALIZE APP ACTION CREATORS //
export const initializeApp = () => ({ type: INIT_APP });


// MODAL ACTION CREATORS //
export const closeModal = payload => ({ type: CLOSE_MODAL, payload });
export const openModal = payload => ({ type: OPEN_MODAL, payload });


// FIRE API ACTION CREATORS //
export const getAgencies = payload => ({ type: GET_AGENCIES, payload });
export const getAgenciesSuccess = payload => ({ type: GET_AGENCIES_SUCCESS, payload });
export const getAgenciesFailure = error => ({ type: GET_AGENCIES_FAILURE, error });


// *** THUNKS: THE THUNK CAN BE USED TO DELAY THE DISPATCH OF AN ACTION, OR TO DISPATCH
// ONLY IF A CERTAIN CONDITION IS MET. *** //
export const getAgenciesThunk = inputs => (dispatch) => {
  dispatch(getAgencies());
  return fireApi.getAgencies(inputs).then(
    data => dispatch(getAgenciesSuccess(data)),
    err => dispatch(getAgenciesFailure(err)),
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

    default:
      return state;
  }
};

export default reducer;
