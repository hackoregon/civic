import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";

import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  const props = {};
  const testOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "giraffe", label: "Giraffe" }
  ];

  beforeEach(() => {
    props.onChange = sinon.spy();
    props.value = testOptions[0].value;
    props.options = testOptions;
  });

  it("should render a select dropdown", () => {
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find("Select")).to.have.length(1);
  });

  it("should trigger onChange callback", () => {
    const wrapper = shallow(<Dropdown {...props} />);
    wrapper.find("Select").simulate("change");

    expect(props.onChange).to.have.property("callCount", 1);
  });
});
