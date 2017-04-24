import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as state from './api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('api actions', () => {
  describe('neighborhood fetch actions', () => {
    it('should have a start action', () => {
      const expectedAction = {
        type: state.NEIGHBORHOOD_START,
      };

      expect(state.neighborhoodStart()).to.eql(expectedAction);
    });

    it('should have a success action', () => {
      const payload = {
        data: {
          neighborhoods: [1, 2, 3],
        },
      };
      const expectedAction = {
        type: state.NEIGHBORHOOD_SUCCESS,
        payload,
      };

      expect(state.neighborhoodSuccess(payload)).to.eql(expectedAction);
    });

    it('should have a fail action', () => {
      const payload = new Error('Hmm. This should not have happened');
      const expectedAction = {
        type: state.NEIGHBORHOOD_FAIL,
        payload,
      };

      expect(state.neighborhoodFail(payload)).to.eql(expectedAction);
    });
  });

  describe('neighborhood fetch thunk', () => {
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

      nock(state.API_HOST)
        .get(commonNeighborhoodRequest)
        .reply(200, neighborhoods);

      const expectedActions = [
        { type: state.NEIGHBORHOOD_START },
        {
          type: state.NEIGHBORHOOD_SUCCESS,
          payload: [
            [':D', 'Senior', 37469, 'Centennial-Glenfair-Wilkes', 2016],
          ],
        },
      ];

      return store.dispatch(state.neighborhoodFetch()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

    it('should dispatch fetch and fail when the fetch is unsuccessful', () => {
      nock(state.API_HOST)
        .get(commonNeighborhoodRequest)
        .reply(500, { error: 'Request was just no good' });

      const expectedActions = [
        { type: state.NEIGHBORHOOD_START },
        {
          type: state.NEIGHBORHOOD_FAIL,
          payload: new Error({ error: 'Request was just no good' }),
        },
      ];

      return store.dispatch(state.neighborhoodFetch()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});

describe('api reducer', () => {
  const reducer = state.default;
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
      type: state.NEIGHBORHOOD_START,
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
      type: state.NEIGHBORHOOD_START,
    })).to.eql({
      neighborhood: {
        pending: true,
        data: null,
        error: null,
      },
    });
  });

  it('should handle NEIGHBORHOOD_FAIL', () => {
    const error = new Error('oops');

    expect(reducer(initialState, {
      type: state.NEIGHBORHOOD_FAIL,
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
      type: state.NEIGHBORHOOD_FAIL,
      payload: error,
    })).to.eql({
      neighborhood: {
        pending: false,
        data: null,
        error,
      },
    });
  });

  it('should handle NEIGHBORHOOD_SUCCESS', () => {
    const data = [
      [':D', 'Senior', 37469, 'Centennial-Glenfair-Wilkes', 2016],
      [':(', 'Senior', 37469, 'Sellwood-Moreland-Brooklyn', 2016],
    ];

    expect(reducer(initialState, {
      type: state.NEIGHBORHOOD_SUCCESS,
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
      type: state.NEIGHBORHOOD_SUCCESS,
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
