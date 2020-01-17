import WhatSurprisedYouAboutProgramOutcomesVisualization from "./WhatSurprisedYouAboutProgramOutcomesVisualization";

// USED FOR EMBED ONLY ON CIVICDATACOLLABORATIVE, NO META NEEDED

const WhatSurprisedYouAboutProgramOutcomesMeta = (/* data */) => ({
  title: "What Surprised You About Program Outcomes?",
  slug: "what-surprised-you-about-program-outcomes",
  introText: null,
  visualization: WhatSurprisedYouAboutProgramOutcomesVisualization, // data, isLoading are passed to this as props
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
        { link: "https://www.hackoregon.org", description: "Hack Oregon" },
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

export default WhatSurprisedYouAboutProgramOutcomesMeta;
