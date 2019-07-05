import React from "react";

import TemplateCard from "./TemplateCard";
import ClassicCard from "./ClassicCard";

const ConnectedTemplateCardClassic = () => (
  // eslint-disable-next-line react/no-children-prop
  <TemplateCard children={ClassicCard} />
);

export default ConnectedTemplateCardClassic;
