import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import HouseholdIncomeByRaceVisualization from "./HouseholdIncomeByRaceVisualization";

const HouseholdIncomeByRaceMeta = (/* data */) => ({
  title:
    "Card #10: Households of Color Earn Substantially Less than White Households",
  slug: "household-income-by-race",
  introText: (
    <p>
      Incomes for White households and Asian households are substantially higher
      than for Black, Native American and Latino households. The gap between
      these two sets of racial categories has increased since 1990, where White
      and Asian household earnings have ticked up while Black and Native
      American household earnings have stagnated or decreased. This structural
      problem poses significant barriers to accessing homeownership for these
      communities. Not only does it take a longer time to save for a down
      payment on a home loan (if saving money is even possible), but it is
      harder for these households to afford the mortgage for the average priced
      home. As cheaper home purchasing options dry up, there are few places left
      where communities of color are able to afford purchasing a home.
    </p>
  ),
  visualization: HouseholdIncomeByRaceVisualization, // data, isLoading are passed to this as props
  additionalText: <p>ADDITIONAL TEXT: TBD</p>,
  shareText: "TODO: Add share text!",
  tags: ["Housing", "Portland"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>ANALYSIS: TBD</p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>ADD DETAILS HERE</p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: (
    <Collapsable>
      <Collapsable.Section>
        <p>METADATA: TBD</p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>ADD DETAILS HERE</p>
      </Collapsable.Section>
    </Collapsable>
  ),
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

export default HouseholdIncomeByRaceMeta;
