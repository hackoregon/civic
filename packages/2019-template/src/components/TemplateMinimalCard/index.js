import React from "react";
import PropTypes from "prop-types";
import { CivicCard } from "@hackoregon/component-library";

import templateMinimalCardMeta from "./templateMinimalCardMeta";

const TemplateMinimalCard = ({ Layout }) => (
  <CivicCard cardMeta={templateMinimalCardMeta} Layout={Layout} />
);

TemplateMinimalCard.displayName = "TemplateMinimalCard";

TemplateMinimalCard.propTypes = {
  Layout: PropTypes.func
};

export default TemplateMinimalCard;
