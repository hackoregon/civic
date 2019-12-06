import nock from "nock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { actionTypes } from "./constants";
import * as actions from "./actions";
import { API_HOST } from "../api";
import reducer from "./reducer";
import * as selectors from "./selectors";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("households actions", () => {
  describe("households fetch actions", () => {
    it("should have a start action", () => {
      const expectedAction = {
        type: actionTypes.CALL_START
      };

      expect(actions.householdsStart()).to.eql(expectedAction);
    });

    it("should have a success action", () => {
      const payload = {
        data: {
          households: [1, 2, 3]
        }
      };
      const expectedAction = {
        type: actionTypes.CALL_SUCCESS,
        payload
      };

      expect(actions.householdsSuccess(payload)).to.eql(expectedAction);
    });

    it("should have a fail action", () => {
      const payload = new Error("Hmm. This should not have happened");
      const expectedAction = {
        type: actionTypes.CALL_FAIL,
        payload
      };

      expect(actions.householdsFail(payload)).to.eql(expectedAction);
    });
  });

  /* eslint-disable no-sparse-arrays, comma-style */
  describe("data normalizer", () => {
    it("should normalize the data", () => {
      expect(
        actions.normalizer([
          {
            NP_ID: 4,
            neighborhood: "Central City",
            demographic: "Households",
            households: 21028,
            year: "2014"
          },
          {
            NP_ID: 4,
            neighborhood: "Central City",
            demographic: "Households with Children",
            households: 1037,
            year: "2014"
          },
          {
            NP_ID: 1,
            neighborhood: "122nd-Division",
            demographic: "Households",
            households: 7635,
            year: "2014"
          }
        ])
      ).to.eql([
        ,
        {
          Households: 7635
        },
        ,
        ,
        {
          Households: 21028,
          "Households with Children": 1037
        }
      ]);
    });
  });
  /* eslint-enable no-sparse-arrays, comma-style */

  describe("households fetch thunk", () => {
    const householdsRequest = "/hhtooltip?format=json";
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it("should dispatch fetch and success when the fetch is successful", () => {
      const mockHouseholdsResponse = [
        {
          NP_ID: 1,
          neighborhood: "122nd-Division",
          demographic: "Households",
          households: 7635,
          year: "2014"
        }
      ];

      nock(API_HOST)
        .get(householdsRequest)
        .reply(200, mockHouseholdsResponse);

      /* eslint-disable no-sparse-arrays, comma-style */
      const expectedActions = [
        { type: actionTypes.CALL_START },
        {
          type: actionTypes.CALL_SUCCESS,
          payload: [
            ,
            {
              Households: 7635
            }
          ]
        }
      ];
      /* eslint-enable no-sparse-arrays, comma-style */

      return store.dispatch(actions.fetchHouseholdsData()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

    it("should dispatch fetch and fail when the fetch is unsuccessful", () => {
      nock(API_HOST)
        .get(householdsRequest)
        .replyWithError("Request was just no good");

      const expectedActions = [
        { type: actionTypes.CALL_START },
        {
          type: actionTypes.CALL_FAIL,
          payload: {
            code: undefined,
            errno: undefined,
            message: `request to ${API_HOST}${householdsRequest} failed, reason: Request was just no good`,
            name: "FetchError",
            type: "system"
          }
        }
      ];

      return store.dispatch(actions.fetchHouseholdsData()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});

describe("households reducer", () => {
  const initialState = {
    pending: false,
    data: null,
    error: null
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it("should handle CALL_START", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.CALL_START
      })
    ).to.eql({
      pending: true,
      data: null,
      error: null
    });

    expect(
      reducer(
        {
          pending: true,
          data: null,
          error: null
        },
        {
          type: actionTypes.CALL_START
        }
      )
    ).to.eql({
      pending: true,
      data: null,
      error: null
    });
  });

  it("should handle CALL_FAIL", () => {
    const error = new Error("oops");

    expect(
      reducer(initialState, {
        type: actionTypes.CALL_FAIL,
        payload: error
      })
    ).to.eql({
      pending: false,
      data: null,
      error
    });

    expect(
      reducer(
        {
          pending: true,
          data: ["stuff"],
          error: null
        },
        {
          type: actionTypes.CALL_FAIL,
          payload: error
        }
      )
    ).to.eql({
      pending: false,
      data: null,
      error
    });
  });

  it("should handle CALL_SUCCESS", () => {
    const data = [{ Households: 42 }, { Households: 1337 }];

    expect(
      reducer(initialState, {
        type: actionTypes.CALL_SUCCESS,
        payload: data
      })
    ).to.eql({
      pending: false,
      error: null,
      data
    });

    expect(
      reducer(
        {
          pending: true,
          error: new Error("oops"),
          data: null
        },
        {
          type: actionTypes.CALL_SUCCESS,
          payload: data
        }
      )
    ).to.eql({
      pending: false,
      error: null,
      data
    });
  });
});

describe("households selectors", () => {
  let state;
  const households = {};

  beforeEach(() => {
    state = { households };
  });

  describe("getHouseholdsState", () => {
    it("handles no state without errors", () => {
      selectors.getHouseholdsState().should.eql({});
    });
  });

  describe("getHouseholdsRequest", () => {
    it("should return an empty object when unset", () => {
      state = {};
      expect(selectors.getHouseholdsRequest(state)).to.eql({});
    });

    it("should return the households request object when set", () => {
      state = {
        households: {
          pending: true,
          data: null,
          error: null
        }
      };
      expect(selectors.getHouseholdsRequest(state)).to.eql(state.households);
    });
  });

  describe("getHouseholdsData", () => {
    it("should return undefined when unset", () => {
      state = {};
      expect(selectors.getHouseholdsData(state)).to.be.undefined;
    });

    it("should return households data when set", () => {
      const data = "you found it!";
      state = { households: { data } };
      expect(selectors.getHouseholdsData(state)).to.eql(data);
    });
  });
});
