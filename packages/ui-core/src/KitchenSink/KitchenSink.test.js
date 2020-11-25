import React from "react";
import { mount } from "enzyme";
import { KitchenSink } from "./KitchenSink";

describe("KitchenSink", () => {
  it("should render KitchenSink", () => {
    const wrapper = mount(<KitchenSink />);
    expect(wrapper.find("KitchenSink")).to.have.length(1);
    expect(wrapper.find("KitchenSink").children()).to.have.length(2);
  });
});
