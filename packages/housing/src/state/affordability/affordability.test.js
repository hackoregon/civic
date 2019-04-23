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

describe("affordability actions", () => {
  describe("affordability fetch actions", () => {
    it("should have a start action", () => {
      const expectedAction = {
        type: actionTypes.CALL_START
      };

      expect(actions.affordabilityStart()).to.eql(expectedAction);
    });

    it("should have a success action", () => {
      const payload = {
        data: {
          neighborhoods: [1, 2, 3]
        }
      };
      const expectedAction = {
        type: actionTypes.CALL_SUCCESS,
        payload
      };

      expect(actions.affordabilitySuccess(payload)).to.eql(expectedAction);
    });

    it("should have a fail action", () => {
      const payload = new Error("Hmm. This should not have happened");
      const expectedAction = {
        type: actionTypes.CALL_FAIL,
        payload
      };

      expect(actions.affordabilityFail(payload)).to.eql(expectedAction);
    });
  });

  describe("affordability fetch thunk", () => {
    const commonAffordabilityRequest =
      "/affordable?format=json&demographic=Avg.%20Portland%20Household&housing_size=Homeownership";
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it("should dispatch fetch and success when the fetch is successful", () => {
      const mockAffordabilityResponse = [
        {
          affordable: true,
          demographic: "Senior",
          housing_size: "1-BR",
          neighborhood: "Centennial-Glenfair-Wilkes",
          NP_ID: 10,
          year: 2016
        }
      ];

      nock(API_HOST)
        .get(commonAffordabilityRequest)
        .reply(200, mockAffordabilityResponse);

      const expectedActions = [
        { type: actionTypes.CALL_START },
        {
          type: actionTypes.CALL_SUCCESS,
          payload: [
            {
              affordable: true,
              id: 10,
              year: 2016
            }
          ]
        }
      ];

      return store.dispatch(actions.fetchAffordabilityData()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });

    it("should dispatch fetch and fail when the fetch is unsuccessful", () => {
      nock(API_HOST)
        .get(commonAffordabilityRequest)
        .replyWithError("Request was just no good");

      const expectedActions = [
        { type: actionTypes.CALL_START },
        {
          type: actionTypes.CALL_FAIL,
          payload: {
            code: undefined,
            errno: undefined,
            message: `request to ${API_HOST}${commonAffordabilityRequest} failed, reason: Request was just no good`,
            name: "FetchError",
            type: "system"
          }
        }
      ];

      return store.dispatch(actions.fetchAffordabilityData()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});

describe("affordability reducer", () => {
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
    const data = [
      [":D", "Senior", 37469, "Centennial-Glenfair-Wilkes", 2016],
      [":(", "Senior", 37469, "Sellwood-Moreland-Brooklyn", 2016]
    ];

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

describe("affordability selectors", () => {
  let state;
  const affordability = {};

  beforeEach(() => {
    state = { affordability };
  });

  describe("getAffordabilityState", () => {
    it("handles no state without errors", () => {
      selectors.getAffordabilityState().should.eql({});
    });
  });

  describe("getAffordabilityRequest", () => {
    it("should return an empty object when unset", () => {
      state = {};
      expect(selectors.getAffordabilityRequest(state)).to.eql({});
    });

    it("should return the affordability request object when set", () => {
      state = {
        affordability: {
          pending: true,
          data: null,
          error: null
        }
      };
      expect(selectors.getAffordabilityRequest(state)).to.eql(
        state.affordability
      );
    });
  });

  describe("getAffordabilityData", () => {
    it("should return undefined when unset", () => {
      state = {};
      expect(selectors.getAffordabilityData(state)).to.be.undefined;
    });

    it("should return affordability data when set", () => {
      const data = [
        { year: 2016, affordable: true, id: 1 },
        { year: 2016, affordable: true, id: 2 },
        { year: 2016, affordable: true, id: 3 }
      ];
      state = { affordability: { data } };
      expect(selectors.getAffordabilityData(state)).to.eql(data);
    });

    it("should filter out any affordability data for years other than 2016", () => {
      const data = [
        { year: 2016, affordable: true, id: 1 },
        { year: 2015, affordable: true, id: 2 },
        { year: 2017, affordable: true, id: 3 }
      ];
      state = { affordability: { data } };
      expect(selectors.getAffordabilityData(state)).to.eql([data[0]]);
    });
  });
});
