import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import SystemWideSummaryVisualization from "./SystemWideSummaryVisualization";

const SystemWideSummaryMeta = (/* data */) => ({
  title: "System Wide Summary",
  slug: "system-wide-summary",
  introText: (
    <p>
      This template card loads data from an API using Reduxful, and can be used
      as a starting point for API based cards. You can improve this card
      template! For example, the loading state of the card needs to be improved.
    </p>
  ),
  visualization: SystemWideSummaryVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <p>
      Pastry sweet roll candy chocolate bar cupcake gingerbread. Chocolate jelly
      halvah. Tiramisu cupcake halvah cupcake cupcake. Tiramisu gummi bears
      chocolate sugar plum chocolate caramels chocolate cake biscuit jelly
      beans. Chocolate bar tart chupa chups sweet oat cake halvah. Muffin cake
      cotton candy chocolate bar. Lollipop halvah gingerbread. Pudding jelly
      liquorice. Cupcake danish caramels pie tootsie roll sweet lemon drops
      cookie. Pie croissant lollipop jelly-o. Jelly candy canes marshmallow
      apple pie candy bear claw candy canes topping cheesecake. Candy canes
      macaroon wafer toffee candy ice cream toffee. Muffin gummies muffin.
      Dragée liquorice marzipan oat cake danish donut chocolate cake topping
      chocolate bar.
    </p>
  ),
  shareText:
    "Ice cream candy canes brownie marzipan jelly chocolate bar marshmallow.",
  tags: ["Transportation", "Chart", "Portland", "Oregon"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>
          Ice cream danish ice cream cupcake donut. Icing gingerbread candy
          canes pie topping soufflé carrot cake cake jujubes. Halvah croissant
          cake cheesecake candy. Gummies cupcake pudding dragée cotton candy
          jelly chocolate bar oat cake dessert. Carrot cake caramels wafer
          liquorice candy. Gummies sweet gingerbread sugar plum brownie halvah
          topping. Soufflé fruitcake fruitcake cheesecake bear claw dragée
          halvah. Toffee tootsie roll gingerbread brownie sweet roll. Brownie
          dessert marzipan macaroon liquorice tiramisu bonbon tootsie roll.
          Liquorice cheesecake cheesecake powder jelly-o liquorice pastry
          pastry. Marzipan wafer candy candy danish gingerbread marzipan ice
          cream. Ice cream ice cream sugar plum apple pie icing marshmallow bear
          claw gingerbread cake.
        </p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>
          Candy canes macaroon brownie cake chocolate bar jelly beans. Cake
          apple pie icing. Jelly beans halvah jelly beans liquorice jelly-o. Oat
          cake biscuit gingerbread jujubes pie marshmallow halvah sweet roll.
          Carrot cake pie biscuit. Chocolate pastry tootsie roll powder icing.
          Apple pie gummies brownie chocolate bar sweet. Wafer bear claw
          cheesecake bear claw jelly-o oat cake powder jelly. Marzipan tiramisu
          toffee chocolate cake cheesecake halvah cheesecake dragée pastry.
          Soufflé caramels sesame snaps brownie croissant jelly beans topping
          danish. Pie jelly-o tootsie roll tootsie roll icing jelly jujubes.
        </p>
        <p>
          Pastry ice cream soufflé jujubes bonbon donut. Macaroon donut
          croissant pudding marshmallow lemon drops wafer. Pastry caramels cake
          muffin chocolate topping danish dragée dragée. Pudding croissant pie
          pudding muffin gingerbread donut. Sweet roll bonbon soufflé danish
          cake danish bear claw croissant. Cotton candy donut jelly beans
          caramels halvah cupcake chocolate cake bonbon. Lollipop marzipan jelly
          beans gummies gummies tart fruitcake halvah. Croissant dragée muffin
          soufflé chocolate bar. Cookie croissant danish sweet roll pie lemon
          drops. Candy candy canes cookie macaroon icing gummies. Gummi bears
          gummi bears marzipan pudding brownie bear claw lollipop brownie pie.
          Sugar plum topping oat cake sweet roll. Brownie topping caramels sweet
          cupcake oat cake. Sugar plum topping pastry. Biscuit dessert wafer
          chocolate danish.
        </p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: null,
  metadataQA: "toads",
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

export default SystemWideSummaryMeta;
