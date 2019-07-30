import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import * as selectors from "./selectors";
import reducer from "./index";

const mockStore = configureMockStore([thunk]);

describe("transportation-data", () => {
  describe("transportation-data actions", () => {
    describe("transportation-data import actions", () => {
      it("should have a start action", () => {
        const expectedAction = {
          type: actions.IMPORT_START
        };

        expect(actions.TransportationDataStart()).to.eql(expectedAction);
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

        expect(actions.TransportationDataSuccess(payload)).to.eql(
          expectedAction
        );
      });
    });

    describe("transportation-data import thunk", () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it("should dispatch start and success actions when successful", () => {
        const action1 = { type: actions.IMPORT_START };
        const action2 = { type: actions.IMPORT_SUCCESS };

        return store.dispatch(actions.fetchTransportationData()).then(() => {
          const actionHistory = store.getActions();

          expect(actionHistory).to.have.lengthOf(2);
          expect(actionHistory[0]).to.eql(action1);
          expect(actionHistory[1].type).to.equal(action2.type);
          expect(actionHistory[1].payload).to.exist;
        });
      });
    });
  });

  describe("transportation-data reducer", () => {
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

  describe("transportation-data selectors", () => {
    describe("getTransportationRequest", () => {
      it("extends the root selector", () => {
        const expectation = { one: "two", three: 4 };

        expect(
          selectors.getTransportationRequest({
            transportationData: expectation
          })
        ).to.eql(expectation);

        expect(
          selectors.getTransportationRequest({
            red: "herring",
            transportationData: expectation
          })
        ).to.eql(expectation);
      });
    });

    describe("getTransportationData", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getTransportationData({
            transportationData: { no: "data to be seen" }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for TransportationData", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getTransportationData({
            transportationData: { data: { NotTransportationData: {} } }
          })
        ).to.be.undefined;
      });

      it("returns the data when data has a value for TransportationData", () => {
        const data = {
          here: "it",
          i: "s"
        };
        expect(
          selectors.getTransportationData({
            transportationData: {
              data: {
                TransportationData: data
              }
            }
          })
        ).to.eql(data);
      });
    });

    describe("isTransportationDataPending", () => {
      it("returns false when there is no value for pending", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.isTransportationDataPending({
            transportationData: {
              no: "pending property"
            }
          })
        ).to.be.false;
      });

      it("returns false when the value for pending is false", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.isTransportationDataPending({
            transportationData: {
              pending: false
            }
          })
        ).to.be.false;
      });

      it("returns true when the value for pending is true", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.isTransportationDataPending({
            transportationData: {
              pending: true
            }
          })
        ).to.be.true;
      });
    });
  });
});
