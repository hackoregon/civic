import { OPEN_MODAL } from '../state/app';
/*
   The idea is to filter through the actions and do sideeffects here.
   Because we have access to next we can continue with the other actions.
*/
export const TEST_ACTION = { type: 'SOME_ACTION' };
const sideEffectsMiddleware = store => next => action => { // eslint-disable-line
  switch (action.type) {
    case OPEN_MODAL:
      return next(TEST_ACTION);
      console.log(TEST_ACTION); // eslint-disable-line
      break;
    default:
      return next(action);
  }
};

export default sideEffectsMiddleware;
