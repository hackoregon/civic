import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, number, color } from "@storybook/addon-knobs";
import { PolygonPreview } from "../src";
import { storybookStyles } from "./storyStyles";
import notes from "./polygonPreview.notes.md";

const samplePoint = {
  id: 0,
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-122.6507145389833, 45.55771642087534],
        [-122.6429083130228, 45.55768675715896],
        [-122.642924772506, 45.55543377124673],
        [-122.6419502534144, 45.55543013845755],
        [-122.6419502775427, 45.55542500723561],
        [-122.6419529152384, 45.55487846776824],
        [-122.641962565704, 45.55287959912901],
        [-122.6419668259788, 45.55199860134397],
        [-122.6419674959041, 45.551853081804],
        [-122.6419675319362, 45.55185301812312],
        [-122.6441730057121, 45.55184500387901],
        [-122.6441735946454, 45.55184499289508],
        [-122.6441739151976, 45.55180837833925],
        [-122.6441839704287, 45.55066323416661],
        [-122.6441843046813, 45.55062528713896],
        [-122.6442052647039, 45.5482388379995],
        [-122.6442052619851, 45.54823876603911],
        [-122.6442238844498, 45.5451662460016],
        [-122.6462921868976, 45.5451742829583],
        [-122.6514269624085, 45.54519408041318],
        [-122.6544906299285, 45.54520577691916],
        [-122.6544697722047, 45.54825033847385],
        [-122.6544697391407, 45.54825554190931],
        [-122.6557272236104, 45.54825872017683],
        [-122.6557271679942, 45.54826501320888],
        [-122.6556857698879, 45.55318269183213],
        [-122.6556744486651, 45.55452821736427],
        [-122.6537235596823, 45.55452259005197],
        [-122.6537111723565, 45.55548240641392],
        [-122.65175628134, 45.55547546087733],
        [-122.6517247726077, 45.55755954630334],
        [-122.6517223252097, 45.55772105883007],
        [-122.6507145389833, 45.55771642087534]
      ]
    ]
  },
  properties: {
    name: "SABIN"
  }
};

export default () =>
  storiesOf("Component Lib/Maps/PolygonPreview", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add(
      "Point",
      () => {
        return (
          <PolygonPreview
            feature={samplePoint}
            stroke={color("stroke", "#000000")}
            fill={color("fill", "#000000")}
            fillOpacity={number("fill opacity", 0.5, {
              range: true,
              min: 0,
              max: 1,
              step: 0.05
            })}
            strokeWidth={number("stroke width", 1, {
              range: true,
              min: 1,
              max: 10,
              steps: 0.5
            })}
          />
        );
      },
      { notes }
    );
