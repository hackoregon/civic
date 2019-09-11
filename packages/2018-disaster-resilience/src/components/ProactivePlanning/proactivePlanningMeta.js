import ProactivePlanningVisualization from "./ProactivePlanningVisualization";

const ProactivePlanningMeta = (/* data */) => ({
  title: "Planning for Citywide Resilience",
  slug: "proactive-planning-for-city-wide-resilience",
  introText: null, // TODO
  visualization: ProactivePlanningVisualization, // data is passed to this as props
  additionalText: null, // TODO
  shareText: null, // TODO
  tags: ["Disaster Resilience", "Portland", "Oregon", "Chart"],
  selector: null,
  analysis: null, // TODO
  metadata: null, // TODO
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
  authors: []
});

export default ProactivePlanningMeta;
