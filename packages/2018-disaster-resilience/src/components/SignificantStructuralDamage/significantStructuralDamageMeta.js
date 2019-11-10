import React, { Fragment } from "react";
import { Collapsable } from "@hackoregon/component-library";

import SignificantStructuralDamageVisualization from "./SignificantStructuralDamageVisualization";

const SignificantStructuralDamageMeta = (/* data */) => ({
  title: "Significant Structural Damage",
  slug: "significant-structural-damage",
  introText: (
    <Fragment>
      <p>
        {`The Cascadia Subduction Zone fault, running 100 miles off the coast from northern California to British Columbia, has the potential to cause a 9.0+ magnitude earthquake. Scientists estimate there is a 40% chance this event will occur within the next 50 years. Portland is well within the affected zone for this earthquake.`}
      </p>
      <p>
        {`Key pieces of Portland's infrastructure are estimated to be destroyed or damaged beyond a usable state in a 9.0 Cascadia Subduction Zone earthquake. Three specific weaknesses will severely inhibit the ability to rescue people, distribute services, and rebuild after a Cascadia quake:
        `}
      </p>
    </Fragment>
  ),
  visualization: SignificantStructuralDamageVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <Collapsable>
      <Collapsable.Section hidden>
        <p>
          Portland’s bridges are essential for transporting people, goods, and
          services across the Willamette River every day. Of Portland’s 12
          bridges, only the Tillikum and Sellwood Bridges are expected to be
          safe and usable after a Cascadia quake. A retrofitted Burnside Bridge
          could provide an essential lifeline for rescue and recovery for
          Portland. This{" "}
          <a href="https://youtu.be/sn98JkN5HXc">video simulation</a> shows a
          simulated collapse of the Burnside Bridge based on its current
          structural condition.
        </p>
        <p>
          The Portland Airport is located in an area which will be significantly
          impacted by shaking and liquefaction, so airport runways are likely to
          be highly deformed and unusable after a Cascadia quake. The airport
          does not currently have a plan to restore operations quickly after an
          earthquake, which will make it difficult to deliver needed people and
          resources to the region.
        </p>
        <p>
          Between the Fremont Bridge and Sauvie Island is Oregon’s “Critical
          Energy Infrastructure”, containing most of Oregon’s facilities for
          receiving, storing, transporting liquid fuel and natural gas. Although
          these facilities are built on land at very high risk for liquefaction
          and landslides, few structures have been retrofitted to meet current
          building standards. Most of this infrastructure will not be functional
          after a Cascadia quake, which means that a state or region-wide fuel
          shortage is a real possibility.
        </p>
      </Collapsable.Section>
    </Collapsable>
  ),
  shareText: null, // TODO
  tags: [
    "Disaster Resilience",
    "Earthquake",
    "Portland",
    "Oregon",
    "Infographic"
  ],
  selector: null,
  analysis: null, // TODO
  metadata: null, // n/a
  resources: [
    {
      heading: "Organizations",
      items: [
        { link: "http://www.hackoregon.org", description: "Hack Oregon" },
        {
          link: "https://www.civicsoftwarefoundation.org",
          description: "Civic Software Foundation"
        },
        { link: "https://www.civicplatform.org", description: "Civic Platform" }
      ]
    }
  ],
  // authors likely an array of keys in the future
  authors: "demo"
});

export default SignificantStructuralDamageMeta;
