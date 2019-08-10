import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the transportation key is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the transportation object when the transportation key is present", () => {
    const state = {
      transportation: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.package2018TransportationSystems);
  });
});
