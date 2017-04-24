import * as state from './app';

describe('app actions', () => {
  it('should have an updateSelectedUnitSize action', () => {
    const unitSize = '3-BR';
    const expectedAction = {
      type: state.UPDATE_UNIT_SIZE,
      unitSize,
    };

    expect(state.updateSelectedUnitSize(unitSize)).to.eql(expectedAction);
  });

  it('should have an updateSelectedDemographic action', () => {
    const demographic = 'Low Income';
    const expectedAction = {
      type: state.UPDATE_DEMOGRAPHIC,
      demographic,
    };

    expect(state.updateSelectedDemographic(demographic)).to.eql(expectedAction);
  });
});

describe('app reducer', () => {
  const reducer = state.default;
  const initialState = {};

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('should handle UPDATE_UNIT_SIZE', () => {
    expect(reducer(initialState, {
      type: state.UPDATE_UNIT_SIZE,
      unitSize: 'Studio',
    })).to.eql({
      selectedUnitSize: 'Studio',
    });

    expect(reducer({
      selectedUnitSize: '1-BR',
      selectedDemographic: 'Senior',
    }, {
      type: state.UPDATE_UNIT_SIZE,
      unitSize: 'Studio',
    })).to.eql({
      selectedUnitSize: 'Studio',
      selectedDemographic: 'Senior',
    });
  });

  it('should handle UPDATE_DEMOGRAPHIC', () => {
    expect(reducer(initialState, {
      type: state.UPDATE_DEMOGRAPHIC,
      demographic: 'Couple With Family',
    })).to.eql({
      selectedDemographic: 'Couple With Family',
    });

    expect(reducer({
      selectedUnitSize: 'Studio',
      selectedDemographic: 'Senior',
    }, {
      type: state.UPDATE_DEMOGRAPHIC,
      demographic: 'Couple With Family',
    })).to.eql({
      selectedUnitSize: 'Studio',
      selectedDemographic: 'Couple With Family',
    });
  });
});
