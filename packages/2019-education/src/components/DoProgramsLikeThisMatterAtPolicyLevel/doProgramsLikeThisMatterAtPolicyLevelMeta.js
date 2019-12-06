import DoProgramsLikeThisMatterAtPolicyLevelVisualization from "./DoProgramsLikeThisMatterAtPolicyLevelVisualization";

// USED FOR EMBED ONLY ON CIVICDATACOLLABORATIVE, NO META NEEDED

const DoProgramsLikeThisMatterAtPolicyLevelMeta = (/* data */) => ({
  title: "Do Programs Like This Matter At Policy Level",
  slug: "do-programs-like-this-matter-at-policy-level",
  introText: null,
  visualization: DoProgramsLikeThisMatterAtPolicyLevelVisualization, // data, isLoading are passed to this as props
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

export default DoProgramsLikeThisMatterAtPolicyLevelMeta;
