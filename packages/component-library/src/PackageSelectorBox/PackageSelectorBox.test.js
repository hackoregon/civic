import React from "react";
import { mount } from "enzyme";
import PackageSelectorBox from "./PackageSelectorBox";

describe("PackageSelctorBox", () => {
  const packages = [
    {
      displayName: "Nevada: Computers in Household",
      defaultLayers: ["Total - Has Computing Devices"],
      layers: [
        {
          name: "Total - Has Computing Devices",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/2ec7cddfc30e374d85e8b47cef58f624/raw/d4b3f98d9c92762673b0b6745fec595d65f90b44/NV-total-has-computing-devices.json"
        },
        {
          name: "Total Smartphone and No Desktop",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/2ec7cddfc30e374d85e8b47cef58f624/raw/d4b3f98d9c92762673b0b6745fec595d65f90b44/NV-total-smartphone-no-desktop.json"
        },
        {
          name: "Total No Computer",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/2ec7cddfc30e374d85e8b47cef58f624/raw/d4b3f98d9c92762673b0b6745fec595d65f90b44/NV-total-no-computer.json"
        }
      ]
    }
  ];
  const wrapper = mount(
    <PackageSelectorBox packages={packages} onChange={() => {}} />
  );
  it("should render a link", () => {
    expect(wrapper.find("div")).to.have.length(1);
  });
  //  it('should have the appropriate child text', () => {
  //    expect(wrapper.text()).to.eql(testTitle);
  //  });
});
