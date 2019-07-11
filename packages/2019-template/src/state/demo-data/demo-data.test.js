import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import * as selectors from "./selectors";
import reducer from "./index";

const mockStore = configureMockStore([thunk]);

describe("demo-data", () => {
  describe("demo-data actions", () => {
    describe("demo-data import actions", () => {
      it("should have a start action", () => {
        const expectedAction = {
          type: actions.IMPORT_START
        };

        expect(actions.DemoDataStart()).to.eql(expectedAction);
      });

      it("should have a success action", () => {
        const payload = {
          some: {
            test: ["d", "a", "t", "a"]
          }
        };
        const expectedAction = {
          type: actions.IMPORT_SUCCESS,
          payload
        };

        expect(actions.DemoDataSuccess(payload)).to.eql(expectedAction);
      });
    });

    describe("demo-data import thunk", () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it("should dispatch start and success actions when successful", () => {
        const action1 = { type: actions.IMPORT_START };
        const action2 = { type: actions.IMPORT_SUCCESS };

        return store.dispatch(actions.fetchDemoData()).then(() => {
          const actionHistory = store.getActions();

          expect(actionHistory).to.have.lengthOf(2);
          expect(actionHistory[0]).to.eql(action1);
          expect(actionHistory[1].type).to.equal(action2.type);
          // eslint-disable-next-line no-unused-expressions
          expect(actionHistory[1].payload).to.exist;
        });
      });
    });
  });

  describe("demo-data reducer", () => {
    const initialState = {
      pending: false,
      data: null
    };

    it("should return the initial state", () => {
      expect(reducer(undefined, {})).to.eql(initialState);
    });

    it("should handle IMPORT_START", () => {
      expect(
        reducer(initialState, {
          type: actions.IMPORT_START
        })
      ).to.eql({
        pending: true,
        data: null
      });
    });

    const payload = { stu: "ff" };

    it("should handle IMPORT_SUCCESS", () => {
      expect(
        reducer(
          { pending: true, data: null },
          {
            type: actions.IMPORT_SUCCESS,
            payload
          }
        )
      ).to.eql({
        pending: false,
        data: payload
      });
    });
  });

  describe("demo-data selectors", () => {
    describe("getDemoRequest", () => {
      it("extends the root selector", () => {
        const expectation = { one: "two", three: 4 };

        expect(
          selectors.getDemoRequest({
            demoData: expectation
          })
        ).to.eql(expectation);

        expect(
          selectors.getDemoRequest({
            red: "herring",
            demoData: expectation
          })
        ).to.eql(expectation);
      });
    });

    describe("getDemoData", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(selectors.getDemoData({ demoData: { no: "data to be seen" } }))
          .to.be.undefined;
      });

      it("returns undefined when data has no value for TemplateData", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getDemoData({
            demoData: { data: { NotTemplateData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns formatted data when data has a value for TemplateData", () => {
        const data = [
          {
            year: 2001,
            weekday_sum_ons: 217309,
            weekday_sum_offs: 219948,
            weekday_total_stops: 406,
            saturday_sum_ons: 73028,
            saturday_sum_offs: 74104,
            saturday_total_stops: 288,
            sunday_sum_ons: 71360,
            sunday_sum_offs: 72361,
            sunday_total_stops: 235,
            num_of_yearly_census: 3,
            sunday_census: true,
            saturday_census: true,
            total_sum_ons: 361697,
            total_sum_offs: 366413,
            total_total_stops: 929
          }
        ];
        const results = [
          {
            ridership: 217309,
            series: "Weekday",
            year: 2001
          },
          {
            ridership: 73028,
            series: "Saturday",
            year: 2001
          },
          {
            ridership: 71360,
            series: "Sunday",
            year: 2001
          }
        ];
        expect(
          selectors.getDemoData({
            demoData: {
              data: {
                DemoData: data
              }
            }
          })
        ).to.eql(results);
      });
    });

    describe("isDemoDataPending", () => {
      it("returns false when there is no value for pending", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.isDemoDataPending({
            demoData: {
              no: "pending property"
            }
          })
        ).to.be.false;
      });

      it("returns false when the value for pending is false", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.isDemoDataPending({
            demoData: {
              pending: false
            }
          })
        ).to.be.false;
      });

      it("returns true when the value for pending is true", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.isDemoDataPending({
            demoData: {
              pending: true
            }
          })
        ).to.be.true;
      });
    });
  });
});
