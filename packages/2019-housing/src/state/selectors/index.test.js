import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the template key is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the templateData object when the templateData key is present", () => {
    const state = {
      templateData: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.templateData);
  });
});
