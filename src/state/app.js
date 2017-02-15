export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL  = 'OPEN_MODAL';

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
    default:
      return state;
  }
};

export default reducer;
