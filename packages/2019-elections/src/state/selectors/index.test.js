import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the elections is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the elections2019 object when the elections2019 key is present", () => {
    const state = {
      elections2019: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.elections2019);
  });
});
