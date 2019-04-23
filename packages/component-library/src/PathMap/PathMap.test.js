import React from "react";
import { shallow } from "enzyme";
import PathMap from "./PathMap";

describe("PathMap", () => {
  const data = [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [[0, 0], [1, 1]]
      },
      properties: {
        name: "Null Island"
      }
    }
  ];

  const defaultProps = { data };

  it("should render a DeckGL component", () => {
    const wrapper = shallow(<PathMap {...defaultProps} />);

    expect(wrapper.find(".DeckGL")).to.have.length(1);
  });

  it("should render child PathMap component", () => {
    const wrapper = shallow(<PathMap {...defaultProps} />);

    expect(wrapper.find(".DeckGL").children()).to.have.length(1);
    expect(wrapper.find(".PathMap")).to.have.length(1);
  });
});
