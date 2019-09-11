/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Collapsable } from "@hackoregon/component-library";
import MathJax from "react-mathjax";

import TillamookCountyEarthquakeCasualtyEstimatesVisualization from "./TillamookCountyEarthquakeCasualtyEstimatesVisualization";

const TillamookCountyEarthquakeCasualtyEstimatesMeta = (/* data */) => ({
  title: `Tillamook County Earthquake Casualty Estimates for "The Big One"`,
  slug: "tillamook-county-earthquake-casualty-estimates",
  introText: (
    <p>
      In the US Pacific Northwest, scientists have warned people in anticipation
      of a massive Cascadia earthquake that could lead to high numbers of
      casualties. To understand the need for medical responses, we show the
      number and severity of casualties based on the time of the day when the
      earthquake hits.
    </p>
  ),
  visualization: TillamookCountyEarthquakeCasualtyEstimatesVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <p>
      We provide an interactive visualization to allow readers to compare the
      daytime and nighttime scenario if Tillamook County experiences a typical
      scenario of the predicted Cascadia 9.0 earthquake. The location of the
      circles represents the physical location of known buildings, and the size
      of the circles is proportional to the number of predicted casualties at
      that location. Furthermore, we show the number of injuries separately from
      deaths. In Tillamook County, we find there is a much higher need for
      medical responses if a Cascadia 9.0 earthquake happens during the daytime
      rather than nighttime hours. This finding is based on the prediction that
      many people will be home in sparsely populated, wooden, single-family
      houses at night, while the model predicts that on most days, many people
      will be working in densely populated commercial buildings during daytime
      hours.
    </p>
  ),
  shareText: null,
  tags: ["Disaster Resilience", "Oregon", "Map"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>
          The dataset was generated in collaboration with{" "}
          <a href="https://www.niyamit.com/NyamIT">NyamIT</a>, a technical
          consultancy of the US FEMA (Federal Emergency Management Agency) Hazus
          program.
        </p>
        <p>
          The dataset is an output of the earthquake module of the Hazus
          disaster impact modeling software maintained by FEMA (Federal
          Emergency Management Agency). We obtained{" "}
          <a href="https://earthquake.usgs.gov/scenarios/eventpage/gllegacycasc9p0expanded_se/executive">
            geophysical data from the USGS
          </a>{" "}
          for a Cascadia 9.0 earthquake, also known as a subduction zone
          earthquake or The Big One . We used the Tillamook building inventory
          data available in the Hazus AEBM tool to estimate building damage from
          a Cascadia 9.0 earthquake.
        </p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>
          The AEBM tool first estimates the casualties as a result of several
          other estimates, including the number of occupants in the building
          during the time of the earthquake, and the probability of the severity
          of damage and the probability of complete structural damage. See [3]
        </p>
        <p
          css={css`
            line-height: 1.6;
          `}
        >
          <MathJax.Provider>
            <MathJax.Node
              block
              formula="SL_{ENDOi} = N_{DO} \times P(S_i|Col)P(Col|PSTR_5) \times PSTR_5"
            />
            Where:
            <br />
            <MathJax.Node inline formula="SL_{ENDOi}" /> = Expected number of
            daytime casualties of Severity Level i<br />
            <MathJax.Node inline formula="P(S_i|Col)" /> = Probability of
            Severity Level i given full building collapse
            <br />
            <MathJax.Node inline formula="P(Col|PSTR_5)" /> = Probability of
            full building collapse given Complete structural damage (STR5)
            <br />
            <MathJax.Node inline formula="PSTR5" /> = Probability of Complete
            structural damage
            <br />
            <MathJax.Node inline formula="N_{DO}" /> = Number of occupants in
            the building during the time of the earthquake
          </MathJax.Provider>
        </p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: null,
  metadataQA: "hazus_aebm_tillamook_building_earthquake_damage",
  resources: [
    {
      heading: "Resources",
      items: [
        {
          link:
            "https://earthquake.usgs.gov/scenarios/eventpage/gllegacycasc9p0expanded_se/shakemap/intensity",
          description:
            "Cascadia scenario that we used to estimate the casualties"
        },
        {
          link: "https://www.fema.gov/hazus",
          description: "Hazus"
        },
        {
          link:
            "https://www.fema.gov/media-library-data/20130726-1820-25045-6286/hzmh2_1_eq_tm.pdf",
          description: "AEBM documentation: earthquake model technical manual"
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
            "References for building design level in the Oregon Tillamook county"
        }
      ]
    }
  ],
  // authors likely an array of keys in the future
  authors: "demo"
});

export default TillamookCountyEarthquakeCasualtyEstimatesMeta;
