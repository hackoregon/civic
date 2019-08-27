import React from "react";
import { shallow } from "enzyme";
import Collapsable from "./Collapsable";

describe("Collapsable", () => {
  it("should render all children by default", () => {
    const wrapper = shallow(
      <Collapsable>
        <h1>test1</h1>
        <h1>test2</h1>
      </Collapsable>
    );

    expect(wrapper.find("h1").length).to.eql(2);
  });

  it("should collapse hidden children by default", () => {
    const wrapper = shallow(
      <Collapsable>
        <h1>test1</h1>
        <h1 hidden>test2</h1>
      </Collapsable>
    );

    expect(wrapper.find("h1").length).to.eql(1);
  });
});
