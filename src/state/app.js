export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL  = 'OPEN_MODAL';
export const UPDATE_UNIT_SIZE = 'UPDATE_UNIT_SIZE';
export const UPDATE_DEMOGRAPHIC = 'UPDATE_DEMOGRAPHIC';

export const INITIAL_STATE = {
  stories: [],
  openModal: null,
};

export const closeModal = payload => ({
  type: CLOSE_MODAL,
  payload,
});

export const openModal = payload => ({
  type: OPEN_MODAL,
  payload,
});

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
    case UPDATE_UNIT_SIZE:
      return {
        ...state,
        selectedUnitSize: action.unitSize,
      };
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
