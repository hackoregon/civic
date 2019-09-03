import WhatYouCanDoToPrepareOctopusVisualization from "./WhatYouCanDoToPrepareOctopusVisualization";

const WhatYouCanDoToPrepareOctopusMeta = (/* data */) => ({
  title: "What You Can Do To Prepare Octopus",
  slug: "what-you-can-do-to-prepare-octopus",
  introText: null,
  visualization: WhatYouCanDoToPrepareOctopusVisualization, // data, isLoading are passed to this as props
  additionalText: null,
  shareText: null,
  tags: null,
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

export default WhatYouCanDoToPrepareOctopusMeta;
