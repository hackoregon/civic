import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import proactivePlanning from './proactive-planning';
import { reducer as reduxFormReducer } from 'redux-form';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    proactivePlanning,
    form: reduxFormReducer,
    ...asyncReducers,
  });
}
