import React from "react";
import { shallow } from "enzyme";

import LineChart from "./LineChart";

describe("LineChart", () => {
  const simpleData = [{ x: 100, y: 10 }, { x: 200, y: 20 }];

  const updatedSimpleData = [
    { x: 100, y: 10 },
    { x: 200, y: 20 },
    { x: 300, y: 30 }
  ];

  const simpleCategoryData = [
    { x: 100, y: 10, category: "cat" },
    { x: 200, y: 20, category: "cat" },
    { x: 100, y: 20, category: "dog" },
    { x: 200, y: 10, category: "dog" }
  ];

  const updatedSimpleCategoryData = [
    { x: 200, y: 20, category: "cat" },
    { x: 300, y: 30, category: "cat" },
    { x: 100, y: 20, category: "dog" },
    { x: 200, y: 10, category: "dog" },
    { x: 100, y: 10, category: "fish" },
    { x: 300, y: 25, category: "fish" }
  ];

  const simpleColorData = [
    { x: 100, y: 10, category: "black" },
    { x: 200, y: 20, category: "black" },
    { x: 100, y: 20, category: "white" },
    { x: 200, y: 10, category: "white" }
  ];

  const updatedSimpleColorData = [
    { x: 200, y: 20, category: "black" },
    { x: 300, y: 30, category: "black" },
    { x: 100, y: 20, category: "white" },
    { x: 200, y: 10, category: "white" },
    { x: 100, y: 10, category: "fish" },
    { x: 300, y: 25, category: "fish" }
  ];

  it("should render a VictoryChart", () => {
    const wrapper = shallow(<LineChart data={simpleData} />);

    expect(wrapper.find("VictoryChart").length).to.eql(1);
  });

  it("renders a LineChart with sample data", () => {
    const wrapper = shallow(<LineChart data={simpleData} />);
    expect(wrapper.find({ title: "Line Chart" }).length).to.eql(1);
    expect(wrapper.find({ title: "Line Chart" }).props().data).to.eql([
      { dataKey: 100, dataValue: 10, series: undefined },
      { dataKey: 200, dataValue: 20, series: undefined }
    ]);
  });

  it("renders an updated LineChart when passed new data", () => {
    const wrapper = shallow(<LineChart data={simpleData} />);
    expect(wrapper.find({ title: "Line Chart" }).length).to.eql(1);
    wrapper.setProps({ data: updatedSimpleData });

    expect(wrapper.find({ title: "Line Chart" }).props().data).to.eql([
      { dataKey: 100, dataValue: 10, series: undefined },
      { dataKey: 200, dataValue: 20, series: undefined },
      { dataKey: 300, dataValue: 30, series: undefined }
    ]);
  });

  it("renders a LineChart with sample category data", () => {
    const wrapper = shallow(
      <LineChart data={simpleCategoryData} dataSeries="category" />
    );
    expect(wrapper.find({ title: "Line Chart" }).length).to.eql(2);
    expect(
      wrapper
        .find({ title: "Line Chart" })
        .first()
        .props().data
    ).to.eql([
      { dataKey: 100, dataValue: 10, series: "cat" },
      { dataKey: 200, dataValue: 20, series: "cat" }
    ]);
  });

  it("renders an updated LineChart when passed new category data", () => {
    const wrapper = shallow(
      <LineChart data={simpleCategoryData} dataSeries="category" />
    );
    expect(wrapper.find({ title: "Line Chart" }).length).to.eql(2);
    wrapper.setProps({ data: updatedSimpleCategoryData });
    expect(wrapper.find({ title: "Line Chart" }).length).to.eql(3);

    expect(
      wrapper
        .find({ title: "Line Chart" })
        .first()
        .props().data
    ).to.eql([
      { dataKey: 200, dataValue: 20, series: "cat" },
      { dataKey: 300, dataValue: 30, series: "cat" }
    ]);
  });

  // Tests for https://github.com/FormidableLabs/victory/issues/928 workaround

  it("renders a LineChart with sample color category data", () => {
    const c = "‌‌​"; // U+200B (zero-width space character)
    const wrapper = shallow(
      <LineChart data={simpleColorData} dataSeries="category" protect />
    );
    expect(wrapper.find({ title: "Line Chart" }).length).to.eql(2);
    expect(
      wrapper
        .find({ title: "Line Chart" })
        .first()
        .props().data
    ).to.eql([
      { dataKey: 100, dataValue: 10, series: `black${c}` },
      { dataKey: 200, dataValue: 20, series: `black${c}` }
    ]);
  });

  it("renders an updated LineChart when passed new color category data", () => {
    const c = "‌‌​"; // U+200B (zero-width space character)
    const wrapper = shallow(
      <LineChart data={simpleColorData} dataSeries="category" protect />
    );
    expect(wrapper.find({ title: "Line Chart" }).length).to.eql(2);
    wrapper.setProps({ data: updatedSimpleColorData });
    expect(wrapper.find({ title: "Line Chart" }).length).to.eql(3);

    expect(
      wrapper
        .find({ title: "Line Chart" })
        .first()
        .props().data
    ).to.eql([
      { dataKey: 200, dataValue: 20, series: `black${c}` },
      { dataKey: 300, dataValue: 30, series: `black${c}` }
    ]);
  });
  /* TODO: rewrite these tests
  it('should render the relevant axis', () => {
    const wrapper = shallow(<LineChart xLabel="Year" {...defaultProps} />);

    const xAxis = wrapper
      .find('VictoryAxis')
      .find({ label: 'Year' });
    const yAxis = wrapper
      .find('VictoryAxis')
      .find({ dependentAxis: true });

    expect(xAxis.prop('tickValues')).to.eql([2015, 2016, 2017]);
    expect(yAxis.prop('tickValues')).to.eql([1, 2, 3]);
  });

  it('should render the VictoryLine', () => {
    const wrapper = shallow(<LineChart {...defaultProps} />);

    expect(wrapper.find('VictoryLine').prop('data')).to.eql([
      { dataKey: 2015, dataValue: 1 },
      { dataKey: 2016, dataValue: 2 },
      { dataKey: 2017, dataValue: 3 },
    ]);
  });
*/
});
