import React from "react";

import YouAndYourNeighborsVisualization from "./YouAndYourNeighborsVisualization";

const YouAndYourNeighborsMeta = (/* data */) => ({
  title: "You and Your Neighbors in the Earthquake",
  slug: "you-and-your-neighbors-in-the-earthquake",
  introText: (
    <p>
      The first step in increasing disaster resilience for most Portlanders will
      be to understand what the estimated impact is within their immediate
      vicinity. Input your address, or a friend/family member’s address below to
      generate a personalized map and information about expected impacts for
      your location.
    </p>
  ),
  visualization: YouAndYourNeighborsVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <p>
      The map also shows nearby schools, hospitals, and fire stations because it
      will be critical for individuals to understand their location relative to
      key resources immediately following an earthquake. The institutions will
      be rallying areas for the community and crucial for recovery efforts. A{" "}
      <a
        href="https://www.portlandoregon.gov/pbem/article/483656"
        target="_blank"
        rel="noopener noreferrer"
      >
        BEECN
      </a>{" "}
      is a temporary radio communications site staffed by at least one person
      after a major earthquake. After a disaster, it’s best if you can stay home
      and remain self-sufficient until help arrives, but if you need to report
      severe damage or injury or ask for emergency assistance while phones are
      down, a BEECN site is the place to go. There are 48 BEECN locations
      throughout Portland, though the list may be added to or changed over time.
      Search for a BEECN near you by{" "}
      <a
        href="http://www.portlandoregon.gov/pbem/article/414941"
        target="_blank"
        rel="noopener noreferrer"
      >
        entering your address here
      </a>
      . You can also print out a{" "}
      <a
        href="http://www.portlandoregon.gov/pbem/article/423717"
        target="_blank"
        rel="noopener noreferrer"
      >
        postcard with BEECN sites here
      </a>
      .
    </p>
  ),
  shareText: null,
  tags: [
    /* "Disaster Resilience", "Portland", "Oregon", "Map" */
  ],
  selector: null,
  analysis: null,
  metadata: null,
  metadataQA:
    "earthquake_regional_impact_analysis_for_clackamas_multnomah_and_washington_counties_oregon",
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
  authors: null
});

export default YouAndYourNeighborsMeta;
