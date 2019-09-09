import React from "react";

import YouAndYourNeighborsVisualization from "./YouAndYourNeighborsVisualization";

const YouAndYourNeighborsMeta = (/* data */) => ({
  title: "You and Your Neighbors in the Earthquake",
  slug: "you-and-your-neighbors-in-the-earthquake",
  introText: (
    <p>
      It will be critical for individuals to understand their location relative
      to key resources immediately following an earthquake. The{" "}
      <a
        href="https://www.portlandoregon.gov/pbem/59630"
        target="_blank"
        rel="noopener noreferrer"
      >
        BEECN site
      </a>{" "}
      is a place to go in Portland after a major earthquake to ask for emergency
      assistance or report severe damage/injury. Places like hospitals, fire
      stations and schools will be rallying areas for the community and crucial
      for recovery efforts. Input your address, or a friend/family member’s
      address below to generate a personalized map and information about
      expected impacts for your location.
    </p>
  ),
  visualization: YouAndYourNeighborsVisualization, // data, isLoading are passed to this as props
  additionalText: null,
  shareText: null,
  tags: ["Disaster Resilience", "Portland", "Map"],
  selector: null,
  analysis: null,
  metadata: null,
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
