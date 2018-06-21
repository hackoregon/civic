import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    form: reduxFormReducer,
    ...asyncReducers,
  });
}
