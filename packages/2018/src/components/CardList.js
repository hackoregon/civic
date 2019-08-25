import React from "react";
import {
  PageLayout,
  CivicCardLayoutVisualizationOnly,
  Checkbox
} from "@hackoregon/component-library";
import CardRegistry from "../card-registry";

const CardList = () => {
  const { tags, entries } = CardRegistry;

  return (
    <PageLayout>
      <div>
        <h1>Filters</h1>
        <h2>Topic</h2>
        <ul>
          {Object.keys(tags).map(tag => (
            <>
              <li>
                <Checkbox label={tag} />
              </li>
            </>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {entries
            .filter(entry => entry.component.tags)
            .map(entry => (
              <>
                {<entry.component Layout={CivicCardLayoutVisualizationOnly} />}
              </>
            ))}
        </ul>
      </div>
    </PageLayout>
  );
};

CardList.displayName = "CardList";

export default CardList;
