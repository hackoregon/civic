/* eslint-disable no-unused-expressions */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import * as selectors from "./selectors";
import reducer from "./index";

// eslint-disable-next-line no-unused-vars
const mockStore = configureMockStore([thunk]);

describe("ridership-over-time", () => {
  describe("ridership-over-time actions", () => {
    describe("ridership-over-time api actions", () => {
      it("should have a start action", () => {
        const expectedAction = {
          type: actions.API_START
        };

        expect(actions.ridershipOverTimeStart()).to.eql(expectedAction);
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
        expect(actions.ridershipOverTimeSuccess(payload)).to.eql(
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

        expect(actions.ridershipOverTimeError(payload)).to.eql(expectedAction);
      });
    });
    /*
    describe('ridership-over-time api thunk', () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it('should dispatch start and success actions when successful', () => {
        const action1 = { type: actions.API_START };
        const action2 = { type: actions.API_SUCCESS };

        return store.dispatch(actions.fetchRidershipOverTime()).then(() => {
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
  describe("ridership-over-time reducer", () => {
    const initialState = {
      pending: false,
      error: null,
      data: null
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
        data: null
      });
    });

    it("should handle API_SUCCESS", () => {
      expect(
        reducer(
          { pending: true, error: null, data: null },
          {
            type: actions.API_SUCCESS,
            payload
          }
        )
      ).to.eql({
        error: null,
        pending: false,
        data: payload
      });
    });

    it("should handle API_ERROR", () => {
      expect(
        reducer(
          { pending: true, error: null, data: null },
          {
            type: actions.API_ERROR,
            payload
          }
        )
      ).to.eql({
        pending: false,
        error: payload,
        data: null
      });
    });
  });

  describe("ridership-over-time selectors", () => {
    describe("getRidershipOverTimeRequest", () => {
      it("extends the root selector", () => {
        const expectation = { one: "two", three: 4 };

        expect(
          selectors.getRidershipOverTimeRequest({
            ridershipOverTime: expectation
          })
        ).to.eql(expectation);

        expect(
          selectors.getRidershipOverTimeRequest({
            red: "herring",
            transportation: {
              ridershipOverTime: expectation
            }
          })
        ).to.eql(expectation);
      });
    });

    describe("getridershipOverTimeData", () => {
      it("returns undefined when there is no data", () => {
        expect(
          selectors.getRidershipOverTimeData({
            ridershipOverTime: {
              no: "data to be seen"
            }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for ridershipByYear", () => {
        expect(
          selectors.getRidershipOverTimeData({
            ridershipOverTime: {
              data: {
                NotridershipByYear: {}
              }
            }
          })
        ).to.be.undefined;
      });

      it("returns processed data when data has a value for ridershipByYear", () => {
        const res = {
          data: [
            {
              year: 2001,
              weekday_sum_ons: 56500470,
              weekday_sum_offs: 57186610,
              saturday_sum_ons: 3797456,
              saturday_sum_offs: 3853425,
              sunday_sum_ons: 3710746,
              sunday_sum_offs: 3762772,
              num_of_yearly_census: 3,
              sunday_census: true,
              saturday_census: true,
              total_sum_ons: 64008672,
              total_sum_offs: 64802807
            }
          ]
        };
        const processedData = [
          {
            type: "Weekday",
            year: 2001,
            ons: 56500470
          },
          {
            type: "Saturday",
            year: 2001,
            ons: 3797456
          },
          {
            type: "Sunday",
            year: 2001,
            ons: 3710746
          }
        ];
        expect(
          selectors.getRidershipOverTimeData({
            ridershipOverTime: {
              data: res
            }
          })
        ).to.eql(processedData);
      });
    });

    describe("isridershipOverTimePending", () => {
      it("returns false when there is no value for pending", () => {
        expect(
          selectors.isRidershipOverTimePending({
            ridershipOverTime: {
              no: "pending property"
            }
          })
        ).to.be.false;
      });

      it("returns false when the value for pending is false", () => {
        expect(
          selectors.isRidershipOverTimePending({
            ridershipOverTime: {
              pending: false
            }
          })
        ).to.be.false;
      });

      it("returns true when the value for pending is true", () => {
        expect(
          selectors.isRidershipOverTimePending({
            ridershipOverTime: {
              pending: true
            }
          })
        ).to.be.true;
      });
    });
  });
});
