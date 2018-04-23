import { rootState } from './index';

describe('rootState', () => {
  it('uses the full object when the neighborhood key is not present', () => {
    const state = {
      hello: 'world',
    };
    expect(rootState(state)).to.eql(state);
  });

  it('uses the neighborhood object when the neighborhood key is present', () => {
    const state = {
      neighborhood: {
        hello: 'world',
      },
      otherScope: {
        not: 'for you',
      },
    };
    expect(rootState(state)).to.eql(state.neighborhood);
  });
});
