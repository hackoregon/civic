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

describe('populations actions', () => {
  describe('populations fetch actions', () => {
    it('should have a start action', () => {
      const expectedAction = {
        type: actionTypes.CALL_START,
      };

      expect(actions.populationsStart()).to.eql(expectedAction);
    });

    it('should have a success action', () => {
      const payload = {
        data: {
          households: [1, 2, 3],
        },
      };
      const expectedAction = {
        type: actionTypes.CALL_SUCCESS,
        payload,
      };

      expect(actions.populationsSuccess(payload)).to.eql(expectedAction);
    });

    it('should have a fail action', () => {
      const payload = new Error('Hmm. This should not have happened');
      const expectedAction = {
        type: actionTypes.CALL_FAIL,
        payload,
      };

      expect(actions.populationsFail(payload)).to.eql(expectedAction);
    });
  });

  /* eslint-disable no-sparse-arrays, comma-style */
  describe('data normalizer', () => {
    it('should normalize the data', () => {
      expect(
        actions.normalizer([
          {
            NP_ID: 4,
            neighborhood: 'Central City',
            ethnicity: 'Total',
            population: 1337,
            year: '2014',
          },
          {
            NP_ID: 4,
            neighborhood: 'Central City',
            ethnicity: 'Red',
            population: 2.718281828459045,
            year: '2014',
          },
          {
            NP_ID: 1,
            neighborhood: '122nd-Division',
            ethnicity: 'Green',
            population: 42,
            year: '2014',
          },
          {
            NP_ID: 1,
            neighborhood: '122nd-Division',
            ethnicity: 'Blue',
            population: 3.141592653589793,
            year: '2014',
          },
        ])
      ).to.eql([
        ,
        [
          {
            name: 'Green',
            value: 42,
          },
          {
            name: 'Blue',
            value: 3.141592653589793,
          },
        ],
        ,
        ,
        [
          {
            name: 'Red',
            value: 2.718281828459045,
          },
        ],
      ]);
    });
  });
  /* eslint-enable no-sparse-arrays, comma-style */

  describe('populations fetch thunk', () => {
    const populationsRequest = '/poptooltip?format=json';
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should dispatch fetch and success when the fetch is successful', () => {
      const mockPopulationsResponse = [
        {
          NP_ID: 1,
          neighborhood: '122nd-Division',
          ethnicity: 'Martian',
          population: 1.414213562373095,
          year: '2014',
        },
      ];

      nock(API_HOST)
        .get(populationsRequest)
        .reply(200, mockPopulationsResponse);

      /* eslint-disable no-sparse-arrays, comma-style */
      const expectedActions = [
        { type: actionTypes.CALL_START },
        {
          type: actionTypes.CALL_SUCCESS,
          payload: [
            ,
            [
              {
                name: 'Martian',
                value: 1.414213562373095,
              },
            ],
          ],
        },
      ];
      /* eslint-enable no-sparse-arrays, comma-style */

      return store.dispatch(actions.fetchPopulationsData()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

    it('should dispatch fetch and fail when the fetch is unsuccessful', () => {
      nock(API_HOST)
        .get(populationsRequest)
        .reply(500, { error: 'Request was just no good' });

      const expectedActions = [
        { type: actionTypes.CALL_START },
        {
          type: actionTypes.CALL_FAIL,
          payload: new Error({ error: 'Request was just no good' }),
        },
      ];

      return store.dispatch(actions.fetchPopulationsData()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});

describe('populations reducer', () => {
  const initialState = {
    pending: false,
    data: null,
    error: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('should handle CALL_START', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.CALL_START,
      })
    ).to.eql({
      pending: true,
      data: null,
      error: null,
    });

    expect(
      reducer(
        {
          pending: true,
          data: null,
          error: null,
        },
        {
          type: actionTypes.CALL_START,
        }
      )
    ).to.eql({
      pending: true,
      data: null,
      error: null,
    });
  });

  it('should handle CALL_FAIL', () => {
    const error = new Error('oops');

    expect(
      reducer(initialState, {
        type: actionTypes.CALL_FAIL,
        payload: error,
      })
    ).to.eql({
      pending: false,
      data: null,
      error,
    });

    expect(
      reducer(
        {
          pending: true,
          data: ['stuff'],
          error: null,
        },
        {
          type: actionTypes.CALL_FAIL,
          payload: error,
        }
      )
    ).to.eql({
      pending: false,
      data: null,
      error,
    });
  });

  it('should handle CALL_SUCCESS', () => {
    const data = [{ Total: 42 }, { Total: 1337 }];

    expect(
      reducer(initialState, {
        type: actionTypes.CALL_SUCCESS,
        payload: data,
      })
    ).to.eql({
      pending: false,
      error: null,
      data,
    });

    expect(
      reducer(
        {
          pending: true,
          error: new Error('oops'),
          data: null,
        },
        {
          type: actionTypes.CALL_SUCCESS,
          payload: data,
        }
      )
    ).to.eql({
      pending: false,
      error: null,
      data,
    });
  });
});

describe('populations selectors', () => {
  let state;
  const populations = {};

  beforeEach(() => {
    state = { populations };
  });

  describe('getPopulationsState', () => {
    it('handles no state without errors', () => {
      selectors.getPopulationsState().should.eql({});
    });
  });

  describe('getPopulationsRequest', () => {
    it('should return an empty object when unset', () => {
      state = {};
      expect(selectors.getPopulationsRequest(state)).to.eql({});
    });

    it('should return the populations request object when set', () => {
      state = {
        populations: {
          pending: true,
          data: null,
          error: null,
        },
      };
      expect(selectors.getPopulationsRequest(state)).to.eql(state.populations);
    });
  });

  describe('getPopulationsData', () => {
    it('should return undefined when unset', () => {
      state = {};
      expect(selectors.getPopulationsData(state)).to.be.undefined;
    });

    it('should return populations data when set', () => {
      const data = 'you found it!';
      state = { populations: { data } };
      expect(selectors.getPopulationsData(state)).to.eql(data);
    });
  });
});
