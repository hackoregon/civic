import React from "react";
import { mount } from "enzyme";
import ButtonNew from "./ButtonNew";

describe("ButtonNew", () => {
  it("should render ButtonNew", () => {
    const wrapper = mount(<ButtonNew />);
    expect(wrapper.find("ButtonNew")).to.have.length(1);
    expect(wrapper.find("ButtonNew").children()).to.have.length(2);
  });
  it("should have the appropriate default and static messages", () => {
    const defaultMessage = "Hi! I'm a new blue component";
    const staticMessage = "This message is baked in!";
    const wrapper = mount(<ButtonNew />);
    expect(
      wrapper
        .find("ButtonNew")
        .children()
        .first()
        .text()
    ).to.eql(defaultMessage);
    expect(
      wrapper
        .find("ButtonNew")
        .children()
        .last()
        .text()
    ).to.eql(staticMessage);
  });
  it("should have the appropriate prop message", () => {
    const messageProp = "Oooh! Dynamic text";
    const wrapper = mount(<ButtonNew message={messageProp} />);
    expect(
      wrapper
        .find("ButtonNew")
        .children()
        .first()
        .text()
    ).to.eql(messageProp);
  });
});
