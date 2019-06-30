import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the template is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the template2019 object when the template2019 key is present", () => {
    const state = {
      template2019: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.template2019);
  });
});
