/* eslint-disable no-console */
import React from "react";
import { css } from "emotion";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { PackageSelectorBox } from "../src";

const PackageSelectorDemo = () => {
  const packageSelectorList = object("Data", [
    {
      title: "Schools",
      description:
        "A short description of the sorts of things you can explore with this package. Data Sources?"
    },
    {
      title: "Crimes",
      description:
        "A short description of the sorts of things you can explore with this package. Data Sources?"
    },
    {
      title: "Demolitions",
      description:
        "A short description of the sorts of things you can explore with this package. Data Sources?"
    },
    {
      title: "TriMet Ridership",
      description:
        "A short description of the sorts of things you can explore with this package. Data Sources?"
    },
    {
      title: "Collisions",
      description:
        "A short description of the sorts of things you can explore with this package. Data Sources?"
    },
    {
      title: "Mega-Quake",
      description:
        "A short description of the sorts of things you can explore with this package. Data Sources?"
    }
  ]);
  return (
    <div
      className={css(`
    @media (min-width: 600px) {
      display: flex;
      flex-wrap: wrap;
    }
  `)}
    >
      {packageSelectorList.map(selector => (
        <div
          className={css(`
          @media (min-width: 600px) {
            width: 33%;
          }
        `)}
        >
          <PackageSelectorBox
            title={selector.title}
            description={selector.description}
          />
        </div>
      ))}
    </div>
  );
};

const PackageSelectorCollection = () => (
  <div>
    <div>Select a Data Collection</div>
    <PackageSelectorDemo />
  </div>
);

export default () =>
  storiesOf("Component Lib|CIVIC Platform/Package Selector Box", module)
    .addDecorator(withKnobs)
    .add(
      "Basic List of selection Options",
      // 'This is a basic list of selection options for the
      // package Selector with just a title and descriptions')(
      PackageSelectorDemo
    )
    .add("Collection of packages", PackageSelectorCollection);
