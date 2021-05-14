/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import Context from "./Context";

import HousingDisplacementVisualization from "./HousingDisplacementVisualization";

const HousingDisplacementMeta = (/* data */) => ({
  title:
    "Historically Black Portland Neighborhoods Lost 12,000 Black Residents Since 1990",
  slug: "housing-displacement",
  introText: (
    <p>
      As many of Portland’s neighborhoods have gentrified, neighborhoods that
      were historically Black have seen decreases in Black populations. The
      Black population in the Portland region has proportionally decreased over
      time, demonstrating that the people displaced in these neighborhoods have
      not stayed within the Portland MSA.
    </p>
  ),
  visualization: HousingDisplacementVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <p>
      Using Census data from Harvard’s Neighborhood Change Database (NCDB) this
      analysis shows the demographic trends in population change across the
      Portland region as a whole (top left) and in historically Black
      neighborhoods (bottom left). The neighborhoods considered “historically
      Black” can be seen on the map (on the bottom right). The tracts included
      in that definition can be modified using the slider above the map - which
      change the threshold for inclusion based on the percent of the tract
      population that was Black in the 1990 Census.
    </p>
  ),
  shareText:
    "Historically Black Portland Neighborhoods Lost 12,000 Black Residents Since 1990",
  tags: ["Housing", "Race", "Portland", "Oregon", "Chart"],
  selector: null,
  analysis: null,
  context: <Context />,
  metadata: null,
  metadataQA: null,
  resources: null,
  // authors likely an array of keys in the future
  authors: [],
  hideAuthors: true
});

export default HousingDisplacementMeta;
