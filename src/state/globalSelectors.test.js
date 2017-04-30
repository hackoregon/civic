import { assocPath } from 'ramda';
import {
  getCombinedNeighborhoodsData,
  getCombinedDemographicData,
  isAnyCallPending,
} from './globalSelectors';

describe('globalSelectors', () => {
  describe('isAnyCallPending', () => {
    const initialState = {
      neighborhoods: { pending: true },
      affordability: { pending: true },
      rent: { pending: true },
    };
    it('should return true if any call is pending, false if not', () => {
      let state = initialState;
      expect(isAnyCallPending(state)).to.be.true;

      state = assocPath(['neighborhoods', 'pending'], false, state);

      expect(isAnyCallPending(state)).to.be.true;

      state = assocPath(['affordability', 'pending'], false, state);

      expect(isAnyCallPending(state)).to.be.true;

      state = assocPath(['rent', 'pending'], false, state);

      expect(isAnyCallPending(state)).to.be.false;
    });
  });

  describe('getCombinedNeighborhoodsData', () => {
    const initialState = {
      neighborhoods: { data: null },
      affordability: { data: null },
      rent: { data: null },
      parameters: { user: { income: 40000 } },
    };

    it('should handle an unset store', () => {
      expect(getCombinedNeighborhoodsData()).to.be.null;
    });

    it('should return null unless all data is present and arraylike', () => {
      let state = initialState;
      expect(getCombinedNeighborhoodsData(state)).to.be.null;

      state = assocPath(['neighborhoods', 'data'], [], state);

      expect(getCombinedNeighborhoodsData(state)).to.be.null;

      state = assocPath(['rent', 'data'], [], state);

      expect(getCombinedNeighborhoodsData(state)).to.be.null;

      state = assocPath(['affordability', 'data'], [], state);

      expect(getCombinedNeighborhoodsData(state)).to.be.not.null;
    });

    it('should associate data by neighborhood id', () => {
      const state = {
        neighborhoods: { data: [{ name: 'My hood', id: 1, type: 'Feature' }] },
        affordability: { data: [{ id: 1, affordable: true }] },
        rent: { data: [{ id: 1, rent_amt: 10000000 }] },
        parameters: { user: { income: 40000 } },
      };

      const expectedResult = {
        type: 'FeatureCollection',
        features: [
          {
            name: 'My hood',
            id: 1,
            type: 'Feature',
            affordableYou: false,
            affordableOther: true,
          },
        ],
      };

      expect(getCombinedNeighborhoodsData(state)).to.eql(expectedResult);
    });
  });

  describe('getCombinedDemographicData', () => {
    const initialState = {
      households: { data: null },
      populations: { data: null },
      parameters: { neighborhood: 25 },
    };

    it('should handle an unset store', () => {
      expect(getCombinedDemographicData()).to.be.null;
    });

    it('should return null unless all data is present and arraylike', () => {
      let state = initialState;
      expect(getCombinedDemographicData(state)).to.be.null;

      state = assocPath(['households', 'data'], [], state);

      expect(getCombinedDemographicData(state)).to.be.null;

      state = assocPath(['populations', 'data'], [], state);

      expect(getCombinedDemographicData(state)).to.be.not.null;
    });

    it('should associate data by neighborhood id', () => {
      const state = {
        households: { data: [null, null, { someHousehold: 42 }, null] },
        populations: { data: [null, null, { somePopulation: 1337 }, null] },
        parameters: { neighborhood: { id: 2, name: 'Mr. Rogers' } },
      };

      const expectedResult = {
        name: 'Mr. Rogers',
        households: { someHousehold: 42 },
        populations: { somePopulation: 1337 },
      };

      expect(getCombinedDemographicData(state)).to.eql(expectedResult);
    });
  });
});
