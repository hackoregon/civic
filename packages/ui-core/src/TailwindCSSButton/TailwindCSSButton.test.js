import React from "react";
import { mount } from "enzyme";
import { TailwindCSSButton } from "./TailwindCSSButton";

describe("TailwindCSSButton", () => {
  it("should render TailwindCSSButton", () => {
    const wrapper = mount(<TailwindCSSButton />);
    expect(wrapper.find("TailwindCSSButton")).to.have.length(1);
    expect(wrapper.find("TailwindCSSButton").children()).to.have.length(2);
  });
  it("should have the appropriate default and static messages", () => {
    const defaultMessage = "Hi! I'm a new blue component";
    const staticMessage = "This message is baked in!";
    const wrapper = mount(<TailwindCSSButton />);
    expect(
      wrapper
        .find("TailwindCSSButton")
        .children()
        .first()
        .text()
    ).to.eql(defaultMessage);
    expect(
      wrapper
        .find("TailwindCSSButton")
        .children()
        .last()
        .text()
    ).to.eql(staticMessage);
  });
  it("should have the appropriate prop message", () => {
    const messageProp = "Oooh! Dynamic text";
    const wrapper = mount(<TailwindCSSButton message={messageProp} />);
    expect(
      wrapper
        .find("TailwindCSSButton")
        .children()
        .first()
        .text()
    ).to.eql(messageProp);
  });
});
