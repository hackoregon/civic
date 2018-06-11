import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './index';

const mockStore = configureMockStore([thunk]);

describe('ridership-over-time', () => {
  describe('ridership-over-time actions', () => {
    describe('ridership-over-time import actions', () => {
      it('should have a start action', () => {
        const expectedAction = {
          type: actions.IMPORT_START,
        };

        expect(actions.ridershipOverTimeStart()).to.eql(expectedAction);
      });

      it('should have a success action', () => {
        const payload = {
          some: {
            test: ['d', 'a', 't', 'a'],
          },
        };
        const expectedAction = {
          type: actions.IMPORT_SUCCESS,
          payload,
        };

        expect(actions.ridershipOverTimeSuccess(payload)).to.eql(expectedAction);
      });
    });

    describe('ridership-over-time import thunk', () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it('should dispatch start and success actions when successful', () => {
        const action1 = { type: actions.IMPORT_START };
        const action2 = { type: actions.IMPORT_SUCCESS };

        return store.dispatch(actions.fetchRidershipOverTime()).then(() => {
          const actionHistory = store.getActions();

          expect(actionHistory).to.have.lengthOf(2);
          expect(actionHistory[0]).to.eql(action1);
          expect(actionHistory[1].type).to.equal(action2.type);
          expect(actionHistory[1].payload).to.exist;
        });
      });
    });
  });

  describe('ridership-over-time reducer', () => {
    const initialState = {
      pending: false,
      data: null,
    };

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState);
    });

    it('should handle IMPORT_START', () => {
      expect(reducer(initialState, {
        type: actions.IMPORT_START,
      })).to.eql({
        pending: true,
        data: null,
      });
    });

    const payload = { stu: 'ff' };

    it('should handle IMPORT_SUCCESS', () => {
      expect(reducer({ pending: true, data: null }, {
        type: actions.IMPORT_SUCCESS,
        payload,
      })).to.eql({
        pending: false,
        data: payload,
      });
    });
  });

  describe('ridership-over-time selectors', () => {
    describe('getRidershipOverTimeRequest', () => {
      it('extends the root selector', () => {
        const expectation = { one: 'two', three: 4 };

        expect(selectors.getRidershipOverTimeRequest({
          ridershipOverTime: expectation,
        })).to.eql(expectation);

        expect(selectors.getRidershipOverTimeRequest({
          red: 'herring',
          ridership: {
            ridershipOverTime: expectation,
          },
        })).to.eql(expectation);
      });
    });

    describe('getridershipOverTimeData', () => {
      it('returns undefined when there is no data', () => {
        expect(selectors.getRidershipOverTimeData({
          ridershipOverTime: {
            no: 'data to be seen',
          },
        })).to.be.undefined;
      });

      it('returns undefined when data has no value for ridershipByYear', () => {
        expect(selectors.getRidershipOverTimeData({
          ridershipOverTime: {
            data: {
              NotridershipByYear: {},
            },
          },
        })).to.be.undefined;
      });

      it('returns the data when data has a value for ridershipByYear', () => {
        const data = {
          here: 'it',
          i: 's',
        };
        expect(selectors.getRidershipOverTimeData({
          ridershipOverTime: {
            data: {
              ridershipByYear: data,
            },
          },
        })).to.eql(data);
      });
    });

    describe('isridershipOverTimePending', () => {
      it('returns false when there is no value for pending', () => {
        expect(selectors.isRidershipOverTimePending({
          ridershipOverTime: {
            no: 'pending property',
          },
        })).to.be.false;
      });

      it('returns false when the value for pending is false', () => {
        expect(selectors.isRidershipOverTimePending({
          ridershipOverTime: {
            pending: false,
          },
        })).to.be.false;
      });

      it('returns true when the value for pending is true', () => {
        expect(selectors.isRidershipOverTimePending({
          ridershipOverTime: {
            pending: true,
          },
        })).to.be.true;
      });
    });
  });
});
