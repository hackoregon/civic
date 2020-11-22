import React from "react";
import { mount } from "enzyme";
import { TailwindEmotionButton } from "./TailwindEmotionButton";

describe("TailwindEmotionButton", () => {
  it("should render TailwindEmotionButton", () => {
    const wrapper = mount(<TailwindEmotionButton />);
    expect(wrapper.find("TailwindEmotionButton")).to.have.length(1);
    expect(wrapper.find("TailwindEmotionButton").children()).to.have.length(2);
  });
  it("should have the appropriate default and static messages", () => {
    const defaultMessage = "Hi! I'm a new blue component";
    const staticMessage = "This message is baked in!";
    const wrapper = mount(<TailwindEmotionButton />);
    expect(
      wrapper
        .find("TailwindEmotionButton")
        .children()
        .first()
        .text()
    ).to.eql(defaultMessage);
    expect(
      wrapper
        .find("TailwindEmotionButton")
        .children()
        .last()
        .text()
    ).to.eql(staticMessage);
  });
  it("should have the appropriate prop message", () => {
    const messageProp = "Oooh! Dynamic text";
    const wrapper = mount(<TailwindEmotionButton message={messageProp} />);
    expect(
      wrapper
        .find("TailwindEmotionButton")
        .children()
        .first()
        .text()
    ).to.eql(messageProp);
  });
});
