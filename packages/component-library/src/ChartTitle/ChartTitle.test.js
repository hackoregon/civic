import React from "react";
import { shallow } from "enzyme";

import ChartTitle from "./ChartTitle";

describe("ChartTitle", () => {
  it("should render a title and subtitle when provided", () => {
    const wrapper = shallow(
      <ChartTitle title="Fun title" subtitle="Fun subtitle" />
    );

    expect(wrapper.find("h2").text()).to.eql("Fun title");
    expect(wrapper.find("h3").text()).to.eql("Fun subtitle");
  });

  it("should neither render a title nor a subtitle when neither are provided", () => {
    const wrapper = shallow(<ChartTitle />);

    expect(wrapper.find("h2").length).to.eql(0);
    expect(wrapper.find("h3").length).to.eql(0);
  });
});
