import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './index';

const DEFAULT_NEIGHBORHOOD = { value: 'ROSE CITY PARK', label: 'Rose City Park' };
const SAMPLE_DATA = [{
  id: 1,
  neighborhood: 'ROSE CITY PARK',
  pct_18_25: 0.11,
  pct_26_32: 0.27,
  pct_33_39: 0.23,
  pct_40_49: 0.18,
  pct_50_plus: 0.21,
  year: 2006,
},
{
  id: 2,
  neighborhood: 'ROSE CITY PARK',
  pct_18_25: 0.12,
  pct_26_32: 0.27,
  pct_33_39: 0.21,
  pct_40_49: 0.17,
  pct_50_plus: 0.23,
  year: 2007,
}];

describe('neighborhood-ages', () => {
  describe('neighborhood-ages actions', () => {
    describe('neighborhood-ages api actions', () => {
      it('should have a start action', () => {
        const expectedAction = {
          type: actions.API_START,
        };

        expect(actions.neighborhoodAgesStart()).to.eql(expectedAction);
      });

      it('should have a success action', () => {
        const payload = {
          some: {
            test: ['d', 'a', 't', 'a'],
          },
        };
        const expectedAction = {
          type: actions.API_SUCCESS,
          payload,
        };
        expect(actions.neighborhoodAgesSuccess(payload)).to.eql(expectedAction);
      });

      it('should have an error action', () => {
        const payload = {
          some: {
            test: ['d', 'a', 't', 'a'],
          },
        };
        const expectedAction = {
          type: actions.API_ERROR,
          payload,
        };

        expect(actions.neighborhoodAgesError(payload)).to.eql(expectedAction);
      });
    });
/*
    describe('neighborhood-ages api thunk', () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it('should dispatch start and success actions when successful', () => {
        const action1 = { type: actions.API_START };
        const action2 = { type: actions.API_SUCCESS };

        return store.dispatch(actions.fetchNeighborhoodAges()).then(() => {
          const actionHistory = store.getActions();

          expect(actionHistory).to.have.lengthOf(2);
          expect(actionHistory[0]).to.eql(action1);
          expect(actionHistory[1].type).to.equal(action2.type);
          expect(actionHistory[1].payload).to.exist;
        });
      });
    });
*/
  });
  describe('neighborhood-ages reducer', () => {
    const initialState = {
      pending: false,
      error: null,
      data: [],
      selectedNeighborhood: null,
    };
    const payload = { stu: 'ff' };

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState);
    });

    it('should handle API_START', () => {
      expect(reducer(initialState, {
        type: actions.API_START,
      })).to.eql({
        pending: true,
        error: null,
        data: [],
        selectedNeighborhood: null,
      });
    });

    it('should handle API_SUCCESS', () => {
      expect(reducer({ pending: true, error: null, data: null }, {
        type: actions.API_SUCCESS,
        payload,
      })).to.eql({
        pending: false,
        data: payload,
        error: null,
      });
    });

    it('should handle API_ERROR', () => {
      expect(reducer({ pending: true, error: null, data: null }, {
        type: actions.API_ERROR,
        payload,
      })).to.eql({
        pending: false,
        error: payload,
        data: null,
      });
    });
  });

  describe('neighborhood-ages selectors', () => {
    describe('getNeighborhoodAgesRequest', () => {
      it('extends the root selector', () => {
        const expectation = { one: 'two', three: 4 };

        expect(selectors.getNeighborhoodAgesRequest({
          neighborhoodAges: expectation,
        })).to.eql(expectation);

        expect(selectors.getNeighborhoodAgesRequest({
          red: 'herring',
          neighborhood: {
            neighborhoodAges: expectation,
          },
        })).to.eql(expectation);
      });
    });

    describe('getNeighborhoodAgesData', () => {
      it('returns undefined when there is no data', () => {
        expect(selectors.getNeighborhoodAgesData({
          neighborhoodAges: {
            no: 'data to be seen',
          },
        })).to.be.undefined;
      });

      it('returns undefined when data has no data', () => {
        expect(selectors.getNeighborhoodAgesData({
          neighborhoodAges: {
            notdata: {
              alsonotdata: {},
            },
          },
        })).to.be.undefined;
      });
    });

    describe('isNeighborhoodAgesPending', () => {
      it('returns undefined when there is no value for pending', () => {
        expect(selectors.isNeighborhoodAgesPending({
          neighborhoodAges: {
            no: 'pending property',
          },
        })).to.be.undefined;
      });

      it('returns false when the value for pending is false', () => {
        expect(selectors.isNeighborhoodAgesPending({
          neighborhoodAges: {
            pending: false,
          },
        })).to.be.false;
      });

      it('returns true when the value for pending is true', () => {
        expect(selectors.isNeighborhoodAgesPending({
          neighborhoodAges: {
            pending: true,
          },
        })).to.be.true;
      });
    });

    describe('getSelectedNeighborhood', () => {
      it('returns undefined when there is no selectedNeighborhood', () => {
        expect(selectors.getSelectedNeighborhood({
          neighborhoodAges: {
            no: 'data to be seen',
          },
        })).to.be.undefined;
      });

      it('returns a selectedNeighborhood when one exists', () => {
        expect(selectors.getSelectedNeighborhood({
          neighborhoodAges: {
            selectedNeighborhood: DEFAULT_NEIGHBORHOOD,
          },
        })).to.eql(DEFAULT_NEIGHBORHOOD.value);
      });
    });

    describe('getListOfNeighborhoods', () => {
      it('returns undefined when there is no data', () => {
        expect(selectors.getListOfNeighborhoods({
          neighborhoodAges: {
            no: 'data to be seen',
          },
        })).to.be.undefined;
      });

      it('returns a listOfNeighborhoods when there is data', () => {
        expect(selectors.getListOfNeighborhoods({
          neighborhoodAges: {
            data: SAMPLE_DATA,
          },
        })).to.eql([DEFAULT_NEIGHBORHOOD]);
      });
    });

    describe('getDataForSelectedNeighborhood', () => {
      const FORMATTED_DATA = [
        { id: 1, neighborhood: 'ROSE CITY PARK', type: '18-25', year: 2006, value: 0.11 },
        { id: 2, neighborhood: 'ROSE CITY PARK', type: '18-25', year: 2007, value: 0.12 },
        { id: 1, neighborhood: 'ROSE CITY PARK', type: '26-32', year: 2006, value: 0.27 },
        { id: 2, neighborhood: 'ROSE CITY PARK', type: '26-32', year: 2007, value: 0.27 },
        { id: 1, neighborhood: 'ROSE CITY PARK', type: '33-39', year: 2006, value: 0.23 },
        { id: 2, neighborhood: 'ROSE CITY PARK', type: '33-39', year: 2007, value: 0.21 },
        { id: 1, neighborhood: 'ROSE CITY PARK', type: '40-49', year: 2006, value: 0.18 },
        { id: 2, neighborhood: 'ROSE CITY PARK', type: '40-49', year: 2007, value: 0.17 },
        { id: 1, neighborhood: 'ROSE CITY PARK', type: '50+', year: 2006, value: 0.21 },
        { id: 2, neighborhood: 'ROSE CITY PARK', type: '50+', year: 2007, value: 0.23 },
      ];
      it('returns false when there is no data', () => {
        expect(selectors.getDataForSelectedNeighborhood({
          neighborhoodAges: {
            no: 'data to be seen',
          },
        })).to.be.false;
      });

      it('returns data for a selectedNeighborhood when there is data', () => {
        expect(selectors.getDataForSelectedNeighborhood({
          neighborhoodAges: {
            data: SAMPLE_DATA,
            selectedNeighborhood: DEFAULT_NEIGHBORHOOD,
          },
        })).to.eql(FORMATTED_DATA);
      });
    });
  });
});
