import React from "react";
import { mount } from "enzyme";
import PolygonPreview from "./PolygonPreview";

describe("PolygonPreview", () => {
  it("should render PolygonPreview", () => {
    const wrapper = mount(<PolygonPreview />);
    expect(wrapper.find("PolygonPreview")).to.have.length(1);
    expect(wrapper.find("PolygonPreview").children()).to.have.length(1);
  });
});
