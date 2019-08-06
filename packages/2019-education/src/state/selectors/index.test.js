import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the education is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the education2019 object when the education2019 key is present", () => {
    const state = {
      education2019: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.education2019);
  });
});
