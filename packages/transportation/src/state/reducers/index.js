import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import app from './app';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    form: formReducer,
    app,
    ...asyncReducers,
  });
}
