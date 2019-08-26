import React from "react";
import PropTypes from "prop-types";
import { PageLayout } from "../..";
import { Checkbox } from "../index";

const CardList = ({ CardRegistry }) => {
  const { tags } = CardRegistry;

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
    </PageLayout>
  );
};

CardList.displayName = "CardList";
CardList.propTypes = {
  CardRegistry: PropTypes.shape({})
};

export default CardList;
