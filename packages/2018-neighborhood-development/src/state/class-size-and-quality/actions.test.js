import {
  API_START,
  API_SUCCESS,
  API_ERROR,
  classAndSizeQualityStart,
  classAndSizeQualitySuccess,
  classAndSizeQualityError,
} from './actions';

describe('class-size-and-quality actions', () => {
  it('returns the correct start action', () => {
    const expectedAction = {
      type: API_START,
    };

    expect(classAndSizeQualityStart()).to.eql(expectedAction);
  });

  it('sreturns the correct success action', () => {
    const payload = {
      data: [],
    };
    const expectedAction = {
      type: API_SUCCESS,
      payload,
    };
    expect(classAndSizeQualitySuccess(payload)).to.eql(expectedAction);
  });

  it('returns the correct error action', () => {
    const payload = {
      error: 'error',
    };
    const expectedAction = {
      type: API_ERROR,
      payload,
    };

    expect(classAndSizeQualityError(payload)).to.eql(expectedAction);
  });
});
