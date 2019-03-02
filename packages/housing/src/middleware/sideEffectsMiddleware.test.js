import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import sideEffectsMiddleware, {
  EXAMPLE_NEXT_ACTION,
  EXAMPLE_ACTION,
} from './sideEffectsMiddleware';

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
    const exampleAction = { type: EXAMPLE_ACTION, payload };

    store.dispatch(exampleAction);
    expect(dispatchSpy).to.have.been.calledWith(exampleAction);

    const actions = store.getActions();

    expect(actions[0]).to.eql(EXAMPLE_NEXT_ACTION);
  });
});
