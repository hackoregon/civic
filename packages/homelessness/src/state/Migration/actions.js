/*
 *
 * Migration actions
 *
 */

 import { actionTypes } from './constants';
 import { compareMigrationApi } from '../../api';

 const getMigrationDemo = payload => ({
   type: actionTypes.GET_MIGRATION_DEMO,
   payload,
 });

 const getMigrationDemoSuccess = payload => ({
   type: actionTypes.GET_MIGRATION_DEMO_SUCCESS,
   payload,
 });

 const getMigrationDemoFailure = payload => ({
   type: actionTypes.GET_MIGRATION_DEMO_FAILURE,
   payload,
 });

 export const fetchMigrationDemoData = payload => (dispatch) => {
   dispatch(getMigrationDemo());
   return compareMigrationApi(payload)
    .then(
      d => dispatch(getMigrationDemoSuccess(d)),
      e => dispatch(getMigrationDemoFailure(e)),
    );
 };

 export default {
   fetchMigrationDemoData,
 };
