import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import * as selectors from "./selectors";
import reducer from "./index";

const mockStore = configureMockStore([thunk]);

describe("portland-farmers-markets", () => {
  describe("portland-farmers-markets actions", () => {
    describe("portland-farmers-markets import actions", () => {
      it("should have a start action", () => {
        const expectedAction = {
          type: actions.IMPORT_START
        };

        expect(actions.PortlandFarmersMarketsDataStart()).to.eql(
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
          type: actions.IMPORT_SUCCESS,
          payload
        };

        expect(actions.PortlandFarmersMarketsDataSuccess(payload)).to.eql(
          expectedAction
        );
      });
    });

    describe("portland-farmers-markets import thunk", () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it("should dispatch start and success actions when successful", () => {
        const action1 = { type: actions.IMPORT_START };
        const action2 = { type: actions.IMPORT_SUCCESS };

        return store
          .dispatch(actions.fetchPortlandFarmersMarketsData())
          .then(() => {
            const actionHistory = store.getActions();

            expect(actionHistory).to.have.lengthOf(2);
            expect(actionHistory[0]).to.eql(action1);
            expect(actionHistory[1].type).to.equal(action2.type);
            expect(actionHistory[1].payload).to.exist;
          });
      });
    });
  });

  describe("portland-farmers-markets reducer", () => {
    const initialState = {
      pending: false,
      data: null,
      selectedMarket: null
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
        data: null,
        selectedMarket: null
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

  describe("portland-farmers-markets selectors", () => {
    describe("getPortlandFarmersMarketsRequest", () => {
      it("extends the root selector", () => {
        const expectation = { one: "two", three: 4 };

        expect(
          selectors.getPortlandFarmersMarketsRequest({
            portlandFarmersMarketsData: expectation
          })
        ).to.eql(expectation);

        expect(
          selectors.getPortlandFarmersMarketsRequest({
            red: "herring",
            portlandFarmersMarketsData: expectation
          })
        ).to.eql(expectation);
      });
    });

    describe("getPortlandFarmersMarketsData", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getPortlandFarmersMarketsData({
            portlandFarmersMarketsData: { no: "data to be seen" }
          })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for PortlandFarmersMarketsData", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.getPortlandFarmersMarketsData({
            portlandFarmersMarketsData: {
              data: { NotPortlandFarmersMarketsData: {} }
            }
          })
        ).to.be.undefined;
      });

      it("returns the data when data has a value for PortlandFarmersMarketsData", () => {
        const data = {
          here: "it",
          i: "s"
        };
        expect(
          selectors.getPortlandFarmersMarketsData({
            portlandFarmersMarketsData: {
              data: {
                PortlandFarmersMarketsData: data
              }
            }
          })
        ).to.eql(data);
      });
    });

    describe("isPortlandFarmersMarketsDataPending", () => {
      it("returns false when there is no value for pending", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.isPortlandFarmersMarketsDataPending({
            portlandFarmersMarketsData: {
              no: "pending property"
            }
          })
        ).to.be.false;
      });

      it("returns false when the value for pending is false", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.isPortlandFarmersMarketsDataPending({
            portlandFarmersMarketsData: {
              pending: false
            }
          })
        ).to.be.false;
      });

      it("returns true when the value for pending is true", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.isPortlandFarmersMarketsDataPending({
            portlandFarmersMarketsData: {
              pending: true
            }
          })
        ).to.be.true;
      });
    });
  });
});
