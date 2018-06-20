import {
  ALL_RACES_START,
  ALL_RACES_SUCCESS,
  ALL_RACES_FAILURE,
  RACE_START,
  RACE_SUCCESS,
  RACE_FAILURE,
  SET_RACE,
} from './actions';

const INITIAL_STATE = {
  allRacesPending: false,
  allRacesError: null,
  racePending: false,
  raceError: null,
  selectedRace: null,
  allRaces: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_RACES_START:
      return {
        ...state,
        allRacesPending: true,
        allRacesError: null,
        allRaces: null,
      };
    case ALL_RACES_SUCCESS:
      return {
        ...state,
        allRacesPending: false,
        allRacesError: null,
        allRaces: action.payload.results.geography,
      };
    case ALL_RACES_FAILURE:
      return {
        ...state,
        allRacesPending: false,
        allRacesError: action.payload,
        allRaces: null,
      };
    case RACE_START:
      return {
        ...state,
        racePending: true,
        raceError: null,
        selectedRaceData: null,
      };
    case RACE_SUCCESS:
      return {
        ...state,
        racePending: false,
        raceError: null,
        selectedRaceData: action.payload.results,
      };
    case RACE_FAILURE:
      return {
        ...state,
        racePending: false,
        raceError: action.payload,
        selectedRaceData: null,
      };
    case SET_RACE:
      return {
        ...state,
        selectedRace: action.selectedRace,
      };
    default:
      return state;
  }
};

export default reducer;
