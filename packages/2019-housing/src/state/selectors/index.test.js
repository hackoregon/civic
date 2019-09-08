import { rootState } from "./index";

describe("rootState", () => {
  it("uses the full object when the template is not present", () => {
    const state = {
      hello: "world"
    };
    expect(rootState(state)).to.eql(state);
  });

  it("uses the package2019Template object when the package2019Template key is present", () => {
    const state = {
      package2019Template: {
        hello: "world"
      },
      otherScope: {
        not: "for you"
      }
    };
    expect(rootState(state)).to.eql(state.package2019Template);
  });
});
