import * as selectors from './app';

describe('app selectors', () => {
  describe('getAppState', () => {
    it('handles no state without errors', () => {
      selectors.getAppState().should.be.eql({});
    });
  });
});
