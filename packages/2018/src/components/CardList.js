import React from "react";
import { PageLayout } from "@hackoregon/component-library";
import CardRegistry from "../card-registry";

const CardList = () => {
  const { tags } = CardRegistry;

  return (
    <PageLayout>
      <div>
        <h1>Tags</h1>
        <ul>
          {Object.keys(tags).map(tag => (
            <li>{`#${tag} (${tags[tag]})`}</li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
};

CardList.displayName = "CardList";

export default CardList;
