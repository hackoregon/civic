import React from "react";
import { shallow } from "enzyme";
import { MapGLResources } from "@hackoregon/ui-themes";
import BaseMap from "./BaseMap";
import ScatterPlotMap from "../ScatterPlotMap/ScatterPlotMap";

const { MAPBOX_TOKEN } = MapGLResources;

// React Dimensions doesn't render its contents when it has no height or width
describe.skip("BaseMap", () => {
  const defaultProps = {};

  it("should render a MapGL component", () => {
    const wrapper = shallow(<BaseMap {...defaultProps} />);

    expect(wrapper.find(".MapGL")).to.have.length(1);
  });

  it("should include required prop mapboxApiAccessToken", () => {
    const wrapper = shallow(<BaseMap {...defaultProps} />);

    expect(wrapper.find(".MapGL").prop("mapboxApiAccessToken")).to.eql(
      MAPBOX_TOKEN
    );
  });

  it("should render child NavigationControl component", () => {
    const wrapper = shallow(<BaseMap {...defaultProps} />);

    expect(wrapper.find(".MapGL").children()).to.have.length(1);
  });

  it("should render child deck.gl layer component", () => {
    const data = [
      {
        geometry: {
          type: "Point",
          coordinates: [0, 0]
        }
      }
    ];

    const wrapper = shallow(
      <BaseMap {...defaultProps}>
        <ScatterPlotMap data={data} />
      </BaseMap>
    );

    expect(wrapper.find(".MapGL").children()).to.have.length(2);
  });
});
