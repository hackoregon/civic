import * as selectors from './app';

let state;
const app = {};
const ARBITRARY = 'Ron Burgundy';

describe('app selectors', () => {
  beforeEach(() => {
    state = { app };
  });
  describe('getAppState', () => {
    it('handles no state without errors', () => {
      selectors.getAppState().should.be.eql({});
    });
  });
  describe('getOpenModal', () => {
    it('should return the correct data', () => {
      state = { app: { openModal: ARBITRARY } };
      expect(selectors.getOpenModal(state)).to.be.eql(ARBITRARY);
      state = { app: { openModal: null } };
      expect(selectors.getOpenModal(state)).to.not.be.eql(ARBITRARY);
    });
  });
});
