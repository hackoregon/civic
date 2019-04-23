import React from "react";
import { shallow } from "enzyme";
import DeckGL from "deck.gl";
import HexOverlay from "./HexOverlay";

describe("HexOverlay", () => {
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
  const radius = 200;

  const defaultProps = {
    data,
    extruded,
    opacity,
    radius
  };

  const wrapper = shallow(<HexOverlay {...defaultProps} />);

  it("should render a DeckGLOverlay component", () => {
    expect(wrapper.find(".HexOverlay")).to.have.length(1);
  });

  it("should render a DeckGL component", () => {
    expect(wrapper.find(DeckGL)).length(1);
  });

  it("should render with the same class name", () => {
    expect(wrapper.find(".HexOverlay")).length(1);
  });

  it("should render with extruded", () => {
    expect(wrapper.props().children.props.layers[0].props.extruded).to.equal(
      true
    );
  });

  it("should render with radius", () => {
    expect(wrapper.props().children.props.layers[0].props.radius).to.equal(200);
  });

  it("should render with opacity of 0.8", () => {
    expect(wrapper.props().children.props.layers[0].props.opacity).to.equal(
      0.8
    );
  });

  it("should render with an extrusion", () => {
    expect(wrapper.props().children.props.layers[0].props.extruded).to.equal(
      true
    );
  });

  it("should render with data", () => {
    expect(wrapper.props().children.props.layers[0].props.data).to.equal(data);
  });

  it("should render with an type string", () => {
    expect(
      wrapper.props().children.props.layers[0].props.data[0].type
    ).to.equal("Feature");
  });
});
