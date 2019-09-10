import React from "react";
import { mount } from "enzyme";
import FooterNew from "./FooterNew";

describe("FooterNew", () => {
  it("should render FooterNew", () => {
    const wrapper = mount(<FooterNew />);
    expect(wrapper.find("FooterNew")).to.have.length(1);
    expect(wrapper.find("FooterNew").children()).to.have.length(2);
  });
});
