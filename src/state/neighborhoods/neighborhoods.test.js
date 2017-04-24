// import nock from 'nock';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import { actionTypes } from './constants';
import * as actions from './actions';
import reducer from './reducer';
import * as selectors from './selectors';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

describe('neighborhoods actions', () => {
  describe('neighborhoods fetch actions', () => {
    it('should have a start action', () => {
      const expectedAction = {
        type: actionTypes.CALL_START,
      };

      expect(actions.neighborhoodsStart()).to.eql(expectedAction);
    });

    it('should have a success action', () => {
      const payload = 'Tacos';
      const expectedAction = {
        type: actionTypes.CALL_SUCCESS,
        payload,
      };

      expect(actions.neighborhoodsSuccess(payload)).to.eql(expectedAction);
    });

    it('should have a fail action', () => {
      const payload = new Error('Hmm. This should not have happened');
      const expectedAction = {
        type: actionTypes.CALL_FAIL,
        payload,
      };

      expect(actions.neighborhoodsFail(payload)).to.eql(expectedAction);
    });
  });

/**
 * @NOTE: tests of fetch aren't working because file-loader
 *        is not configured in the test environment
 * @TODO: figure out how to configure test loaders, or figure out how to mock call
 */
//   describe('neighborhoods fetch thunk', () => {
//     let store;
//
//     beforeEach(() => {
//       store = mockStore({});
//     });
//
//     afterEach(() => { nock.cleanAll(); });
//
//     it('should dispatch fetch and success when the fetch is successful', () => {
//       const mockNeighborhoodsResponse = {
//         features: [{
//           id: 1,
//           geometry: [],
//         }],
//       };
//
//       nock('/')
//         .get('neighborhoods.geojson')
//         .reply(200, mockNeighborhoodsResponse);
//
//       const expectedActions = [
//         { type: actionTypes.CALL_START },
//         {
//           type: actionTypes.CALL_SUCCESS,
//           payload: [{
//             rent_amt: 917,
//             id: 1,
//           }],
//         },
//       ];
//
//       return store.dispatch(actions.fetchNeighborhoods()).then(() => {
//         expect(store.getActions()).to.eql(expectedActions);
//       });
//     });
//
//     it('should dispatch fetch and fail when the fetch is unsuccessful', () => {
//       nock('/')
//         .get('neighborhoods.geojson')
//         .reply(500, { error: 'Request was just no good' });
//
//       const expectedActions = [
//         { type: actionTypes.CALL_START },
//         {
//           type: actionTypes.CALL_FAIL,
//           payload: new Error({ error: 'Request was just no good' }),
//         },
//       ];
//
//       return store.dispatch(actions.fetchNeighborhoods()).then(() => {
//         expect(store.getActions()).to.eql(expectedActions);
//       });
//     });
//   });
});

describe('neighborhoods reducer', () => {
  const initialState = {
    pending: false,
    data: null,
    error: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('should handle CALL_START', () => {
    expect(reducer(initialState, {
      type: actionTypes.CALL_START,
    })).to.eql({
      pending: true,
      data: null,
      error: null,
    });

    expect(reducer({
      pending: true,
      data: null,
      error: null,
    }, {
      type: actionTypes.CALL_START,
    })).to.eql({
      pending: true,
      data: null,
      error: null,
    });
  });

  it('should handle CALL_FAIL', () => {
    const error = new Error('oops');

    expect(reducer(initialState, {
      type: actionTypes.CALL_FAIL,
      payload: error,
    })).to.eql({
      pending: false,
      data: null,
      error,
    });

    expect(reducer({
      pending: true,
      data: ['stuff'],
      error: null,
    }, {
      type: actionTypes.CALL_FAIL,
      payload: error,
    })).to.eql({
      pending: false,
      data: null,
      error,
    });
  });

  it('should handle CALL_SUCCESS', () => {
    const data = 'Really good tacos';

    expect(reducer(initialState, {
      type: actionTypes.CALL_SUCCESS,
      payload: data,
    })).to.eql({
      pending: false,
      error: null,
      data,
    });

    expect(reducer({
      pending: true,
      error: new Error('oops'),
      data: null,
    }, {
      type: actionTypes.CALL_SUCCESS,
      payload: data,
    })).to.eql({
      pending: false,
      error: null,
      data,
    });
  });
});

describe('neighborhoods selectors', () => {
  let state;
  const rent = {};

  beforeEach(() => {
    state = { rent };
  });

  describe('getNeighborhoodsState', () => {
    it('handles no state without errors', () => {
      selectors.getNeighborhoodsState().should.eql({});
    });
  });

  describe('getNeighborhoodsRequest', () => {
    it('should return an empty object when unset', () => {
      state = {};
      expect(selectors.getNeighborhoodsRequest(state)).to.eql({});
    });

    it('should return the rent request object when set', () => {
      state = { neighborhoods: {
        pending: true,
        data: null,
        error: null,
      } };
      expect(selectors.getNeighborhoodsRequest(state)).to.eql(state.neighborhoods);
    });
  });

  describe('getNeighborhoodsData', () => {
    it('should return undefined when unset', () => {
      state = {};
      expect(selectors.getNeighborhoodsData(state)).to.be.undefined;
    });

    it('should return rent data when set', () => {
      const data = 'you found it!';
      state = { neighborhoods: { data } };
      expect(selectors.getNeighborhoodsData(state)).to.eql(data);
    });
  });
});
