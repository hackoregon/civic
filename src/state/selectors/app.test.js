import * as selectors from './app';
import * as constants from '../../utils/data-constants';

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

  describe('getSelectedUnitSize', () => {
    it('should return the first unit size when unset', () => {
      state = { app: {} };
      expect(selectors.getSelectedUnitSize(state)).to.be.eql(constants.UNIT_SIZES[0]);
    });

    it('should return the set unit size when the state is set', () => {
      state = { app: { selectedUnitSize: ARBITRARY } };
      expect(selectors.getSelectedUnitSize(state)).to.be.eql(ARBITRARY);
    });
  });

  describe('getSelectedDemographic', () => {
    it('should return the first demographic when unset', () => {
      state = { app: {} };
      expect(selectors.getSelectedDemographic(state)).to.be.eql(constants.DEMOGRAPHICS[0]);
    });

    it('should return the set demographic when the state is set', () => {
      state = { app: { selectedDemographic: ARBITRARY } };
      expect(selectors.getSelectedDemographic(state)).to.be.eql(ARBITRARY);
    });
  });
});
