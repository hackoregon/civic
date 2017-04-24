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
