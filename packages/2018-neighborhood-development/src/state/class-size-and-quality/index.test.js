import reducer, { INITIAL_STATE } from './index';
import {
  API_START,
  API_SUCCESS,
  API_ERROR,
} from './actions';

describe('class-size-and-quality reducer', () => {
  it('returns the initial state', () => {
    const result = reducer(undefined, {});

    expect(result).to.eql(INITIAL_STATE);
  });

  it('handles API_START action', () => {
    const result = reducer(INITIAL_STATE, { type: API_START });

    const expected = {
      ...INITIAL_STATE,
      pending: true,
    };

    expect(result).to.eql(expected);
  });

  it('handles API_SUCCESS action', () => {
    const payload = [];
    const result = reducer(INITIAL_STATE, { type: API_SUCCESS, payload });

    const expected = {
      ...INITIAL_STATE,
      data: payload,
    };

    expect(result).to.eql(expected);
  });

  it('handles API_ERROR action', () => {
    const payload = 'Test Error';
    const result = reducer(INITIAL_STATE, { type: API_ERROR, payload });

    const expected = {
      ...INITIAL_STATE,
      error: payload,
    };

    expect(result).to.eql(expected);
  });
});
