import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './index';

const mockStore = configureMockStore([thunk]);

describe('portland-farmers-markets', () => {
  describe('portland-farmers-markets actions', () => {
    describe('portland-farmers-markets import actions', () => {
      it('should have a start action', () => {
        const expectedAction = {
          type: actions.IMPORT_START,
        };

        expect(actions.portlandFarmersMarketsStart()).to.eql(expectedAction);
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

        expect(actions.portlandFarmersMarketsSuccess(payload)).to.eql(expectedAction);
      });
    });

    describe('portland-farmers-markets import thunk', () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it('should dispatch start and success actions when successful', () => {
        const action1 = { type: actions.IMPORT_START };
        const action2 = { type: actions.IMPORT_SUCCESS };

        return store.dispatch(actions.fetchPortlandFarmersMarkets()).then(() => {
          const actionHistory = store.getActions();

          expect(actionHistory).to.have.lengthOf(2);
          expect(actionHistory[0]).to.eql(action1);
          expect(actionHistory[1].type).to.equal(action2.type);
          expect(actionHistory[1].payload).to.exist;
        });
      });
    });

    describe('portland-farmers-markets setFarmersMarket', () => {
      const selectedMarket = {
        name: 'first market',
      };
      const expectedAction = {
        type: actions.SET_FARMERS_MARKET,
        selectedMarket,
      };

      expect(actions.setFarmersMarket(selectedMarket)).to.eql(expectedAction);
    });
  });

  describe('portland-farmers-markets reducer', () => {
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

    it('should handle SET_FARMERS_MARKET', () => {
      const market = { name: 'first market' };

      expect(reducer({
        pending: false,
        data: null,
      }, {
        type: actions.SET_FARMERS_MARKET,
        selectedMarket: market,
      })).to.eql({
        pending: false,
        data: null,
        selectedMarket: market,
      });
    });

    it('should not change any properties other than selectedMarket', () => {
      const market = { name: 'first market' };
      const data = { do: 'not', dis: 'turb' };

      expect(reducer({
        pending: false,
        data,
      }, {
        type: actions.SET_FARMERS_MARKET,
        selectedMarket: market,
      })).to.eql({
        pending: false,
        data,
        selectedMarket: market,
      });
    });
  });

  describe('portland-farmers-markets selectors', () => {
    describe('getPortlandFarmersMarketsRequest', () => {
      it('extends the root selector', () => {
        const expectation = { one: 'two', three: 4 };

        expect(selectors.getPortlandFarmersMarketsRequest({
          portlandFarmersMarkets: expectation,
        })).to.eql(expectation);

        expect(selectors.getPortlandFarmersMarketsRequest({
          red: 'herring',
          farmersMarkets: {
            portlandFarmersMarkets: expectation,
          },
        })).to.eql(expectation);
      });
    });

    describe('getPortlandFarmersMarketsData', () => {
      it('returns undefined when there is no data', () => {
        expect(selectors.getPortlandFarmersMarketsData({
          portlandFarmersMarkets: {
            no: 'data to be seen',
          },
        })).to.be.undefined;
      });

      it('returns the data when data has a value', () => {
        const data = {
          here: 'it',
          i: 's',
        };
        expect(selectors.getPortlandFarmersMarketsData({
          portlandFarmersMarkets: {
            data,
          },
        })).to.eql(data);
      });
    });

    describe('isPortlandFarmersMarketsPending', () => {
      it('returns false when there is no value for pending', () => {
        expect(selectors.isPortlandFarmersMarketsPending({
          portlandFarmersMarkets: {
            no: 'pending property',
          },
        })).to.be.false;
      });

      it('returns false when the value for pending is false', () => {
        expect(selectors.isPortlandFarmersMarketsPending({
          portlandFarmersMarkets: {
            pending: false,
          },
        })).to.be.false;
      });

      it('returns true when the value for pending is true', () => {
        expect(selectors.isPortlandFarmersMarketsPending({
          portlandFarmersMarkets: {
            pending: true,
          },
        })).to.be.true;
      });
    });

    describe('getActiveFarmersMarket', () => {
      it('returns nothing when there is no selectedMarket property', () => {
        expect(selectors.getActiveFarmersMarket({
          portlandFarmersMarkets: {
            no: 'selected market',
          },
        })).to.be.undefined;
      });

      it('returns nothing when the selectedMarket property has no properties property', () => {
        expect(selectors.getActiveFarmersMarket({
          portlandFarmersMarkets: {
            selectedMarket: {
              wrong: 'format',
            },
          },
        })).to.be.undefined;
      });

      it('returns the properties property from the selectedMarket property', () => {
        const properties = {
          color: 'blue',
          size: 12,
          why: 'because',
        };
        expect(selectors.getActiveFarmersMarket({
          portlandFarmersMarkets: {
            selectedMarket: {
              not: 'interested in this',
              properties,
            },
          },
        })).to.eql(properties);
      });
    });
  });
});
