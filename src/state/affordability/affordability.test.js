import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { actionTypes } from './constants';
import * as actions from './actions';
import { API_HOST } from '../api';
import reducer from './reducer';
import * as selectors from './selectors';
// import * as state from './api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('affordability actions', () => {
  describe('affordability fetch actions', () => {
    it('should have a start action', () => {
      const expectedAction = {
        type: actionTypes.CALL_START,
      };

      expect(actions.affordabilityStart()).to.eql(expectedAction);
    });

    it('should have a success action', () => {
      const payload = {
        data: {
          neighborhoods: [1, 2, 3],
        },
      };
      const expectedAction = {
        type: actionTypes.CALL_SUCCESS,
        payload,
      };

      expect(actions.affordabilitySuccess(payload)).to.eql(expectedAction);
    });

    it('should have a fail action', () => {
      const payload = new Error('Hmm. This should not have happened');
      const expectedAction = {
        type: actionTypes.CALL_FAIL,
        payload,
      };

      expect(actions.affordabilityFail(payload)).to.eql(expectedAction);
    });
  });

  describe('affordability fetch thunk', () => {
    const commonNeighborhoodRequest = '/affordable?format=json&demographic=Avg.%20Portland%20Household&housing_size=1-BR';
    let store;

    beforeEach(() => {
      store = mockStore({
        app: {
          selectedUnitSize: '1-BR',
        },
      });
    });

    afterEach(() => { nock.cleanAll(); });

    it('should dispatch fetch and success when the fetch is successful', () => {
      const neighborhoods = [
        {
          affordable: true,
          demographic: {
            name: 'Senior',
            income_median: 37469,
            housing_budget: 937,
            per_with_children: 3,
            household_comp: '1.62',
          },
          housing_size: {
            household_type: '1-BR',
          },
          neighborhood: {
            name: 'Centennial-Glenfair-Wilkes',
            report_year: {
              id: 1,
              year: 2016,
            },
          },
        },
      ];

      nock(API_HOST)
        .get(commonNeighborhoodRequest)
        .reply(200, neighborhoods);

      const expectedActions = [
        { type: actionTypes.CALL_START },
        {
          type: actionTypes.CALL_SUCCESS,
          payload: [
            [':D', 'Senior', 37469, 'Centennial-Glenfair-Wilkes', 2016],
          ],
        },
      ];

      return store.dispatch(actions.fetchAffordabilityData()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

    it('should dispatch fetch and fail when the fetch is unsuccessful', () => {
      nock(API_HOST)
        .get(commonNeighborhoodRequest)
        .reply(500, { error: 'Request was just no good' });

      const expectedActions = [
        { type: actionTypes.CALL_START },
        {
          type: actionTypes.CALL_FAIL,
          payload: new Error({ error: 'Request was just no good' }),
        },
      ];

      return store.dispatch(actions.fetchAffordabilityData()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});

describe('affordability reducer', () => {
  const initialState = {
    neighborhood: {
      pending: false,
      data: null,
      error: null,
    },
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('should handle NEIGHBORHOOD_START', () => {
    expect(reducer(initialState, {
      type: actionTypes.CALL_START,
    })).to.eql({
      neighborhood: {
        pending: true,
        data: null,
        error: null,
      },
    });

    expect(reducer({
      neighborhood: {
        pending: false,
        data: ['stuff'],
        error: { some: 'thing' },
      },
    }, {
      type: actionTypes.CALL_START,
    })).to.eql({
      neighborhood: {
        pending: true,
        data: null,
        error: null,
      },
    });
  });

  it('should handle CALL_FAIL', () => {
    const error = new Error('oops');

    expect(reducer(initialState, {
      type: actionTypes.CALL_FAIL,
      payload: error,
    })).to.eql({
      neighborhood: {
        pending: false,
        data: null,
        error,
      },
    });

    expect(reducer({
      neighborhood: {
        pending: true,
        data: ['stuff'],
        error: null,
      },
    }, {
      type: actionTypes.CALL_FAIL,
      payload: error,
    })).to.eql({
      neighborhood: {
        pending: false,
        data: null,
        error,
      },
    });
  });

  it('should handle CALL_SUCCESS', () => {
    const data = [
      [':D', 'Senior', 37469, 'Centennial-Glenfair-Wilkes', 2016],
      [':(', 'Senior', 37469, 'Sellwood-Moreland-Brooklyn', 2016],
    ];

    expect(reducer(initialState, {
      type: actionTypes.CALL_SUCCESS,
      payload: data,
    })).to.eql({
      neighborhood: {
        pending: false,
        error: null,
        data,
      },
    });

    expect(reducer({
      neighborhood: {
        pending: true,
        error: new Error('oops'),
        data: null,
      },
    }, {
      type: actionTypes.CALL_SUCCESS,
      payload: data,
    })).to.eql({
      neighborhood: {
        pending: false,
        error: null,
        data,
      },
    });
  });
});

describe('affordability selectors', () => {
  let state;
  const affordability = {};

  beforeEach(() => {
    state = { affordability };
  });

  describe('getAffordabilityState', () => {
    it('handles no state without errors', () => {
      selectors.getAffordabilityState().should.eql({});
    });
  });

  describe('getNeighborhoodRequest', () => {
    it('should return an empty object when unset', () => {
      state = { affordability: {} };
      expect(selectors.getAffordabilityRequest(state)).to.eql({});
    });

    it('should return the neighborhood request object when set', () => {
      state = { affordability: {
        neighborhood: {
          pending: true,
          data: null,
          error: null,
        },
      } };
      expect(selectors.getAffordabilityRequest(state)).to.eql(state.api.neighborhood);
    });
  });
});
