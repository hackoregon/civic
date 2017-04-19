export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL  = 'OPEN_MODAL';
export const UPDATE_UNIT_SIZE = 'UPDATE_UNIT_SIZE';
export const UPDATE_DEMOGRAPHIC = 'UPDATE_DEMOGRAPHIC';

export const INITIAL_STATE = {};

export const updateSelectedUnitSize = unitSize => ({
  type: UPDATE_UNIT_SIZE,
  unitSize,
});

export const updateSelectedDemographic = demographic => ({
  type: UPDATE_DEMOGRAPHIC,
  demographic,
});

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DEMOGRAPHIC:
      return {
        ...state,
        selectedDemographic: action.demographic,
      };
    default:
      return state;
  }
};

export default reducer;
