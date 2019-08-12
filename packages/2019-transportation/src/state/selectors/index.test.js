import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the transportation is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the package2019Transportation object when the package2019Transportation key is present", () => {
    const state = {
      package2019Transportation: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.package2019Transportation);
  });
});
