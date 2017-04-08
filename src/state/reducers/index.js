import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import app from './app.js';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  app,
});

export default rootReducer;
