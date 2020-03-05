import React from "react";
import { shallow } from "enzyme";
import DeckGL from "deck.gl";
import MapOverlay from "./MapOverlay";

describe("MapOverlay", () => {
  const data = [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0, 0]
      },
      properties: {
        name: "Null Island"
      }
    }
  ];
  const extruded = true;
  const opacity = 0.8;

  const defaultProps = {
    data,
    opacity,
    extruded
  };

  const wrapper = shallow(<MapOverlay {...defaultProps} />);

  it("should render a div wrapper", () => {
    expect(wrapper.find("div")).length(1);
  });

  it("should render with the same class name", () => {
    expect(wrapper.find("DeckGL")).length(1);
  });

  it("should render a DeckGL component", () => {
    expect(wrapper.find(DeckGL)).length(1);
  });
});
