import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import housing from '@hackoregon/civic-housing/src/state';

export const housing = combineReducers({
  parameters: require('@hackoregon/civic-housing/src/state/parameters').default,
  affordability: require('@hackoregon/civic-housing/src/state/affordability').default,
  neighborhoods: require('@hackoregon/civic-housing/src/state/neighborhoods').default,
  rent: require('@hackoregon/civic-housing/src/state/rent').default,
  households: require('@hackoregon/civic-housing/src/state/households').default,
  populations: require('@hackoregon/civic-housing/src/state/populations').default,
});


export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    housing,
    ...asyncReducers,
  });
}
