const cardMetaDescriptions = {
  title: {
    title: "Title",
    description:
      "The title should summarize what the card is about, in 3-10 words"
  },
  slug: {
    title: "Slug",
    description: "The slug is used in the url and should be based on the title"
  },
  introText: {
    title: "Intro Text",
    description:
      "The introduction text is 1-2 sentences providing some context for the visualization"
  },
  visualization: {
    title: "Visualization",
    description: "The visualization, including interactive elements"
  },
  additionalText: {
    title: "Additional Text",
    description:
      "The additional text is 1-2 paragraphs providing additional insight into the data visualization"
  },
  shareText: {
    title: "Share Text",
    description:
      "The share text is what will accompany the data visualization when it is shared"
  },
  tags: {
    title: "Tags",
    description: "Tags are used to categorize the card"
  },
  selector: {
    title: "Selector",
    description:
      "NOT CURRENTLY USED - Could be split out the the visualization in the future"
  },
  analysis: {
    title: "About This Analysis",
    description:
      "This section is a description of the analysis and includes a link to the data science notebooks and repository"
  },
  metadata: {
    title: "About This Data",
    description:
      "REMOVE? REPLACED WITH METADATA QA - This section will point to the metadata API endpoint containing responses to the dataset metadata questionnaire"
  },
  metadataQA: {
    title: "About This Data",
    description:
      "UNDER CONSTRUCTION - This section will point to the metadata API endpoint containing responses to the dataset metadata questionnaire"
  },
  resources: {
    title: "Links and Resources",
    description:
      "This section includes links and resources that provide additional context to the data visualization. Some recommended sections are: Studies and papers, Articles, Organizations"
  },
  authors: {
    title: "Authors",
    description:
      "This section shows all of the people who worked on the card that want to be shown"
  }
};

export default cardMetaDescriptions;
