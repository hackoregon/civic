---
to: packages/<%=package%>/src/<%=component%>/<%=component%>.test.js
---
import React from "react";
import { mount } from "enzyme";
import <%=component%> from "./<%=component%>";

describe("<%=component%>", () => {
  it("should render <%=component%>", () => {
    const wrapper = mount(<<%=component%> />);
    expect(wrapper.find("<%=component%>")).to.have.length(1);
    expect(wrapper.find("<%=component%>").children()).to.have.length(2);
  });
  it("should have the appropriate default and static messages", () => {
    const defaultMessage = "Hi! I'm a new blue component";
    const staticMessage = "This message is baked in!";
    const wrapper = mount(<<%=component%> />);
    expect(wrapper.find("<%=component%>").children().first().text()).to.eql(defaultMessage);
    expect(wrapper.find("<%=component%>").children().last().text()).to.eql(staticMessage);
  });
  it("should have the appropriate prop message", () => {
    const messageProp = "Oooh! Dynamic text";
    const wrapper = mount(<<%=component%> message={messageProp}/>);
    expect(wrapper.find("<%=component%>").children().first().text()).to.eql(messageProp);
  });
});
