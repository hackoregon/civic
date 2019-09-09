import WhatYouCanDoToPrepareVisualization from "./WhatYouCanDoToPrepareVisualization";

const WhatYouCanDoToPrepareMeta = (/* data */) => ({
  title: "What You Can Do To Prepare",
  slug: "what-you-can-do-to-prepare-for-an-earthquake",
  introText: null,
  visualization: WhatYouCanDoToPrepareVisualization, // data, isLoading are passed to this as props
  additionalText: null,
  shareText: null,
  tags: ["Disaster Resilience", "Portland", "Quiz"],
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

export default WhatYouCanDoToPrepareMeta;
