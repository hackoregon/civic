import React from "react";
import { mount } from "enzyme";
import Header from "./Header";

describe("Header", () => {
  it("should render Header", () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find("Header")).to.have.length(1);
    expect(wrapper.find("Header").children()).to.have.length(2);
  });
});
