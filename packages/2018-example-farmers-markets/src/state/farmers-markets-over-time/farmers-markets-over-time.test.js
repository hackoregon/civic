import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './index';

const mockStore = configureMockStore([thunk]);

describe('farmers-markets-over-time', () => {
  describe('farmers-markets-over-time actions', () => {
    describe('farmers-markets-over-time import actions', () => {
      it('should have a start action', () => {
        const expectedAction = {
          type: actions.IMPORT_START,
        };

        expect(actions.farmersMarketsOverTimeStart()).to.eql(expectedAction);
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

        expect(actions.farmersMarketsOverTimeSuccess(payload)).to.eql(
          expectedAction
        );
      });
    });

    describe('farmers-markets-over-time import thunk', () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it('should dispatch start and success actions when successful', () => {
        const action1 = { type: actions.IMPORT_START };
        const action2 = { type: actions.IMPORT_SUCCESS };

        return store
          .dispatch(actions.fetchFarmersMarketsOverTime())
          .then(() => {
            const actionHistory = store.getActions();

            expect(actionHistory).to.have.lengthOf(2);
            expect(actionHistory[0]).to.eql(action1);
            expect(actionHistory[1].type).to.equal(action2.type);
            expect(actionHistory[1].payload).to.exist;
          });
      });
    });
  });

  describe('farmers-markets-over-time reducer', () => {
    const initialState = {
      pending: false,
      data: null,
    };

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState);
    });

    it('should handle IMPORT_START', () => {
      expect(
        reducer(initialState, {
          type: actions.IMPORT_START,
        })
      ).to.eql({
        pending: true,
        data: null,
      });
    });

    const payload = { stu: 'ff' };

    it('should handle IMPORT_SUCCESS', () => {
      expect(
        reducer(
          { pending: true, data: null },
          {
            type: actions.IMPORT_SUCCESS,
            payload,
          }
        )
      ).to.eql({
        pending: false,
        data: payload,
      });
    });
  });

  describe('farmers-markets-over-time selectors', () => {
    describe('getFarmersMarketsOverTimeRequest', () => {
      it('extends the root selector', () => {
        const expectation = { one: 'two', three: 4 };

        expect(
          selectors.getFarmersMarketsOverTimeRequest({
            farmersMarketsOverTime: expectation,
          })
        ).to.eql(expectation);

        expect(
          selectors.getFarmersMarketsOverTimeRequest({
            red: 'herring',
            farmersMarkets: {
              farmersMarketsOverTime: expectation,
            },
          })
        ).to.eql(expectation);
      });
    });

    describe('getFarmersMarketsOverTimeData', () => {
      it('returns undefined when there is no data', () => {
        expect(
          selectors.getFarmersMarketsOverTimeData({
            farmersMarketsOverTime: {
              no: 'data to be seen',
            },
          })
        ).to.be.undefined;
      });

      it('returns undefined when data has no value for FarmersMarketsByYear', () => {
        expect(
          selectors.getFarmersMarketsOverTimeData({
            farmersMarketsOverTime: {
              data: {
                NotFarmersMarketsByYear: {},
              },
            },
          })
        ).to.be.undefined;
      });

      it('returns the data when data has a value for FarmersMarketsByYear', () => {
        const data = {
          here: 'it',
          i: 's',
        };
        expect(
          selectors.getFarmersMarketsOverTimeData({
            farmersMarketsOverTime: {
              data: {
                FarmersMarketsByYear: data,
              },
            },
          })
        ).to.eql(data);
      });
    });

    describe('isFarmersMarketsOverTimePending', () => {
      it('returns false when there is no value for pending', () => {
        expect(
          selectors.isFarmersMarketsOverTimePending({
            farmersMarketsOverTime: {
              no: 'pending property',
            },
          })
        ).to.be.false;
      });

      it('returns false when the value for pending is false', () => {
        expect(
          selectors.isFarmersMarketsOverTimePending({
            farmersMarketsOverTime: {
              pending: false,
            },
          })
        ).to.be.false;
      });

      it('returns true when the value for pending is true', () => {
        expect(
          selectors.isFarmersMarketsOverTimePending({
            farmersMarketsOverTime: {
              pending: true,
            },
          })
        ).to.be.true;
      });
    });
  });
});
