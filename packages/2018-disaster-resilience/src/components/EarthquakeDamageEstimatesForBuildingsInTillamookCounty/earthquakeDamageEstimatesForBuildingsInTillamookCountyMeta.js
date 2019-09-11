import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization from "./EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization";

const EarthquakeDamageEstimatesForBuildingsInTillamookCountyMeta = (/* data */) => ({
  title: "Earthquake Damage Estimates For Buildings In Tillamook County",
  slug: "earthquake-damage-estimates-for-buildings-in-tillamook-county",
  introText: (
    <p>
      The severity of building damage from an earthquake varies depending on
      building type. This card highlights opportunities for mitigation actions
      that may reduce damages in residential and commercial structures.
    </p>
  ),
  visualization: EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <p>
      The characteristics of a building determine how well it can withstand
      shaking during a major earthquake. Commercial buildings generally have a
      higher loss ratio than other types of buildings. Residential wood frame
      buildings tend to sustain less damage, but the model still predicts that
      half of these types of structures in Tillamook County could experience
      repair costs up to ~30% of their value during a Cascadia 9.0 earthquake.{" "}
      <a href="https://github.com/hackoregon/2019-disaster-resilience-data-science/blob/master/notebooks/hazus_aebm_output.ipynb">
        https://github.com/hackoregon/2019-disaster-resilience-data-science/blob/master/notebooks/hazus_aebm_output.ipynb
      </a>
    </p>
  ),
  shareText:
    "A Cascadia 9.0 earthquake event would likely produce devastating destruction of buildings in the Tillamook County area. We provide an interactive visualization of the projected financial damage to buildings as a loss ratio after such an event. The loss ratio of a building is the dollar cost of likely damages sustained during an earthquake divided by the total value of the building.",
  tags: ["Disaster Resilience", "Oregon", "Map"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>
          The building loss ratio used in this visualization is a ratio of
          (Building Structural Loss estimate + Building Non-Structural
          Acceleration Loss estimate + Non Structural Drift Loss estimate) to
          the Building Replacement Value. Building structural and non-structural
          loss estimates are calculated using the cumulative probability of
          several damage states (slight, moderate, extensive and complete) and
          the relationship between building damage states and repair costs for
          each building type.
          <br />
          <br />
          Structural damage includes impacts to framing and construction
          elements of a building, while non-structural damage includes impacts
          to the finishing elements of building like mechanical equipment,
          paint, trim, etc. The Hazus model considers non-structural damage
          sustained due to both acceleration and drift that occurs during
          earthquake shaking.
        </p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: (
    <Collapsable>
      <Collapsable.Section>
        <p>
          The Cascadia 9.0 earthquake losses dataset for Tillamook County, OR is
          an output of Hazus, the publicly-funded hazard impact modeling
          software developed by the Federal Emergency Management Agency (FEMA).
          The dataset was generated in collaboration with FEMA’s Hazus Program.
          Inputs for this Hazus earthquake analysis included geophysical shaking
          data from the USGS for a 9.0 magnitude earthquake along the Cascadia
          Subduction Zone - also known as “The Big One” - as well as building
          inventory data from Tillamook County.
          <br />
          <br />
          Each row contains building information with a unique ID, several
          building parameters, and a loss ratio - a financial measure of the
          cost of likely building repairs versus the replacement cost of the
          whole structure.
        </p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadataQA: "hazus_aebm_tillamook_building_earthquake_damage",
  resources: [
    {
      heading: "Studies and Papers",
      items: [
        {
          link:
            "https://www.fema.gov/media-library-data/20130726-1820-25045-6286/hzmh2_1_eq_tm.pdf",
          description: "Hazus Earthquake Model Technical Manual"
        },
        {
          link:
            "https://drive.google.com/open?id=0B3iBCXoIuWAzTEhsRE92blUtQnJiUzg5Z0VNTnZPTVZlU1Rj",
          description: "References for FEMA building types"
        },
        {
          link:
            "https://www.co.tillamook.or.us/GOV/ComDev/NHMP/DecemberMeeting/3765Tillamook%20County%20Multi-Hazard%20Risk%20Report%20-%20Final%20Draft%20-%2020161201.pdf",
          description:
            "References for building design level in Tillamook County, OR"
        },
        {
          link:
            "https://www.fema.gov/media-library-data/20130726-1820-25045-1179/hzmhs2_1_eq_um.pdf (page 9-53)",
          description:
            "Definitions of structural and non-structural damage to buildings"
        }
      ]
    },
    {
      heading: "Organizations",
      items: [
        {
          link: "https://www.fema.gov/hazus",
          description: "FEMA’s Hazus Program"
        },
        {
          link: "https://www.niyamit.com/",
          description: "NiyamIT"
        }
      ]
    }
  ],
  // authors likely an array of keys in the future
  authors: "demo"
});

export default EarthquakeDamageEstimatesForBuildingsInTillamookCountyMeta;
