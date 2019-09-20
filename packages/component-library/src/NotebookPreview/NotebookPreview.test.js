import React from "react";
import { mount } from "enzyme";
import NotebookPreview from "./NotebookPreview";

describe("NotebookPreview", () => {
  it("should render NotebookPreview", () => {
    const wrapper = mount(<NotebookPreview />);
    expect(wrapper.find("NotebookPreview")).to.have.length(1);
    expect(wrapper.find("NotebookPreview").children()).to.have.length(2);
  });
  it("should have the appropriate default and static messages", () => {
    const defaultMessage = "Hi! I'm a new blue component";
    const staticMessage = "This message is baked in!";
    const wrapper = mount(<NotebookPreview />);
    expect(
      wrapper
        .find("NotebookPreview")
        .children()
        .first()
        .text()
    ).to.eql(defaultMessage);
    expect(
      wrapper
        .find("NotebookPreview")
        .children()
        .last()
        .text()
    ).to.eql(staticMessage);
  });
  it("should have the appropriate prop message", () => {
    const messageProp = "Oooh! Dynamic text";
    const wrapper = mount(<NotebookPreview message={messageProp} />);
    expect(
      wrapper
        .find("NotebookPreview")
        .children()
        .first()
        .text()
    ).to.eql(messageProp);
  });
});
