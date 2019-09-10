import React from "react";
import { mount } from "enzyme";
import Header from "./Header";

describe("Header", () => {
  it("should render Header", () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find("Header")).to.have.length(1);
    expect(wrapper.find("Header").children()).to.have.length(2);
  });
  it("should have the appropriate default and static messages", () => {
    const defaultMessage = "Hi! I'm a new blue component";
    const staticMessage = "This message is baked in!";
    const wrapper = mount(<Header />);
    expect(
      wrapper
        .find("Header")
        .children()
        .first()
        .text()
    ).to.eql(defaultMessage);
    expect(
      wrapper
        .find("Header")
        .children()
        .last()
        .text()
    ).to.eql(staticMessage);
  });
  it("should have the appropriate prop message", () => {
    const messageProp = "Oooh! Dynamic text";
    const wrapper = mount(<Header message={messageProp} />);
    expect(
      wrapper
        .find("Header")
        .children()
        .first()
        .text()
    ).to.eql(messageProp);
  });
});
