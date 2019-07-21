import React from "react";
import CardRegistry from "../card-registry";

const CardList = () => {
  const { tags } = CardRegistry;

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {Object.keys(tags).map(tag => (
          <li>{`#${tag} (${tags[tag]})`}</li>
        ))}
      </ul>
    </div>
  );
};

CardList.displayName = "CardList";

export default CardList;
