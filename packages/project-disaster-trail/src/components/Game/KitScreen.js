import React from "react";
import { map } from "lodash";
import { MINIMUM_KIT as minimumKit } from "../../constants/items";
import KitItem from "./KitItem";

const KitScreen = () => {
  return (
    <div>
      {map(minimumKit, (item, index) => (
        <KitItem emptySvg={item.emptySvg} fullSvg={item.fullSvg} key={index} />
      ))}
    </div>
  );
};

export default KitScreen;
