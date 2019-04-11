import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the housing key is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the housing object when the housing key is present", () => {
    const state = {
      housing: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.housing);
  });
});
