import * as selectors from './api';

let state;
const api = {};

describe('api selectors', () => {
  beforeEach(() => {
    state = { api };
  });

  describe('getApiState', () => {
    it('handles no state without errors', () => {
      selectors.getApiState().should.eql({});
    });
  });

  describe('getNeighborhoodRequest', () => {
    it('should return an empty object when unset', () => {
      state = { api: {} };
      expect(selectors.getNeighborhoodRequest(state)).to.eql({});
    });

    it('should return the neighborhood request object when set', () => {
      state = { api: {
        neighborhood: {
          pending: true,
          data: null,
          error: null,
        },
      } };
      expect(selectors.getNeighborhoodRequest(state)).to.eql(state.api.neighborhood);
    });
  });
});
