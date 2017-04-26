import { assocPath } from 'ramda';
import * as selectors from './selectors';
import * as constants from '../../utils/data-constants';
import * as actions from './actions';
import { actionTypes, INITIAL_USER_STATE, INITIAL_OTHER_STATE } from './constants';
import reducer from './reducer';

let state;
const parameters = {};
const ARBITRARY = 'Ron Burgundy';

describe('parameters selectors', () => {
  beforeEach(() => {
    state = { parameters };
  });

  describe('getUserState', () => {
    it('handles no state without errors', () => {
      expect(selectors.getUserState()).to.eql(undefined);
    });
  });

  describe('getOtherState', () => {
    it('handles no state without errors', () => {
      expect(selectors.getOtherState()).to.eql(undefined);
    });
  });

  describe('getUserUnitSize', () => {
    it('should return the first unit size when unset', () => {
      state = { parameters: {} };
      expect(selectors.getUserUnitSize(state)).to.eql(constants.UNIT_SIZES_RENT[0]);
    });

    it('should return the set unit size when the state is set', () => {
      state = { parameters: { user: { unitSize: ARBITRARY } } };
      expect(selectors.getUserUnitSize(state)).to.eql(ARBITRARY);
    });
  });

  describe('getUserIncome', () => {
    it('should return the default income when unset', () => {
      state = { parameters: {} };
      expect(selectors.getUserIncome(state)).to.eql(constants.DEFAULT_INCOME);
    });

    it('should return the set user income when state is set', () => {
      state = { parameters: { user: { income: ARBITRARY } } };
      expect(selectors.getUserIncome(state)).to.eql(ARBITRARY);
    });
  });

  describe('getOtherUnitSize', () => {
    it('should return the first unit size when unset', () => {
      state = { parameters: {} };
      expect(selectors.getOtherUnitSize(state)).to.eql(constants.UNIT_SIZES_AFFORDABILITY[0]);
    });

    it('should return the set unit size when the state is set', () => {
      state = { parameters: { other: { unitSize: ARBITRARY } } };
      expect(selectors.getOtherUnitSize(state)).to.eql(ARBITRARY);
    });
  });

  describe('getOtherDemographic', () => {
    it('should return the first demographic when unset', () => {
      state = { app: {} };
      expect(selectors.getOtherDemographic(state)).to.eql(constants.DEMOGRAPHICS[0]);
    });

    it('should return the set demographic when the state is set', () => {
      state = { parameters: { other: { demographic: ARBITRARY } } };
      expect(selectors.getOtherDemographic(state)).to.eql(ARBITRARY);
    });
  });
});

describe('parameters actions', () => {
  it('should have an updateUserUnitSize action', () => {
    const unitSize = '3-BR';
    const expectedAction = {
      type: actionTypes.UPDATE_USER_UNIT_SIZE,
      payload: unitSize,
    };

    expect(actions.updateUserUnitSize(unitSize)).to.eql(expectedAction);
  });

  it('should have an updateOtherUnitSize action', () => {
    const unitSize = '3-BR';
    const expectedAction = {
      type: actionTypes.UPDATE_OTHER_UNIT_SIZE,
      payload: unitSize,
    };

    expect(actions.updateOtherUnitSize(unitSize)).to.eql(expectedAction);
  });

  it('should have an updateOtherDemographic action', () => {
    const demographic = 'Low Income';
    const expectedAction = {
      type: actionTypes.UPDATE_OTHER_DEMOGRAPHIC,
      payload: demographic,
    };

    expect(actions.updateOtherDemographic(demographic)).to.eql(expectedAction);
  });

  it('should have an updateUserIncome action', () => {
    const income = 1000000000;
    const expectedAction = {
      type: actionTypes.UPDATE_USER_INCOME,
      payload: income,
    };

    expect(actions.updateUserIncome(income)).to.eql(expectedAction);
  });
});

describe('parameters reducer', () => {
  const initialState = {
    user: INITIAL_USER_STATE,
    other: INITIAL_OTHER_STATE,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('should handle UPDATE_USER_UNIT_SIZE', () => {
    expect(reducer(initialState, {
      type: actionTypes.UPDATE_USER_UNIT_SIZE,
      payload: 'Studio',
    })).to.eql(assocPath(['user', 'unitSize'], 'Studio', initialState));

    expect(reducer({
      user: {
        unitSize: '1-BR',
        demographic: 'Senior',
      },
      other: INITIAL_OTHER_STATE,
    }, {
      type: actionTypes.UPDATE_USER_UNIT_SIZE,
      payload: 'Studio',
    })).to.eql({
      user: {
        unitSize: 'Studio',
        demographic: 'Senior',
      },
      other: INITIAL_OTHER_STATE,
    });
  });

  it('should handle UPDATE_OTHER_UNIT_SIZE', () => {
    expect(reducer(initialState, {
      type: actionTypes.UPDATE_OTHER_UNIT_SIZE,
      payload: 'Studio',
    })).to.eql(assocPath(['other', 'unitSize'], 'Studio', initialState));

    expect(reducer({
      other: {
        unitSize: '1-BR',
        income: 50000,
      },
      user: INITIAL_USER_STATE,
    }, {
      type: actionTypes.UPDATE_OTHER_UNIT_SIZE,
      payload: 'Studio',
    })).to.eql({
      other: {
        unitSize: 'Studio',
        income: 50000,
      },
      user: INITIAL_USER_STATE,
    });
  });

  it('should handle UPDATE_OTHER_DEMOGRAPHIC', () => {
    expect(reducer(initialState, {
      type: actionTypes.UPDATE_OTHER_DEMOGRAPHIC,
      payload: 'Couple With Family',
    })).to.eql(assocPath(['other', 'demographic'], 'Couple With Family', initialState));
  });

  it('should handle UPDATE_USER_INCOME', () => {
    expect(reducer(initialState, {
      type: actionTypes.UPDATE_USER_INCOME,
      payload: 5000000000,
    })).to.eql(assocPath(['user', 'income'], 5000000000, initialState));
  });
});
