import WhatElseSurprisedYouAboutProgramOutcomesVisualization from "./WhatElseSurprisedYouAboutProgramOutcomesVisualization";

// USED FOR EMBED ONLY ON CIVICDATACOLLABORATIVE, NO META NEEDED

const WhatElseSurprisedYouAboutProgramOutcomesMeta = (/* data */) => ({
  title: "What Surprised You About Program Outcomes?",
  slug: "what-else-surprised-you-about-program-outcomes",
  introText: null,
  visualization: WhatElseSurprisedYouAboutProgramOutcomesVisualization, // data, isLoading are passed to this as props
  additionalText: null,
  shareText: null,
  tags: [
    /* "Transportation", "Bus", "Rail", "Portland" */
  ],
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
  authors: "demo"
});

export default WhatElseSurprisedYouAboutProgramOutcomesMeta;
