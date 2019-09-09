import React from "react";
import { shallow } from "enzyme";

import HorizontalBarChart from "./HorizontalBarChart";

const simpleData = [
  { x: 100, y: "cat" },
  { x: 200, y: "dog" },
  { x: 300, y: "fish" },
  { x: 400, y: "rat" }
];

const updatedSimpleData = [
  { x: 100, y: "cat" },
  { x: 200, y: "dog" },
  { x: 300, y: "fish" },
  { x: 400, y: "rat" },
  { x: 500, y: "bat" }
];

const simpleColorData = [
  { x: 100, y: "black" },
  { x: 200, y: "white" },
  { x: 300, y: "red" },
  { x: 400, y: "rat" }
];

const updatedSimpleColorData = [
  { x: 100, y: "black" },
  { x: 200, y: "white" },
  { x: 300, y: "red" },
  { x: 400, y: "rat" },
  { x: 500, y: "bat" }
];

const simpleDataDomain = { x: [0, 400], y: [0, 4] };

const sampleUnstructuredData = [
  { population: 2000, label: "Labrador Retriever" },
  { population: 8000, label: "Standard Poodle" },
  { population: 6000, label: "French Bulldog" }
];

describe("HorizontalBarChart", () => {
  it("renders a VictoryChart", () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);
    expect(wrapper.find("VictoryChart").length).to.eql(1);
  });

  it("renders a HorizontalBarChart with sample data", () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);
    expect(wrapper.find({ title: "Horizontal Bar Chart" }).length).to.eql(1);
    expect(wrapper.find({ title: "Horizontal Bar Chart" }).props().data).to.eql(
      [
        { sortOrder: -1, dataValue: 400, label: "rat: 400" },
        { sortOrder: -2, dataValue: 300, label: "fish: 300" },
        { sortOrder: -3, dataValue: 200, label: "dog: 200" },
        { sortOrder: -4, dataValue: 100, label: "cat: 100" }
      ]
    );
  });

  it("renders an updated HorizontalBarChart when passed new data", () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);
    expect(wrapper.find({ title: "Horizontal Bar Chart" }).length).to.eql(1);
    wrapper.setProps({ data: updatedSimpleData });

    expect(wrapper.find({ title: "Horizontal Bar Chart" }).props().data).to.eql(
      [
        { sortOrder: -1, dataValue: 500, label: "bat: 500" },
        { sortOrder: -2, dataValue: 400, label: "rat: 400" },
        { sortOrder: -3, dataValue: 300, label: "fish: 300" },
        { sortOrder: -4, dataValue: 200, label: "dog: 200" },
        { sortOrder: -5, dataValue: 100, label: "cat: 100" }
      ]
    );
  });

  it("should render a VictoryBar inside a ChartContainer", () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);
    expect(wrapper.find("ChartContainer")).to.have.length(1);
    expect(
      wrapper
        .find("ChartContainer")
        .children()
        .find("VictoryBar")
    ).to.have.length(2);
  });

  it("conditionally passes title to ChartContainer", () => {
    const sampleTitle = "Hey there";
    const titlelessWrapper = shallow(<HorizontalBarChart data={simpleData} />);
    const titledWrapper = shallow(
      <HorizontalBarChart data={simpleData} title={sampleTitle} />
    );
    expect(titlelessWrapper.find("ChartContainer").prop("title")).to.equal(
      null
    );
    expect(titledWrapper.find("ChartContainer").prop("title")).to.equal(
      sampleTitle
    );
  });

  it("conditionally passes subtitle to ChartContainer", () => {
    const sampleSubtitle = "Almost as good as a title!";
    const noSubtitleWrapper = shallow(<HorizontalBarChart data={simpleData} />);
    const subtitleWrapper = shallow(
      <HorizontalBarChart data={simpleData} subtitle={sampleSubtitle} />
    );
    expect(noSubtitleWrapper.find("ChartContainer").prop("subtitle")).to.equal(
      null
    );
    expect(subtitleWrapper.find("ChartContainer").prop("subtitle")).to.equal(
      sampleSubtitle
    );
  });

  it("renders both axes", () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);

    const axes = wrapper.find("VictoryAxis");
    const xAxis = wrapper.find({ title: "X Axis" });
    const yAxis = wrapper.find({ title: "Y Axis" });

    expect(axes.length).to.eql(2);
    expect(xAxis.length).to.eql(1);
    expect(yAxis.length).to.eql(1);
  });

  it("renders two axis and a VictoryBar within VictoryChart", () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);
    const victoryComponents = wrapper.find("VictoryChart").children();
    expect(victoryComponents.find("VictoryAxis")).to.have.length(2);
    expect(victoryComponents.find("VictoryBar")).to.have.length(2);
  });

  it("should properly set a domain if provided with one", () => {
    const wrapper = shallow(
      <HorizontalBarChart data={simpleData} domain={simpleDataDomain} />
    );
    const chart = wrapper.find("VictoryChart");

    expect(chart.props().domain).to.eql(simpleDataDomain);
  });

  it("renders unstructured data", () => {
    const props = {
      data: sampleUnstructuredData,
      dataLabel: "label",
      dataValue: "population"
    };
    const wrapper = shallow(<HorizontalBarChart {...props} />);
    expect(wrapper.find({ title: "Horizontal Bar Chart" }).props().data).to.eql(
      [
        { sortOrder: -1, dataValue: 8000, label: "Standard Poodle: 8,000" },
        { sortOrder: -2, dataValue: 6000, label: "French Bulldog: 6,000" },
        { sortOrder: -3, dataValue: 2000, label: "Labrador Retriever: 2,000" }
      ]
    );
  });

  it("sends in data in usable format", () => {
    const wrapper = shallow(<HorizontalBarChart data={simpleData} />);
    const dataProp = wrapper
      .find("VictoryBar")

      .first()
      .prop("data");
    expect(dataProp).to.have.length(4);
    const firstDataProp = dataProp[0];
    expect(firstDataProp).to.have.property("sortOrder");
    expect(firstDataProp).to.have.property("dataValue");
    expect(firstDataProp).to.have.property("label");
    const xProp = wrapper
      .find("VictoryBar")
      .first()
      .prop("x");
    const yProp = wrapper
      .find("VictoryBar")
      .first()
      .prop("y");
    expect(xProp).to.eql("sortOrder");
    expect(yProp).to.eql("dataValue");
  });

  // Tests for https://github.com/FormidableLabs/victory/issues/928 workaround

  it("renders a HorizontalBarChart correctly with sample color data **invisible whitespace warning, see protectData util**", () => {
    const c = "‌‌​"; // U+200B (zero-width space character)
    const wrapper = shallow(
      <HorizontalBarChart data={simpleColorData} protect />
    );
    expect(wrapper.find({ title: "Horizontal Bar Chart" }).length).to.eql(1);
    expect(wrapper.find({ title: "Horizontal Bar Chart" }).props().data).to.eql(
      // invisible whitespace character injected in label before :
      [
        { sortOrder: 1, dataValue: 100, label: `black${c}: 100` },
        { sortOrder: 2, dataValue: 200, label: `white${c}: 200` },
        { sortOrder: 3, dataValue: 300, label: `red${c}: 300` },
        { sortOrder: 4, dataValue: 400, label: `rat${c}: 400` }
      ]
    );
  });

  it("renders an updated HorizontalBarChart when passed new data **invisible whitespace warning, see protectData util**", () => {
    const c = "‌‌​"; // U+200B (zero-width space character)
    const wrapper = shallow(
      <HorizontalBarChart data={simpleColorData} protect />
    );
    expect(wrapper.find({ title: "Horizontal Bar Chart" }).length).to.eql(1);
    wrapper.setProps({ data: updatedSimpleColorData });

    expect(wrapper.find({ title: "Horizontal Bar Chart" }).props().data).to.eql(
      // invisible whitespace character injected in label before :
      [
        { sortOrder: 1, dataValue: 100, label: `black${c}: 100` },
        { sortOrder: 2, dataValue: 200, label: `white${c}: 200` },
        { sortOrder: 3, dataValue: 300, label: `red${c}: 300` },
        { sortOrder: 4, dataValue: 400, label: `rat${c}: 400` },
        { sortOrder: 5, dataValue: 500, label: `bat${c}: 500` }
      ]
    );
  });

  // End tests for https://github.com/FormidableLabs/victory/issues/928 workaround
});
