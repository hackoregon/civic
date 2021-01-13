import React from "react";
import { mount } from "enzyme";
import { CivicProse } from "./CivicProse";

describe("CivicProse", () => {
  it("should render CivicProse", () => {
    const wrapper = mount(<CivicProse />);
    expect(wrapper.find("CivicProse")).to.have.length(1);
    expect(wrapper.find("CivicProse").children()).to.have.length(2);
  });
});
