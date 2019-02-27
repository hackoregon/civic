import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import sideEffectsMiddleware, { TEST_ACTION } from './sideEffectsMiddleware';
import { OPEN_MODAL } from '../state/app';

const middlewares = [thunk, sideEffectsMiddleware];

const mockStore = configureStore(middlewares);

describe('middleware', () => {
  it('should dispatch actions normally', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const testAction = { type: 'HI THERE' };
    store.dispatch(testAction);
    const actions = store.getActions();
    expect(actions[0]).to.eql(testAction);
  });

  it('should trigger the next action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const dispatchSpy = sinon.spy(store, 'dispatch');

    const payload = 'ARBITRARY';
    const openModalAction = { type: OPEN_MODAL,
      payload,
    };

    store.dispatch(openModalAction);
    expect(dispatchSpy).to.have.been.calledWith(openModalAction);

    const actions = store.getActions();

    expect(actions[0]).to.eql(TEST_ACTION);
  });
});
