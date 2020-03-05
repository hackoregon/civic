import React from "react";
import { mount } from "enzyme";
import FooterNew from "./FooterNew";

describe("FooterNew", () => {
  it("should render FooterNew", () => {
    const wrapper = mount(<FooterNew />);
    expect(wrapper.find("Footer")).to.have.length(1);
  });
});
