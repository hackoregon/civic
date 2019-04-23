import React from "react";
import { shallow } from "enzyme";
import BoundaryMap from "./BoundaryMap";

describe("BoundaryMap", () => {
  const data = [
    {
      type: "Feature",
      properties: {
        name: "Null Island"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]
      }
    }
  ];

  const defaultProps = { data };

  it("should render a DeckGL component", () => {
    const wrapper = shallow(<BoundaryMap {...defaultProps} />);

    expect(wrapper.find(".DeckGL")).to.have.length(1);
  });

  it("should render child BoundaryMap component", () => {
    const wrapper = shallow(<BoundaryMap {...defaultProps} />);

    expect(wrapper.find(".DeckGL").children()).to.have.length(1);
    expect(wrapper.find(".BoundaryMap")).to.have.length(1);
  });
});
