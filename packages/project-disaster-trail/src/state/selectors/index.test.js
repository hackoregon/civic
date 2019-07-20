import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the disaster key is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the disaster object when the disaster key is present", () => {
    const state = {
      disaster: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.disaster);
  });
});
