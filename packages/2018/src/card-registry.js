import { CardRegistry as FarmersMarkets } from "@hackoregon/2018-example-farmers-markets";
import { CardRegistry as DisasterResilience } from "@hackoregon/2018-disaster-resilience";
import { CardRegistry as HousingAffordability } from "@hackoregon/2018-housing-affordability";
import { CardRegistry as LocalElections } from "@hackoregon/2018-local-elections";
import { CardRegistry as NeighborhoodDevelopment } from "@hackoregon/2018-neighborhood-development";
import { CardRegistry as TransportationSystems } from "@hackoregon/2018-transportation-systems";
// 2019 project routes
import { CardRegistry as Template2019 } from "@hackoregon/2019-template";
import { CardRegistry as Housing2019 } from "@hackoregon/2019-housing";

import Registry from "./utils/registry";

const decorate = project => obj => ({ ...obj, project });

const allEntries = []
  .concat(
    FarmersMarkets.map(decorate("@hackoregon/2018-example-farmers-markets"))
  )
  .concat(
    DisasterResilience.map(decorate("@hackoregon/2018-disaster-resilience"))
  )
  .concat(
    HousingAffordability.map(decorate("@hackoregon/2018-housing-affordability"))
  )
  .concat(LocalElections.map(decorate("@hackoregon/2018-local-elections")))
  .concat(
    NeighborhoodDevelopment.map(
      decorate("@hackoregon/2018-neighborhood-development")
    )
  )
  .concat(
    TransportationSystems.map(
      decorate("@hackoregon/2018-transportation-systems")
    )
  )
  // 2019 project routes
  .concat(Template2019.map(decorate("@hackoregon/2019-template")))
  .concat(Housing2019.map(decorate("@hackoregon/2019-housing")));

export default new Registry(allEntries);
