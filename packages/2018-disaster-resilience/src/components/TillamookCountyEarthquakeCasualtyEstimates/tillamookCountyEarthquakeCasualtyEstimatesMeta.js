/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Collapsable, NotebookPreview } from "@hackoregon/component-library";
import MathJax from "react-mathjax";

import { Fragment } from "react";
import TillamookCountyEarthquakeCasualtyEstimatesVisualization from "./TillamookCountyEarthquakeCasualtyEstimatesVisualization";

const TillamookCountyEarthquakeCasualtyEstimatesMeta = (/* data */) => ({
  title: `Tillamook County Earthquake Casualty Estimates for "The Big One"`,
  slug: "tillamook-county-earthquake-casualty-estimates",
  introText: (
    <p>
      Scientists have warned that a massive earthquake along the Cascadia
      Subduction Zone could lead to high numbers of casualties throughout the US
      Pacific Northwest. The location and number of injuries and deaths
      sustained during an earthquake vary according to the distribution of
      building types across the area exposed to shaking, as well as the timing
      of the earthquake. We map the distribution of likely casualties in order
      to better understand medical response needs following “The Big One.”
    </p>
  ),
  visualization: TillamookCountyEarthquakeCasualtyEstimatesVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <Fragment>
      <p>
        We provide an interactive visualization to allow readers to compare
        casualties sustained across Tillamook County, OR during a daytime and
        nighttime Cascadia earthquake scenario. The location of the circles
        represents the physical location of known buildings, and the size of
        each circle is proportional to the number of predicted casualties at
        that location. Injuries are calculated separately from deaths to support
        more effective medical response resources.
      </p>
      <p>
        In Tillamook County, a daytime Cascadia 9.0 earthquake will result in
        much higher numbers of casualties and a higher need for medical response
        resources than a nighttime earthquake. This difference is driven by the
        movement of people from densely populated, more vulnerable commercial
        structures during the day to sparsely populated areas with less
        vulnerable wood-frame, single-family homes at night. Please note that
        the earthquake casualties shown here are estimates provided to inform
        medical response at a resolution no finer than the city block level. The
        actual location and total number of casualties sustained during an
        earthquake are impossible to predict with certainty.
      </p>
    </Fragment>
  ),
  shareText: `In Tillamook County, a daytime
      Cascadia 9.0 earthquake will result in much higher numbers of casualties
      and a higher need for medical response resources than a nighttime
      earthquake.`,
  tags: ["Disaster Resilience", "Oregon", "Map"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>
          Injuries and deaths sustained during earthquake shaking are estimated
          using the probability of collapse for each building type present in
          the area of shaking. The probability of collapse for a building - as
          well as the probability of sustaining less severe damage - is
          calculated using the relationship between the type and intensity of
          physical shaking and the impacts to a building’s structural
          components.
        </p>
        <p>
          The relationship between shaking and damage for a building varies
          according to building characteristics like number of stories,
          construction material, age, etc. If these characteristics are not
          documented for individual buildings across an area, they are estimated
          using broad building categories like census occupancy type and code
          adoption dates.
        </p>
        <NotebookPreview link="https://github.com/hackoregon/2019-disaster-resilience-data-science/blob/master/notebooks/AEBM_Casualties_Analysis.ipynb" />
        <h3>Data Used</h3>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>
          The Cascadia 9.0 earthquake losses dataset for Tillamook County, OR is
          an output of Hazus, the publicly-funded hazard impact modeling
          software developed by the Federal Emergency Management Agency (FEMA).
          The dataset was generated in collaboration with FEMA’s Hazus Program.
          Inputs for this Hazus earthquake analysis included geophysical shaking
          data from the USGS for a 9.0 magnitude earthquake along the Cascadia
          Subduction Zone - also known as “The Big One” - as well as building
          inventory data from Tillamook County.
        </p>
        <p>
          Each row contains building information with a unique ID, several
          building parameters, and a loss ratio - a financial measure of the
          cost of likely building repairs versus the replacement cost of the
          whole structure. Casualties (the total number of injuries and deaths)
          sustained for each building are estimated using the likely number of
          occupants in the building during the time of the earthquake and the
          probability of building collapse due to earthquake shaking, as below:
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
  // authors likely an array of EMAILS in the future
  authors: [
    <a href="mailto:dbausch@niyamit.com">Doug Bausch</a>,
    <a href="mailto:jburns@niyamit.com">Jordan Burns</a>,
    <a href="mailto:usharma@niyamit.com">Ujvala K Sharma</a>,
    <a href="mailto:scott.tse@hackoregon.org">Scott Tse</a>,
    <a href="mailto:sagi.shaier@hackoregon.org">Sagi Shaier</a>,
    <a href="mailto:erin.cooper@civicsoftwarefoundation.org">Erin Cooper</a>,
    <a href="mailto:karen.ng@civicsoftwarefoundation.org">Karen Ng</a>,
    <a href="mailto:jaron@civicsoftwarefoundation.org">Jaron Heard</a>
  ]
});

export default TillamookCountyEarthquakeCasualtyEstimatesMeta;
