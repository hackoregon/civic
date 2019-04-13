import React from "react";
import { Link } from "react-router";

const capitalize = str =>
  str.length &&
  str
    .split(" ")
    .reduce(
      (full, word) => `${full} ${word[0].toUpperCase() + word.substring(1)}`,
      ""
    );

const CityNotFoundPage = ({ params }) => (
  <div>
    <h1>There are no stories for {capitalize(params.city)}</h1>
    <p>
      Do you want to check out{" "}
      <Link to="/cities/portland">the Portland, OR collection?</Link>
    </p>
  </div>
);

CityNotFoundPage.displayName = "CityNotFoundPage";

export default CityNotFoundPage;
