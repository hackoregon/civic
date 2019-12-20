/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Link } from "react-router";
import { get } from "lodash";

import PropTypes from "prop-types";

const CardLink = ({ children, slug, ...other }) => {
  const isEmbedded =
    `${get(window, "location.origin", "")}/cards/${slug}/embed/` ===
      get(window, "location.href", "") ||
    `${get(
      window,
      "location.origin",
      ""
    )}/cards/${slug}/embed/visualization` === get(window, "location.href", "");

  return (
    <Fragment>
      {isEmbedded ? (
        <Link
          target="_blank"
          to={`${get(window, "location.origin")}/cards/${slug}`}
          {...other}
        >
          <span>{children}</span>
        </Link>
      ) : (
        <Link to={`${get(window, "location.origin")}/cards/${slug}`} {...other}>
          <span>{children}</span>
        </Link>
      )}
    </Fragment>
  );
};

CardLink.displayName = "CardLink";
CardLink.propTypes = {
  children: PropTypes.node,
  slug: PropTypes.string
};

export default CardLink;
