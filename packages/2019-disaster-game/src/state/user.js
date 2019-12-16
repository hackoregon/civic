import { createReducer, createSelector } from "redux-starter-kit";
import badges from "../constants/badges";

// INITIAL STATE
// items will be a list of objects, where each object is an id and a quantity
// the id is related to the items reducer
const initialState = {
  points: 0,
  petsSaved: 0,
  peopleSaved: 0,
  badges
};

// CONSTANTS

export const actionTypes = {
  SET_POINTS: "SET_POINTS",
  ADD_POINTS: "ADD_POINTS",
  RESET_STATE: "RESET_STATE",
  ADD_BADGE: "ADD_BADGE",
  ADD_SAVED: "ADD_SAVED"
};

// ACTIONS
export const setPoints = points => dispatch => {
  dispatch({ type: actionTypes.SET_POINTS, points });
};

export const addPoints = points => dispatch => {
  dispatch({ type: actionTypes.ADD_POINTS, points });
};

export const resetState = () => dispatch => {
  dispatch({ type: actionTypes.RESET_STATE });
};

export const addBadge = (badgeFamily, badgeId) => dispatch => {
  dispatch({ type: actionTypes.ADD_BADGE, badgeId, badgeFamily });
};

export const addSaved = completedTask => dispatch => {
  dispatch({ type: actionTypes.ADD_SAVED, completedTask });
};

const getRandomNumberFromRange = range => {
  const min = Math.ceil(range[0]);
  const max = Math.floor(range[1]);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// REDUCERS
/* eslint-disable no-param-reassign */
export const user = createReducer(
  { ...initialState },
  {
    [actionTypes.SET_POINTS]: (state, action) => {
      state.points = action.points;
    },
    [actionTypes.ADD_POINTS]: (state, action) => {
      state.points += action.points;
    },
    [actionTypes.ADD_BADGE]: (state, action) => {
      const { badgeFamily, badgeId } = action;
      const notYetAcquired =
        state.badges[badgeFamily][badgeId].acquired === false;

      if (notYetAcquired) {
        state.badges[badgeFamily][badgeId].acquired = true;
        state.badges.badgesAcquired += 1;
      }
    },
    [actionTypes.ADD_SAVED]: (state, action) => {
      const { completedTask } = action;
      state.petsSaved += completedTask.petsSaved;
      state.peopleSaved += getRandomNumberFromRange(
        completedTask.peopleSavedRange
      );
    },
    [actionTypes.RESET_STATE]: () => {
      return { ...initialState };
    }
  }
);
/* eslint-enable no-param-reassign */

export default user;

// SELECTORS

export const getPoints = createSelector(
  ["user.points"],
  points => points
);

export const getAllBadges = createSelector(
  ["user.badges"],
  allBadges => allBadges
);

export const getSavedMetrics = createSelector(
  ["user.petsSaved", "user.peopleSaved"],
  (pets, people) => ({
    petsSaved: pets,
    peopleSaved: people
  })
);

/* eslint-disable no-else-return */
// export const getTeamworkBadge = createSelector(
//   ["user.badges.teamwork"],
//   teamworkBadges => {
//     if (teamworkBadges.superTeamBadge.acquired) {
//       return teamworkBadges.superTeamBadge;
//     } else if (teamworkBadges.teamworkBadge.acquired) {
//       return teamworkBadges.teamworkBadge;
//     }
//     return null;
//   }
// );

export const getPreparedBadge = createSelector(
  ["user.badges.prepared"],
  preparedBadges => {
    // if (preparedBadges.masterPreparerBadge.acquired) {
    //   return preparedBadges.masterPreparerBadge;
    // } else
    if (preparedBadges.preparerBadge.acquired) {
      return preparedBadges.preparerBadge;
    }
    return null;
  }
);

export const getHeroBadge = createSelector(
  ["user.badges.hero"],
  heroBadges => {
    if (heroBadges.earthquakeHeroBadge.acquired) {
      return heroBadges.earthquakeHeroBadge;
    } else if (heroBadges.taskCitySuperheroBadge.acquired) {
      return heroBadges.taskCitySuperheroBadge;
    } else if (heroBadges.taskNeighborhoodHeroBadge.acquired) {
      return heroBadges.taskNeighborhoodHeroBadge;
    } else if (heroBadges.taskSurvivorBadge.acquired) {
      return heroBadges.taskSurvivorBadge;
    }
    return null;
  }
);

/* eslint-enable no-else-return */
