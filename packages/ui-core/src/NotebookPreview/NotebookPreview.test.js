import React from "react";
import { mount } from "enzyme";
import NotebookPreview from "./NotebookPreview";

describe("NotebookPreview", () => {
  it("should render NotebookPreview", () => {
    const wrapper = mount(<NotebookPreview />);
    expect(wrapper.find("NotebookPreview")).to.have.length(1);
    expect(wrapper.find("NotebookPreview").children()).to.have.length(1);
  });
  it("should have the appropriate default message", () => {
    const defaultMessage = "See the data science notebook";
    const wrapper = mount(<NotebookPreview />);
    expect(
      wrapper
        .find("NotebookPreview")
        .children()
        .first()
        .text()
    ).to.eql(` ${defaultMessage}`);
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
    ).to.eql(` ${messageProp}`);
  });
});
