import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the transportation is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the transportation2019 object when the transportation2019 key is present", () => {
    const state = {
      transportation2019: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.transportation2019);
  });
});
