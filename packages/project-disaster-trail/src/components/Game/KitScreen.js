import React from "react";
import { map } from "lodash";
import MinimumKit from "../../constants/minimumKit";
import KitItem from "./KitItem";

const KitScreen = () => {
  return (
    <div>
      {map(MinimumKit, (item, index) => (
        <KitItem emptySvg={item.emptySvg} fullSvg={item.fullSvg} key={index} />
      ))}
    </div>
  );
};

export default KitScreen;
