import { fireApi } from '../../api';

export const INITIAL_STATE = {
  stories: [],
  isFetching: false,
  openModal: null,
  agencyData: {},
};

export const INIT_APP    = 'INIT_APP';

export const GET_AGENCIES = 'GET_AGENCIES';
export const GET_AGENCIES_SUCCESS = 'GET_AGENCIES_SUCCESS';
export const GET_AGENCIES_FAILURE = 'GET_AGENCIES_FAILURE';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL  = 'OPEN_MODAL';

// initialize app actions
export const initializeApp = () => ({ type: INIT_APP });

// modal actions
export const closeModal = payload => ({ type: CLOSE_MODAL, payload });
export const openModal = payload => ({ type: OPEN_MODAL, payload });

// fire api actions
export const getAgencies = payload => ({ type: GET_AGENCIES, payload });
export const getAgenciesSuccess = payload => ({ type: GET_AGENCIES_SUCCESS, payload });
export const getAgenciesFailure = error => ({ type: GET_AGENCIES_FAILURE, error });

// thunks
export const getAgenciesThunk = inputs => (dispatch) => {
  dispatch(getAgencies());
  return fireApi.getAgencies(inputs).then(
    data => dispatch(getAgenciesSuccess(data)),
    err => dispatch(getAgenciesFailure(err)),
  );
};

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
