import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import proactivePlanning from './proactive-planning';
import youAndYourNeighbors from './you-and-your-neighbors';
import { reducer as reduxFormReducer } from 'redux-form';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    youAndYourNeighbors,
    proactivePlanning,
    form: reduxFormReducer,
    ...asyncReducers,
  });
}
