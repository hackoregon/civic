import React from "react";

import TemplateCard from "./TemplateCard";
import FullCard from "./FullCard";

const ConnectedTemplateCardFull = () => (
  // eslint-disable-next-line react/no-children-prop
  <TemplateCard children={FullCard} />
);

export default ConnectedTemplateCardFull;
