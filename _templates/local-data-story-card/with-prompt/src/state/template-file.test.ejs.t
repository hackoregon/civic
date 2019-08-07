---
to: packages/<%=package%>/src/state/<%=slug%>/<%=slug%>.test.js
---
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import * as selectors from "./selectors";
import reducer from "./index";

const mockStore = configureMockStore([thunk]);

describe("<%=slug%>", () => {
  describe("<%=slug%> actions", () => {
    describe("<%=slug%> import actions", () => {
      it("should have a start action", () => {
        const expectedAction = {
          type: actions.IMPORT_START
        };

        expect(actions.<%=StoryCardName%>DataStart()).to.eql(expectedAction);
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

        expect(actions.<%=StoryCardName%>DataSuccess(payload)).to.eql(expectedAction);
      });
    });

    describe("<%=slug%> import thunk", () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it("should dispatch start and success actions when successful", () => {
        const action1 = { type: actions.IMPORT_START };
        const action2 = { type: actions.IMPORT_SUCCESS };

        return store.dispatch(actions.fetch<%=StoryCardName%>Data()).then(() => {
          const actionHistory = store.getActions();

          expect(actionHistory).to.have.lengthOf(2);
          expect(actionHistory[0]).to.eql(action1);
          expect(actionHistory[1].type).to.equal(action2.type);
          expect(actionHistory[1].payload).to.exist;
        });
      });
    });
  });

  describe("<%=slug%> reducer", () => {
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

  describe("<%=slug%> selectors", () => {
    describe("get<%=StoryCardName%>Request", () => {
      it("extends the root selector", () => {
        const expectation = { one: "two", three: 4 };

        expect(
          selectors.get<%=StoryCardName%>Request({
            <%=storyCardName%>Data: expectation
          })
        ).to.eql(expectation);

        expect(
          selectors.get<%=StoryCardName%>Request({
            red: "herring",
            <%=storyCardName%>Data: expectation
          })
        ).to.eql(expectation);
      });
    });

    describe("get<%=StoryCardName%>Data", () => {
      it("returns undefined when there is no data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.get<%=StoryCardName%>Data({ <%=storyCardName%>Data: { no: "data to be seen" } })
        ).to.be.undefined;
      });

      it("returns undefined when data has no value for <%=StoryCardName%>Data", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.get<%=StoryCardName%>Data({
            <%=storyCardName%>Data: { data: { Not<%=StoryCardName%>Data: {} } }
          })
        ).to.be.undefined;
      });

      it("returns the data when data has a value for <%=StoryCardName%>Data", () => {
        const data = {
          here: "it",
          i: "s"
        };
        expect(
          selectors.get<%=StoryCardName%>Data({
            <%=storyCardName%>Data: {
              data: {
                <%=StoryCardName%>Data: data
              }
            }
          })
        ).to.eql(data);
      });
    });

    describe("is<%=StoryCardName%>DataPending", () => {
      it("returns false when there is no value for pending", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.is<%=StoryCardName%>DataPending({
            <%=storyCardName%>Data: {
              no: "pending property"
            }
          })
        ).to.be.false;
      });

      it("returns false when the value for pending is false", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.is<%=StoryCardName%>DataPending({
            <%=storyCardName%>Data: {
              pending: false
            }
          })
        ).to.be.false;
      });

      it("returns true when the value for pending is true", () => {
        // eslint-disable-next-line no-unused-expressions
        expect(
          selectors.is<%=StoryCardName%>DataPending({
            <%=storyCardName%>Data: {
              pending: true
            }
          })
        ).to.be.true;
      });
    });
  });
});
