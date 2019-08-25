import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the sandbox key is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the sandbox object when the sandbox key is present", () => {
    const state = {
      packageCivicSandbox: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.packageCivicSandbox);
  });
});
