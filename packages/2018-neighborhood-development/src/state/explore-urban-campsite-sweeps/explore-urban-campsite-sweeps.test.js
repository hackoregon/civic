/* eslint-disable no-unused-expressions */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import * as selectors from "./selectors";
import reducer from "./index";

// eslint-disable-next-line no-unused-vars
const mockStore = configureMockStore([thunk]);

describe("explore-urban-campsite-sweeps", () => {
  describe("explore-urban-campsite-sweeps actions", () => {
    describe("explore-urban-campsite-sweeps api actions", () => {
      it("should have a start action", () => {
        const expectedAction = {
          type: actions.API_START
        };

        expect(actions.exploreUrbanCampsiteSweepsStart()).to.eql(
          expectedAction
        );
      });

      it("should have a success action", () => {
        const payload = {
          some: {
            test: ["d", "a", "t", "a"]
          }
        };
        const expectedAction = {
          type: actions.API_SUCCESS,
          payload
        };
        expect(actions.exploreUrbanCampsiteSweepsSuccess(payload)).to.eql(
          expectedAction
        );
      });

      it("should have an error action", () => {
        const payload = {
          some: {
            test: ["d", "a", "t", "a"]
          }
        };
        const expectedAction = {
          type: actions.API_ERROR,
          payload
        };

        expect(actions.exploreUrbanCampsiteSweepsError(payload)).to.eql(
          expectedAction
        );
      });
    });
  });

  describe("explore-urban-campsite-sweeps reducer", () => {
    const initialState = {
      pending: false,
      error: null,
      data: null,
      timer: 0,
      max_timer: 18
    };
    const payload = { stu: "ff" };

    it("should return the initial state", () => {
      expect(reducer(undefined, {})).to.eql(initialState);
    });

    it("should handle API_START", () => {
      expect(
        reducer(initialState, {
          type: actions.API_START
        })
      ).to.eql({
        pending: true,
        error: null,
        data: null,
        timer: 0,
        max_timer: 18
      });
    });

    it("should handle API_SUCCESS", () => {
      expect(
        reducer(
          { pending: true, error: null, data: null, timer: 0, max_timer: 18 },
          {
            type: actions.API_SUCCESS,
            payload
          }
        )
      ).to.eql({
        pending: false,
        data: payload,
        error: null,
        timer: 0,
        max_timer: 18
      });
    });

    it("should handle API_ERROR", () => {
      expect(
        reducer(
          { pending: true, error: null, data: null, timer: 0, max_timer: 18 },
          {
            type: actions.API_ERROR,
            payload
          }
        )
      ).to.eql({
        data: null,
        pending: false,
        error: payload,
        timer: 0,
        max_timer: 18
      });
    });
  });

  describe("explore-urban-campsite-sweeps selectors", () => {
    describe("getCampsiteSweepsRequest", () => {
      it("extends the root selector", () => {
        const expectation = { one: "two", three: 4 };

        expect(
          selectors.getCampsiteSweepsRequest({
            exploreUrbanCampsiteSweeps: expectation
          })
        ).to.eql(expectation);

        expect(
          selectors.getCampsiteSweepsRequest({
            red: "herring",
            package2018NeighborhoodDevelopment: {
              exploreUrbanCampsiteSweeps: expectation
            }
          })
        ).to.eql(expectation);
      });
    });

    describe("getexploreUrbanCampsiteSweepsData", () => {
      it("returns undefined when there is no data", () => {
        expect(
          selectors.getCampsiteSweepsData({
            exploreUrbanCampsiteSweeps: {
              no: "data to be seen"
            }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data is not the right format", () => {
        expect(
          selectors.getCampsiteSweepsData({
            exploreUrbanCampsiteSweeps: {
              data: {
                somethingDifferent: {}
              }
            }
          })
        ).to.be.undefined;
      });
    });

    describe("isexploreUrbanCampsiteSweepsPending", () => {
      it("returns false when there is no value for pending", () => {
        expect(
          selectors.isCampsiteSweepsPending({
            exploreUrbanCampsiteSweeps: {
              no: "pending property"
            }
          })
        ).to.be.false;
      });

      it("returns false when the value for pending is false", () => {
        expect(
          selectors.isCampsiteSweepsPending({
            exploreUrbanCampsiteSweeps: {
              pending: false
            }
          })
        ).to.be.false;
      });

      it("returns true when the value for pending is true", () => {
        expect(
          selectors.isCampsiteSweepsPending({
            exploreUrbanCampsiteSweeps: {
              pending: true
            }
          })
        ).to.be.true;
      });
    });
  });
});
