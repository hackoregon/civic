 import { combineReducers } from 'redux';
 import { routerReducer } from 'react-router-redux';
 import population from './Population';
 import definition from './Definition';
 import services211 from './Services211';
 import migration from './Migration';

 export default function createReducer(asyncReducers) {
   return combineReducers({
     routing: routerReducer,
     ...asyncReducers,
     population,
     definition,
     services211,
     migration,
   });
 }
