export const EXAMPLE_ACTION = 'EXAMPLE/ACTION';
/*
   The idea is to filter through the actions and do sideeffects here.
   Because we have access to next we can continue with the other actions.
*/
export const EXAMPLE_NEXT_ACTION = { type: 'SOME_ACTION' };
const sideEffectsMiddleware = store => next => action => { // eslint-disable-line
  switch (action.type) {
    case EXAMPLE_ACTION:
      return next(EXAMPLE_NEXT_ACTION);
      console.log(EXAMPLE_NEXT_ACTION); // eslint-disable-line
      break;
    default:
      return next(action);
  }
};

export default sideEffectsMiddleware;
