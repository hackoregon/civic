import {
  SANDBOX_START,
  SANDBOX_SUCCESS,
  SANDBOX_FAILURE,
  FOUNDATION_START,
  FOUNDATION_SUCCESS,
  FOUNDATION_FAILURE,
  SET_PACKAGE,
  SLIDES_START,
  SLIDES_FAILURE,
  SLIDES_SUCCESS,
} from './actions';

const INITIAL_STATE = {
  sandboxPending: false,
  sandboxError: null,
  foundationPending: false,
  foundationError: null,
  slidesPending: false,
  slidesError: null,
  selectedPackage: '',
  sandbox: {},
  foundationData: {},
  slidesData: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SANDBOX_START:
      return {
        ...state,
        sandboxPending: true,
        sandboxError: null,
        sandbox: {},
      };
    case SANDBOX_SUCCESS:
      return {
        ...state,
        sandboxPending: false,
        sandboxError: null,
        sandbox: action.payload.body,
      };
    case SANDBOX_FAILURE:
      return {
        ...state,
        sandboxPending: false,
        sandboxError: action.payload,
        sandbox: {},
      };
    case FOUNDATION_START:
      return {
        ...state,
        foundationPending: true,
        foundationError: null,
        foundationData: null,
      };
    case FOUNDATION_SUCCESS:
      return {
        ...state,
        foundationPending: false,
        foundationError: null,
        foundationData: action.payload,
      };
    case FOUNDATION_FAILURE:
      return {
        ...state,
        foundationPending: false,
        foundationError: action.payload,
        foundationData: null,
      };
    case SLIDES_START:
      return {
        ...state,
        slidesPending: true,
        slidesError: null,
      };
    case SLIDES_SUCCESS:
      return {
        ...state,
        slidesPending: false,
        slidesError: null,
        slidesData: action.payload,
      };
    case SLIDES_FAILURE:
      return {
        ...state,
        slidesPending: false,
        slidesError: action.payload,
        slidesData: null,
      };
    case SET_PACKAGE:
      return {
        ...state,
        selectedPackage: action.selectedPackage,
      };
    default:
      return state;
  }
};

export default reducer;
