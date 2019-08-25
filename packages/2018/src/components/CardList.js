import React from "react";
import { PageLayout } from "@hackoregon/component-library";
import CardRegistry from "../card-registry";
import Checkbox from "../../../component-library/src/Checkbox/Checkbox";

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
              {/* <li>{`#${tag} (${tags[tag]})`}</li> */}
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
                <li>
                  {`slug: ${entry.slug}`}
                  {`tags: ${entry.component.tags}`}
                </li>
              </>
            ))}
        </ul>
      </div>
    </PageLayout>
  );
};

CardList.displayName = "CardList";

export default CardList;
