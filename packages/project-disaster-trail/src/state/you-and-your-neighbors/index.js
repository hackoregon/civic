import {
  API_START,
  API_SUCCESS,
  API_FAILURE,
  COORDS_START,
  COORDS_SUCCESS,
  COORDS_FAILURE,
  SET_COORDS
} from "./actions";

const INITIAL_STATE = {
  pending: false,
  error: null,
  data: null,
  coordsPending: false,
  coordsError: null,
  coordsData: null,
  selectedCoords: { latitude: 45.5231, longitude: -122.6765 }
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_START:
      return {
        ...state,
        pending: true,
        error: null,
        data: null
      };
    case API_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        data: action.payload.slide_data
      };
    case API_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
        data: null
      };
    case COORDS_START:
      return {
        ...state,
        coordsPending: true,
        coordsError: null,
        coordsData: null
      };
    case COORDS_SUCCESS:
      return {
        ...state,
        coordsPending: false,
        coordsError: null,
        coordsData: action.payload.results
      };
    case COORDS_FAILURE:
      return {
        ...state,
        coordsPending: false,
        coordsError: action.payload,
        coordsData: null
      };
    case SET_COORDS:
      return {
        ...state,
        selectedCoords: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
