import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import * as selectors from "./selectors";
import reducer from "./index";

const mockStore = configureMockStore([thunk]);

const formatRidershipData = data =>
  !data
    ? undefined
    : data
        .map(yearObj => ({
          series: "Weekday",
          year: yearObj.year,
          ridership: yearObj.weekday_sum_ons
        }))
        .concat(
          data.map(yearObj => ({
            series: "Saturday",
            year: yearObj.year,
            ridership: yearObj.saturday_sum_ons
          }))
        )
        .concat(
          data.map(yearObj => ({
            series: "Sunday",
            year: yearObj.year,
            ridership: yearObj.sunday_sum_ons
          }))
        );

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

    describe("getRoutes", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(selectors.getRoutes({ demoData: { no: "data to be seen" } })).to
          .be.undefined;
      });

      it("returns undefined when data has no value for routes", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getRoutes({
            demoData: { data: { NotTemplateData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns routes when data has a value for RouteGentrification", () => {
        const data = [
          { route: "12", gentrification: "Mid" },
          { route: "14", gentrification: "Late" },
          { route: "15", gentrification: "Mid" }
        ];
        const results = ["12", "14", "15"];
        expect(
          selectors.getRoutes({
            demoData: {
              data: {
                RouteGentrification: data
              }
            }
          })
        ).to.eql(results);
      });
    });

    describe("getMidGentrificationRoutes", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getMidGentrificationRoutes({
            demoData: { no: "data to be seen" }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for routes", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getMidGentrificationRoutes({
            demoData: { data: { NotTemplateData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns routes when data has a value for RouteGentrification", () => {
        const data = [
          { route: "12", gentrification: "Mid" },
          { route: "14", gentrification: "Late" },
          { route: "15", gentrification: "Mid" }
        ];
        const results = ["12", "15"];
        expect(
          selectors.getMidGentrificationRoutes({
            demoData: {
              data: {
                RouteGentrification: data
              }
            }
          })
        ).to.eql(results);
      });
    });

    describe("getLateGentrificationRoutes", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getLateGentrificationRoutes({
            demoData: { no: "data to be seen" }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for routes", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getLateGentrificationRoutes({
            demoData: { data: { NotTemplateData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns routes when data has a value for RouteGentrification", () => {
        const data = [
          { route: "12", gentrification: "Mid" },
          { route: "14", gentrification: "Late" },
          { route: "15", gentrification: "Mid" }
        ];
        const results = ["14"];
        expect(
          selectors.getLateGentrificationRoutes({
            demoData: {
              data: {
                RouteGentrification: data
              }
            }
          })
        ).to.eql(results);
      });
    });

    describe("getMidGentrificationRouteData", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getMidGentrificationRouteData({
            demoData: { no: "data to be seen" }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for routes", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getMidGentrificationRouteData({
            demoData: { data: { NotTemplateData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns correctly when data has a value for RouteGentrification", () => {
        const data = {
          RouteGentrification: [
            { route: "12", gentrification: "Mid" },
            { route: "14", gentrification: "Late" },
            { route: "15", gentrification: "Mid" }
          ],
          "12": [
            {
              year: 2001,
              weekday_sum_ons: 5865,
              weekday_sum_offs: 5533,
              weekday_total_stops: 91,
              saturday_sum_ons: 3073,
              saturday_sum_offs: 2818,
              saturday_total_stops: 68,
              sunday_sum_ons: 2103,
              sunday_sum_offs: 2055,
              sunday_total_stops: 54,
              num_of_yearly_census: 2,
              sunday_census: true,
              saturday_census: true,
              total_sum_ons: 11041,
              total_sum_offs: 10406,
              total_total_stops: 213
            }
          ],
          "15": [
            {
              year: 2001,
              weekday_sum_ons: 6750,
              weekday_sum_offs: 6593,
              weekday_total_stops: 97,
              saturday_sum_ons: 3557,
              saturday_sum_offs: 3400,
              saturday_total_stops: 70,
              sunday_sum_ons: 2193,
              sunday_sum_offs: 2149,
              sunday_total_stops: 63,
              num_of_yearly_census: 2,
              sunday_census: true,
              saturday_census: true,
              total_sum_ons: 12500,
              total_sum_offs: 12142,
              total_total_stops: 230
            }
          ]
        };
        expect(
          selectors.getMidGentrificationRouteData({
            demoData: {
              data
            }
          })
        ).to.eql([data[12], data[15]]);
      });
    });

    describe("getLateGentrificationRouteData", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getLateGentrificationRouteData({
            demoData: { no: "data to be seen" }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for routes", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getLateGentrificationRouteData({
            demoData: { data: { NotTemplateData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns correctly when data has a value for RouteGentrification", () => {
        const data = {
          RouteGentrification: [
            { route: "12", gentrification: "Mid" },
            { route: "14", gentrification: "Late" },
            { route: "15", gentrification: "Mid" }
          ],
          "14": [
            {
              year: 2001,
              weekday_sum_ons: 5865,
              weekday_sum_offs: 5533,
              weekday_total_stops: 91,
              saturday_sum_ons: 3073,
              saturday_sum_offs: 2818,
              saturday_total_stops: 68,
              sunday_sum_ons: 2103,
              sunday_sum_offs: 2055,
              sunday_total_stops: 54,
              num_of_yearly_census: 2,
              sunday_census: true,
              saturday_census: true,
              total_sum_ons: 11041,
              total_sum_offs: 10406,
              total_total_stops: 213
            }
          ]
        };
        expect(
          selectors.getLateGentrificationRouteData({
            demoData: {
              data
            }
          })
        ).to.eql([data[14]]);
      });
    });

    describe("getFormattedMidGentrificationRouteData", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getFormattedMidGentrificationRouteData({
            demoData: { no: "data to be seen" }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for routes", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getFormattedMidGentrificationRouteData({
            demoData: { data: { NotTemplateData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns correctly when data has a value for RouteGentrification", () => {
        const data = {
          RouteGentrification: [
            { route: "12", gentrification: "Mid" },
            { route: "14", gentrification: "Late" },
            { route: "15", gentrification: "Mid" }
          ],
          "12": [
            {
              year: 2001,
              weekday_sum_ons: 5865,
              weekday_sum_offs: 5533,
              weekday_total_stops: 91,
              saturday_sum_ons: 3073,
              saturday_sum_offs: 2818,
              saturday_total_stops: 68,
              sunday_sum_ons: 2103,
              sunday_sum_offs: 2055,
              sunday_total_stops: 54,
              num_of_yearly_census: 2,
              sunday_census: true,
              saturday_census: true,
              total_sum_ons: 11041,
              total_sum_offs: 10406,
              total_total_stops: 213
            }
          ],
          "15": [
            {
              year: 2001,
              weekday_sum_ons: 6750,
              weekday_sum_offs: 6593,
              weekday_total_stops: 97,
              saturday_sum_ons: 3557,
              saturday_sum_offs: 3400,
              saturday_total_stops: 70,
              sunday_sum_ons: 2193,
              sunday_sum_offs: 2149,
              sunday_total_stops: 63,
              num_of_yearly_census: 2,
              sunday_census: true,
              saturday_census: true,
              total_sum_ons: 12500,
              total_sum_offs: 12142,
              total_total_stops: 230
            }
          ]
        };
        expect(
          selectors.getFormattedMidGentrificationRouteData({
            demoData: {
              data
            }
          })
        ).to.eql([
          formatRidershipData(data[12]),
          formatRidershipData(data[15])
        ]);
      });
    });

    describe("getFormattedLateGentrificationRouteData", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getFormattedLateGentrificationRouteData({
            demoData: { no: "data to be seen" }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for routes", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getFormattedLateGentrificationRouteData({
            demoData: { data: { NotTemplateData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns correctly when data has a value for RouteGentrification", () => {
        const data = {
          RouteGentrification: [
            { route: "12", gentrification: "Mid" },
            { route: "14", gentrification: "Late" },
            { route: "15", gentrification: "Mid" }
          ],
          "14": [
            {
              year: 2001,
              weekday_sum_ons: 5865,
              weekday_sum_offs: 5533,
              weekday_total_stops: 91,
              saturday_sum_ons: 3073,
              saturday_sum_offs: 2818,
              saturday_total_stops: 68,
              sunday_sum_ons: 2103,
              sunday_sum_offs: 2055,
              sunday_total_stops: 54,
              num_of_yearly_census: 2,
              sunday_census: true,
              saturday_census: true,
              total_sum_ons: 11041,
              total_sum_offs: 10406,
              total_total_stops: 213
            }
          ]
        };
        const result = [
          [
            {
              ridership: 5865,
              series: "Weekday",
              year: 2001
            },
            {
              ridership: 3073,
              series: "Saturday",
              year: 2001
            },
            {
              ridership: 2103,
              series: "Sunday",
              year: 2001
            }
          ]
        ];
        expect(
          selectors.getFormattedLateGentrificationRouteData({
            demoData: {
              data
            }
          })
        ).to.eql(result);
      });
    });

    // --------------------------------------------------------------

    describe("getMidGentrificationRidershipData", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getMidGentrificationRidershipData({
            demoData: { no: "data to be seen" }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for routes", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getMidGentrificationRidershipData({
            demoData: { data: { NotTemplateData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns correctly when data has a value for RouteGentrification", () => {
        const data = {
          RouteGentrification: [
            { route: "12", gentrification: "Mid" },
            { route: "14", gentrification: "Late" },
            { route: "15", gentrification: "Mid" }
          ],
          "12": [
            {
              year: 2001,
              weekday_sum_ons: 5865,
              weekday_sum_offs: 5533,
              weekday_total_stops: 91,
              saturday_sum_ons: 3073,
              saturday_sum_offs: 2818,
              saturday_total_stops: 68,
              sunday_sum_ons: 2103,
              sunday_sum_offs: 2055,
              sunday_total_stops: 54,
              num_of_yearly_census: 2,
              sunday_census: true,
              saturday_census: true,
              total_sum_ons: 11041,
              total_sum_offs: 10406,
              total_total_stops: 213
            }
          ],
          "15": [
            {
              year: 2001,
              weekday_sum_ons: 6750,
              weekday_sum_offs: 6593,
              weekday_total_stops: 97,
              saturday_sum_ons: 3557,
              saturday_sum_offs: 3400,
              saturday_total_stops: 70,
              sunday_sum_ons: 2193,
              sunday_sum_offs: 2149,
              sunday_total_stops: 63,
              num_of_yearly_census: 2,
              sunday_census: true,
              saturday_census: true,
              total_sum_ons: 12500,
              total_sum_offs: 12142,
              total_total_stops: 230
            }
          ]
        };
        expect(
          selectors.getMidGentrificationRidershipData({
            demoData: {
              data
            }
          })
        ).to.eql([formatRidershipData(data[12])]);
      });
    });

    describe("getLateGentrificationRidershipData", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getLateGentrificationRidershipData({
            demoData: { no: "data to be seen" }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for routes", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getLateGentrificationRidershipData({
            demoData: { data: { NotTemplateData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns correctly when data has a value for RouteGentrification", () => {
        const data = {
          RouteGentrification: [
            { route: "12", gentrification: "Mid" },
            { route: "14", gentrification: "Late" },
            { route: "15", gentrification: "Mid" }
          ],
          "14": [
            {
              year: 2001,
              weekday_sum_ons: 5865,
              weekday_sum_offs: 5533,
              weekday_total_stops: 91,
              saturday_sum_ons: 3073,
              saturday_sum_offs: 2818,
              saturday_total_stops: 68,
              sunday_sum_ons: 2103,
              sunday_sum_offs: 2055,
              sunday_total_stops: 54,
              num_of_yearly_census: 2,
              sunday_census: true,
              saturday_census: true,
              total_sum_ons: 11041,
              total_sum_offs: 10406,
              total_total_stops: 213
            }
          ]
        };
        const result = [
          {
            ridership: 5865,
            series: "Weekday",
            year: 2001
          },
          {
            ridership: 3073,
            series: "Saturday",
            year: 2001
          },
          {
            ridership: 2103,
            series: "Sunday",
            year: 2001
          }
        ];
        expect(
          selectors.getLateGentrificationRidershipData({
            demoData: {
              data
            }
          })
        ).to.eql(result);
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
