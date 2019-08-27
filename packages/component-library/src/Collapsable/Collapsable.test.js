import React from "react";
import { mount } from "enzyme";
import Collapsable from "./Collapsable";

describe("Collapsable", () => {
  it("should render all children by default", () => {
    const wrapper = mount(
      <Collapsable>
        <h1>test1</h1>
        <h1>test2</h1>
      </Collapsable>
    );

    expect(wrapper.find("h1").length).to.eql(2);
  });

  it("should collapse hidden children by default", () => {
    const wrapper = mount(
      <Collapsable>
        <h1>test1</h1>
        <h1 hidden>test2</h1>
      </Collapsable>
    );

    expect(wrapper.find("h1").length).to.eql(1);
  });

  it("should expand and collapse", () => {
    const wrapper = mount(
      <Collapsable>
        <h1>test1</h1>
        <h1 hidden>test2</h1>
      </Collapsable>
    );

    expect(wrapper.find("a").text()).to.eql("More");
    expect(wrapper.find("h1").length).to.eql(1);
    wrapper.find("a").simulate("click");
    expect(wrapper.find("a").text()).to.eql("Less");
    expect(wrapper.find("h1").length).to.eql(2);
    wrapper.find("a").simulate("click");
    expect(wrapper.find("h1").length).to.eql(1);
  });
});
