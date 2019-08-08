/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router";

import PropTypes from "prop-types";

const CardLink = ({ children, slug }) => (
  <div>
    <Link to={`cards/${slug}`}>
      <span>{children}</span>
    </Link>
  </div>
);

CardLink.displayName = "CardLink";
CardLink.propTypes = {
  children: PropTypes.node,
  slug: PropTypes.string
};

export default CardLink;
