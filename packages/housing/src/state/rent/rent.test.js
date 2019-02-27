import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { actionTypes } from './constants';
import * as actions from './actions';
import { API_HOST } from '../api';
import reducer from './reducer';
import * as selectors from './selectors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('rent actions', () => {
  describe('rent fetch actions', () => {
    it('should have a start action', () => {
      const expectedAction = {
        type: actionTypes.CALL_START,
      };

      expect(actions.rentStart()).to.eql(expectedAction);
    });

    it('should have a success action', () => {
      const payload = 'Tacos';
      const expectedAction = {
        type: actionTypes.CALL_SUCCESS,
        payload,
      };

      expect(actions.rentSuccess(payload)).to.eql(expectedAction);
    });

    it('should have a fail action', () => {
      const payload = new Error('Hmm. This should not have happened');
      const expectedAction = {
        type: actionTypes.CALL_FAIL,
        payload,
      };

      expect(actions.rentFail(payload)).to.eql(expectedAction);
    });
  });

  describe('rent fetch thunk', () => {
    const commonRentRequest = '/rent?format=json&housing_size=Homeownership';
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => { nock.cleanAll(); });

    it('should dispatch fetch and success when the fetch is successful', () => {
      const mockRentResponse = [
        {
          housing_size: 'Overall',
          NP_ID: 1,
          nh_name: '122nd-Division',
          rent_amt: 917,
          year: 2016,
        },
      ];

      nock(API_HOST)
        .get(commonRentRequest)
        .reply(200, mockRentResponse);

      const expectedActions = [
        { type: actionTypes.CALL_START },
        {
          type: actionTypes.CALL_SUCCESS,
          payload: [{
            rent_amt: 917,
            id: 1,
          }],
        },
      ];

      return store.dispatch(actions.fetchRentData()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

    it('should dispatch fetch and fail when the fetch is unsuccessful', () => {
      nock(API_HOST)
        .get(commonRentRequest)
        .reply(500, { error: 'Request was just no good' });

      const expectedActions = [
        { type: actionTypes.CALL_START },
        {
          type: actionTypes.CALL_FAIL,
          payload: new Error({ error: 'Request was just no good' }),
        },
      ];

      return store.dispatch(actions.fetchRentData()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});

describe('rent reducer', () => {
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

describe('rent selectors', () => {
  let state;
  const rent = {};

  beforeEach(() => {
    state = { rent };
  });

  describe('getRentState', () => {
    it('handles no state without errors', () => {
      selectors.getRentState().should.eql({});
    });
  });

  describe('getRentRequest', () => {
    it('should return an empty object when unset', () => {
      state = {};
      expect(selectors.getRentRequest(state)).to.eql({});
    });

    it('should return the rent request object when set', () => {
      state = { rent: {
        pending: true,
        data: null,
        error: null,
      } };
      expect(selectors.getRentRequest(state)).to.eql(state.rent);
    });
  });

  describe('getRentData', () => {
    it('should return undefined when unset', () => {
      state = {};
      expect(selectors.getRentData(state)).to.be.undefined;
    });

    it('should return rent data when set', () => {
      const data = 'you found it!';
      state = { rent: { data } };
      expect(selectors.getRentData(state)).to.eql(data);
    });
  });
});
